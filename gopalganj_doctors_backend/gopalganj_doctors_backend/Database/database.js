const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "doctors_chamber",
});

con.connect(function (err) {
  if (err) {
    console.log("Connection error");
  } else {
    console.log("Connected");
  }
});

module.exports = con;