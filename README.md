# Comic books store

RESTful API 'Comics API' which allows the management of a comics website. Each comic is presented by its author, title, URL to the comic book image.

## Project Requirements:

In order to get the project running you need to install:

- [Docker](https://docs.docker.com/get-docker/).

#### Docker:

Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly.

## Setting the Project Locally:

#### Cloning the project:

Once you have all the needed requirements installed, clone the project:

``` bash
git clone GitURL
```

#### Run the Project in development env:

to run the project type:

``` bash
docker-compose up --build -d
```

Check 0.0.0.0:3000 on your browser!


### Run the Project in production

to build the project type:

``` bash
docker-compose -f docker-compose.build.yaml up --build -d
```

That's it.
