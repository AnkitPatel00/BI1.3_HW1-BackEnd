const mongoose = require('mongoose')
const mongoURI = ""

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
