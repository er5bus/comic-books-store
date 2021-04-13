getUser(1,(user)=>{
  getRepositories(user.gitHubUsername,(repos,levelNumber)=>{
    getBrunch(repos[levelNumber],(brunch)=>{
      if (brunch == "master")
        postCommit(newVersion,(committed)=>{
          if(committed)
            console.log("The new version is committed");
          else
            console.log("The new version is not committed");
        })
    })
  })
});

// Question 1
const getUserCallback = (user) =>{
  getRepositories(user.gitHubUsername, getRepositoriesCallback)
}

const getRepositoriesCallback = (repos,levelNumber)=>{
  getBrunch(repos[levelNumber],getBrunchCallback)
}

const getBrunchCallback = (brunch)=>{
  if (brunch == "master"){
    postCommit(newVersion,postCommitCallback)
  }
}

const postCommitCallback = (committed)=>{
  if(committed){
    console.log("The new version is committed");
  } else {
    console.log("The new version is not committed");
  }
}

getUser(1, getUserCallback);

// Question 2
// The Pyramid of Doom
const getUserPromise = (userId) => new Promise((resolve, reject) => {
  getUser(userId,(user)=>{
    if (!user){
      reject("The user is not valid")
    }
    getRepositories(user.gitHubUsername,(repos,levelNumber)=>{
      if (!repos || !levelNumber || !repos[levelNumber]){
        reject("The repos or levelNumber is not valid")
      }
      getBrunch(repos[levelNumber],(brunch)=>{
        if (brunch == "master") {
          postCommit(newVersion,(committed)=>{
            if(committed){
              resolve("The new version is committed")
            } else {
              reject("The new version is not committed")
            }
          })
        }else {
          reject("The branch is not master")
        }
      })
    })
  });
})


getUserPromise(1)
  .then((msg) => {
    console.log(msg)
  })
  .catch((err) => {
    console.log(err)
  })

// Question 3
const user = await getUser(1)
const [repos,levelNumber] = await getRepositories(user.gitHubUsername)

const brunch = await getBrunch(repos[levelNumber])

if (brunch == "master"){
  const committed = await postCommit(newVersion)
  if(committed){
    console.log("The new version is committed");
  }else{
    console.log("The new version is not committed");
  }
}
