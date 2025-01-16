const app = require("./App");
const connectDatabase = require("./DB/Database");

//config
if(process.env.NODE_ENV!=='PRODUCTION'){
    require('dotenv').config({
        path: "config/.env",
    });
}

//create server 
const server = app.listen(process.env.PORT, ()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`);
    
})

process.on('uncaughtException',(err)=>{
    console.log(`Error:${err.message}`);
    console.log("shutting down the server for handling uncaught exception");
    server.close(()=>{
        process.exit(1);
    }) 
})

connectDatabase(); 