var express = require("express")
var bodyParser = require("body-parser")
var app = express()
var port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// app.get('/', function (req, res) {
//   res.send('Hola Dummies!')
// })

// app.use('/', express.static('dist/public'))

// peticiones get, post, put, delete
// ruta get para /login (frontend)
// ruta post para /login (backend)
app.post('/login', (req, res) => {
  let user = req.body.user
  let password = req.body.password
  if (user == 'bidkar' && password == '123') {
    res.send(true)
  } else {
    res.send(false)
  }
})


app.listen(port, function () {
  console.log(`Servidor Express Funcionando en el puerto ${port}`)
})
