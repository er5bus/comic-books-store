const express = require('express')

const _ = require('lodash')
const Joi = require('joi')

const router = express.Router()

let books = [
  {id :1, name : 'Attack on titan', author : 'Kodes', cover: 'https://pm1.narvii.com/6178/0d884ae5d41510cc073bea3f182c8108a4da8e2f_hq.jpg'},
  {id :2, name : 'One piece', author : 'Kouloud', cover: 'https://qph.fs.quoracdn.net/main-qimg-c7a4bcfb571583724fdcf72799eaffb4'},
  {id :3, name : 'One punch man', author : 'Rami', cover: 'https://upload.bitfeed.co/5e59566fdd149-One-Punch-Man-1-discovery-edition'}
]

const bookSchema = Joi.object({
  name : Joi.string().min(3).max(150).required(),
  author : Joi.string().min(2).max(150).required(),
  cover : Joi.string().uri(),
})

router.get('', (_,res) => {
  res.send(books)
})

router.get('/:id', (req,res) => {
  let book = books.find(s => s.id === parseInt(req.params.id, 10))
  if(_.isEmpty(book)){
    return res.status(404).send('The comic book with the given Id is not found')
  }
  res.send(book)
})

router.post('', (req,res) => {
  const jsonObj = req.body
  const bookValidation = bookSchema.validate(jsonObj)
  if(bookValidation.error){
    return res.status(400).send(bookValidation.error.details[0].message)
  }
  const book = _.pick(jsonObj, ['name','author','cover']);
  book.id = books.length + 1;
  books.push(book)
  res.send(book);
})

router.put('/:id',  (req,res) => {

  let book = books.find(s => s.id === parseInt(req.params.id));
  if(!book){
    return res.status(404).send('The given comic book Id is not found.')
  }

  const validation_result = bookSchema.validate(req.body)
  if(validation_result.error){
    return res.status(400).send(validation_result.error.details[0].message)
  }

  book = _.merge(book,req.body);
  books = books.map((s) => s.id === book.id ? book : s)
  res.send(book)
})

router.delete('/:id',  (req,res) => {
  const book = books.find(s => s.id === parseInt(req.params.id));
  if(!book) {
    return res.status(404).send('The given comic Id is not found.')
  }
  books = books.filter(s => s.id !== parseInt(req.params.id));
  res.send(book)
})

module.exports = router
