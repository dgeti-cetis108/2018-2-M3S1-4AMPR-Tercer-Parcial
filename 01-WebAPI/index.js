const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;
const db = new sqlite3.Database("db/cetis108.db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/user/login", async (req, res) => {
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
  try {
    await saveNewUser(user, res);
  } catch (error) {
    console.log(error);
    res.send({ userCreated: false });
  }
});

// cambiar contraseña
app.post("/api/user/password/save", async (req, res) => {
  let user = {};
  user.newPassword = req.body.user_new_password;
  user.id = req.body.user_id;
  try {
    await saveNewPassword(user, res);
  } catch (error) {
    console.log(error);
    res.send({ isSaved: false });
  }
});

// cambiar estatus de usuarios
app.post("/api/user/activate", async (req, res) => {
  user_id = req.body.user_id;
  try {
    await changeStatus(user_id, res, 1);
  } catch (error) {
    console.log(error);
    res.send({ isChanged: false });
  }
});

app.post("/api/user/deactivate", async (req, res) => {
  user_id = req.body.user_id;
  try {
    await changeStatus(user_id, res, 0);
  } catch (error) {
    console.log(error);
    res.send({ isChanged: false });
  }
});

app.listen(port, function() {
  console.log(`Servidor Express Funcionando en el puerto ${port}`);
});

function changeStatus(user_id, res, status) {
  return new Promise((resolve, reject) => {
    let query = "UPDATE users SET status=? WHERE id=?";
    db.run(query, [status, user_id], function(err) {
      if (err) {
        reject(err.message);
      }
      resolve(this.changes);
    });
  }).then(val => {
    if (val == 0) {
      res.send({ isStatusChanged: false });
    } else {
      res.send({ isStatusChanged: true });
    }
  });
}

function saveNewPassword(user, res) {
  return new Promise((resolve, reject) => {
    let query = "UPDATE users SET passwd=? WHERE id=?";
    db.run(query, [user.newPassword, user.id], function(err) {
      if (err) {
        reject(err.message);
      }
      resolve(this.changes);
    });
  }).then(val => {
    if (val == 0) {
      res.send({ isSaved: false });
    } else {
      res.send({ isSaved: true });
    }
  });
}

function saveNewUser(u, res) {
  return new Promise((resolve, reject) => {
    let query =
      "INSERT INTO users (name,passwd,firstname,lastname,email) VALUES (?,?,?,?,?)";
    db.run(query, [u.name, u.passwd, u.firstname, u.lastname, u.email], err => {
      if (err) {
        reject(err.message);
      } else {
        resolve("Usuario creado correctamente");
      }
    });
  }).then(val => {
    console.log(val);
    res.send({ userCreated: true });
  });
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
