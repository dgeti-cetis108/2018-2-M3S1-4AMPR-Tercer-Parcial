const express = require("express");
const app = express();
const port = 5000;

app.use("/", express.static('.'));

app.listen(port, () => {
  console.log(`Servidor Express funcionando en el puerto ${port}`);
});
