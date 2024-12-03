const { initializeDatabase } = require('./db/db.connect')
const Books = require('./model/books.model')

initializeDatabase()

const express = require('express')
const app = express()
app.use(express.json())
const PORT =3000
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`)
})

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get('/', (req,res) => {
  res.send("welcome to book store")
})

// ----  1 --  2  -------

async function createBook(newBook)
{
  try
  {
    const book = new Books(newBook)
    const saveBook =await book.save()
    return saveBook
  }
  catch (error)
  {
 throw error
  }
}

app.post('/books',async (req,res) => {
  
  try {
    const savedBook =await createBook(req.body)
    res.status(201).json({message:"Books added Successfully",newBook:savedBook})
  }
  catch (error)
  {
res.status(500).json({error:'cant add Book'})
  }
})

// ----  3  -------

async function readAllBooks()
{
  try {
    const books =await Books.find()
    return books
  }
  catch (error)
  {
    throw error
  }
}

app.get('/books',async (req,res) => {
  try {
    const books = await readAllBooks()
    if (books)
    {
      res.json(books)
    }
    else
    {
      res.status(404).json({error:'Books not found'})
      }
  }
  catch(error)
  {
res.status(500).json({error:'cant fetch books'})
  }
})

// ----  4  -------

async function bookByTitle(bookTitle)
{
  try {
    const book =await Books.findOne({ title: bookTitle })
    return book
  }
  catch (error)
  {
    throw error
  }
}

app.get('/books/:bookTitle',async (req,res) => {
  
  try {
    const book =await bookByTitle(req.params.bookTitle)
    if (book)
    {
      res.json(book)
    }
    else
    {
      res.status(404).json({error:'book Not Found'})
      }
  }
  catch(error) {
    res.status(500).json({error:'cant fetch book'})
  }

})


// ----  5  -------

async function readBooksByAuthor(authorName)
{
  try {
    const books =await Books.find({ author: authorName })
    return books
  }
  catch(error)
  {
throw error
  }
}

app.get('/books/author/:authorName',async (req,res) => {
  
  try {
    const books =await readBooksByAuthor(req.params.authorName)
    if (books)
    {
     res.json(books)
    }
    else {
      res.status(404).json({ error:'books not found'})
    }
  }
  catch (error)
  {
    res.status(500).json({error:'cant fetch books'})
  }
})

// ----  6  -------

async function readBooksByGenre(genre)
{
  try {
    const books =await Books.find({ genre })
    return books
  }
  catch (error)
  {
    throw error
  }
}

app.get('/books/genre/:genreName',async (req,res) => {
  
  try {
    const books =await readBooksByGenre(req.params.genreName)
    if (books)
    {
res.json(books)
    }
    else
    {
      res.status(404).json({error:'Books Not Found'})
      }
  }
  catch (error)
  {
res.status(500).json({error:'Cant fetch Books'})
  }
})

// ----  7  -------

async function readBookByRealeaseYear(publishedYear)
{
  try {
    const books =await Books.find({ publishedYear })
    return books
  }
  catch (error)
  {
    throw error
  }
}

app.get('/books/publishedYear/:realeaseYear',async (req,res) => {
  
  try {
    const books =await readBookByRealeaseYear(req.params.realeaseYear)
    if (books)
    {
   res.json(books)
    }
    else
    {
      res.status(404).json({error:'Books Not Found'})
      }
  }
  catch (error)
  {
    res.status(500).json({error:'cant fetch books'})
  }

})

// ----  8  -------

async function updateBookById(bookId,dataToUpdate)
{
  try {
    const updatedBook = await Books.findByIdAndUpdate(bookId, dataToUpdate, { new: true })
    return updatedBook
  }
  catch (error)
  {
    throw error
  }
}

app.post('/books/:bookId',async (req,res) => {
  
  try {
    const updatedBook =await updateBookById(req.params.bookId, req.body)
    if (updatedBook)
    {
res.status(200).json({message:'book updated successfully',updatedBook:updatedBook})
    }
    else
    {
      res.status.json({error:'Book does not exist'})
      }
  }
  catch(error) {
    res.status(500).json({error:'cant update book'})
  }

})

// ----  9  -------

async function updateBookByTitle(title,dataToUpdate)
{
  try {
    const updatedBook =await Books.findOneAndUpdate({title:title},dataToUpdate,{new:true})
  return updatedBook
  }
  catch (error)
  {
    throw error
  }
}

app.post('/books/title/:booksTitle',async (req,res) => {
  try {
    const updatedBook =await updateBookByTitle(req.params.booksTitle, req.body)
    if (updatedBook)
    {
res.status(200).json({message:'Book Updated Successfully',updatedBook:updatedBook})
    }
    else
    {
      res.status(404).json({error:'Book does not exist'})
      }
  }
  catch(error)
  {
res.status(500).json({error:'cant update book'})
  }
})

// ----  10  -------

async function deleteBookById(bookId)
{
  try {
    const deletedBook = Books.findByIdAndDelete(bookId)
    return deletedBook
  }
  catch (error)
  {
    throw error
  }
}

app.delete('/books/:bookId',async (req,res) => {
  try {
    const deletedBook =await deleteBookById(req.params.bookId)
    if (deletedBook)
    {
      res.status(200).json({ message: 'Book deleted successfully',Book:deletedBook })
    }
    else
    {
      res.status(404).json({error:'Book not found'})
      }
  }
  catch (error)
  {
    res.status(500).json({error:'cant delete book'})
  }
})

