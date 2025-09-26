const mongoose = require('mongoose')

const connetDB =async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {})
        console.log('MongoDB Connected')
    }
    catch(err){
        console.error("Error Connecting to MongoDB")
        process.exit(1)
    }
}

module.exports = connetDB;