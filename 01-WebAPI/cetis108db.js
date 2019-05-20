const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("db/cetis108.db");

// createUsersTable();

function createUsersTable() {
  db.run(`CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(16) NOT NULL UNIQUE,
  passwd VARCHAR(200) NOT NULL,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(200) NOT NULL UNIQUE,
  registered DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status INTEGER DEFAULT 1
)`);
}

db.run(
  "INSERT INTO users (name,passwd,firstname,lastname,email) ",
  "values (?,?,?,?,?)",
  "bidkar",
  "123",
  "Bidkar",
  "Aragon",
  "bidkar@cetis108.edu.mx"
);
