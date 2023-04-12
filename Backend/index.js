const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

//Handling Uncought Exception(R)
process.on("uncaughtException",(err)=>{
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncought Execptions`);
  process.exit(1);
})

// Config
dotenv.config({ path: "./config/config.env" });

// connect with database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Started server at http://localhost:${process.env.PORT}.`);
});


//Unhandled Promise Rejection(R)
process.on("unhandledRejection",(err)=>{
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(()=>{
    process.exit(1);
  })
})