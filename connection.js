// require("dotenv").config();
const mysql = require("mysql2");

const connectionString=({
  host:"127.0.0.1",
  user:"root",
  password:"Neha@0605!",
  database:"seatify"
});

let connection = mysql.createConnection(connectionString);


connection.connect((err)=>{
  if (err) {
    console.error("Error!", err);
  }else{
    console.log("Database Connected Successfully!");
  }
})

module.exports = connection;
