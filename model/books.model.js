const mongoose = require('mongoose')

const bookSchema =new mongoose.Schema({
  title: { type: String,require:true },
  author: { type: String },
  publishedYear: { type: Number },
  genre: [{ type: String }],
  language: { type: String },
  country: { type: String },
  rating: { type: Number },
  summary: { type: String },
  coverImageUrl:{type:String}
})

const Books = mongoose.model('books', bookSchema)

module.exports = Books
