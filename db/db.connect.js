const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://ankitpatelstockimage:21fNgXnjGeqMeSvE@neog.m2gumtj.mongodb.net/?retryWrites=true&w=majority&appName=neoG"

const initializeDatabase = async () =>
{
  try {
    const connection =await mongoose.connect(mongoURI)
    if (connection)
    {
      console.log('Connected Successfully')
    }
  }
  catch (error)
  {
    console.log("Connection Failed:",error)
  }
}

module.exports = {initializeDatabase}