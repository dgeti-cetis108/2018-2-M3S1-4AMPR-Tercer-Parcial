var express = require("express")
var app = express()
var port = 3000

// app.get('/', function (req, res) {
//   res.send('Hola Dummies!')
// })

app.use('/', express.static('dist/public'))


app.listen(port, function () {
  console.log(`Servidor Express Funcionando en el puerto ${port}`)
})
