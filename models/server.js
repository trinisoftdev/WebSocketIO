const express = require("express");
const { createServer } = require("http");
const { Server: SocketIO } = require("socket.io");
const path = require('path');
const cors = require('cors');

const Sockets = require('./sockets')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // HTTP SERVER
    this.httpServer = createServer(this.app);

    // CONFIGURACIÒN DE SOCKETS
    this.io = new SocketIO(this.httpServer, { /* options */ });
  }

  middlewares() {
    // Desplegar el directorio público
    this.app.use(express.static( path.resolve( __dirname, '../public' )))

    // CORS
    this.app.use( cors() );
  }

  configurarSockets() {
    new Sockets( this.io );
  }

  execute() {
    // Inicialiar Middlewares
    this.middlewares();

    // Inicializar sockets
    this.configurarSockets();

    // Inicializar Server
    this.httpServer.listen(this.port, () => {
      console.log('Servidor corriendo en el puerto: ' + this.port);
    });
  }
}

module.exports = Server;