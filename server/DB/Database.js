const mongoose = require("mongoose");
const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URL,{}).then((data)=>{
        console.log(`MongoDb connected with the server ${data.connection.host}`);
        
    })
}

module.exports = connectDatabase;