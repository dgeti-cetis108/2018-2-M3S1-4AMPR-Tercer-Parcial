const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;
const db = new sqlite3.Database("db/cetis108.db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/login", async (req, res) => {
  let user = req.body.user;
  let password = req.body.password;
  let result = await login(user, password);
  if (result) {
    res.send({ exist: true, data: result });
  } else {
    res.send({ exist: false });
  }
});

// validar existencia de nombre de usuario
app.post("/api/user/validate/name", async (req, res) => {
  let username = req.body.username;
  let result = await isValidUserName(username);
  if (result.total == 1) {
    res.send({ isValid: false });
  } else {
    res.send({ isValid: true });
  }
});

// validar existencia de correo electronico
app.post("/api/user/validate/email", async (req, res) => {
  let useremail = req.body.useremail;
  let result = await isValidUserEmail(useremail);
  if (result.total == 0) {
    res.send({ isValid: true });
  } else {
    res.send({ isValid: false });
  }
});

app.post("/api/user/new", async (req, res) => {
  // name,passwd,firstname,lastname,email
  let user = {};
  user.name = req.body.user_name;
  user.passwd = req.body.user_passwd;
  user.firstname = req.body.user_firstname;
  user.lastname = req.body.user_lastname;
  user.email = req.body.user_email;
  await saveNewUser(user);
  // TODO: evaluate results
});

app.listen(port, function() {
  console.log(`Servidor Express Funcionando en el puerto ${port}`);
});

function saveNewUser(user) {
  // TODO: code here
}

function login(username, userpasswd) {
  return new Promise((resolve, reject) => {
    // realizar la consulta
    let query =
      "SELECT id,name,firstname,lastname,email FROM users WHERE name=? AND passwd=?";
    db.get(query, [username, userpasswd], (err, row) => {
      if (err) {
        console.error(err.message);
        // retornar un valor
        reject(false);
      }
      // retornar un valor
      resolve(row);
    });
  });
}

function isValidUserName(username) {
  return new Promise(resolve => {
    let query = "SELECT COUNT(id) AS 'total' FROM users WHERE name=?";
    db.get(query, [username], (err, row) => {
      if (err) {
        console.error(err.message);
      }
      resolve(row);
    });
  });
}

function isValidUserEmail(useremail) {
  return new Promise(resolve => {
    let query = "SELECT COUNT(id) AS 'total' FROM users WHERE email=?";
    db.get(query, [useremail], (err, row) => {
      if (err) {
        console.error(err.message);
      }
      resolve(row);
    });
  });
}
