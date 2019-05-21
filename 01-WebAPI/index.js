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
    res.send(result);
  } else {
    res.send(false);
  }
});

app.listen(port, function() {
  console.log(`Servidor Express Funcionando en el puerto ${port}`);
});

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
