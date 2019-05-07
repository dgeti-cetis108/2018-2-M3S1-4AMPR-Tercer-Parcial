# Desarrolla aplicaciones web
## Repositorio de prácticas de tercer parcial

**Bidkar Aragón Cárdenas**

### Práctica 01
**WebAPI** (Interfaz de programación de aplicaciones)
- Requerimientos de desarrollo:
  - NodeJS v10.*
  - ExpresJS 4.*
  - Sqlite3

- Herramientas:
  - Postman
  - Navegador web

```bash
$ mkdir 01-WebAPI
$ cd 01-WebAPI
$ npm init -y
$ echo "node_modules/" > .gitignore
$ mkdir src
$ touch src/.gitkeep
$ touch index.js
$ npm i express sqlite3

# crear el repositorio git
$ cd ..
$ git init

# agregar los archivos iniciales
$ git add -A

# realizar el primer commit
$ git commit -m "Primera versión de tercer parcial"

# agregar el servidor remoto
$ git remote add origin https://github.com/dgeti-cetis108/2018-2-M3S1-4AMPR-Tercer-Parcial.git

# subir las versiones al servidor
$ git push -u origin master
```