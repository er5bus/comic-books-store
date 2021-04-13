const express = require('express')

const morgan = require('morgan')

const appDebug = require('debug')('app:debug')
const logDebug = require('debug')('app:log')

const app = express()

const PORT = process.env.PORT || 3000


logDebug('Log is active')

app.use(express.json())
app.use(morgan('dev'))

// routes
const booksRouter = require('./routers/books')
app.use('/api/comic-books', booksRouter)

// index
app.get(['','/index','/'], (_,res)=>{
  res.send({
    name: 'comic-books-store',
    version: '0.0.1',
    description: 'RESTful API \'Comics API\' which allows the management of a comics website. Each comic is presented by its author, title, URL to the comic book image.',
  })
})


app.listen(PORT, () => appDebug(`Server on ${PORT}....`));
