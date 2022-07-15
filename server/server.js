// Nicolás Cabrera Rodriguez

const app = require('express')(); // Se importa express

const http = require('http').Server(app); // Se importa http

const io = require('socket.io')(http); // Se importa socket.io

const port = process.env.PORT || 3000; // Se define el puerto

var path = require('path'); // Se importa path

var express = require('express'); // Se importa express
const { Socket } = require('socket.io');

app.use(express.static('client')); // Se define la carpeta cliente

var listauser = {}; // Se define el objeto user

var nombre = []; // Se define el array nombre



io.on('connection', (socket) => { // Se define el evento de conexión


    socket.on('user', (nombre) => { // Se define el evento user

        listauser[socket.id] = // Se define el objeto user
        {
            nombre: nombre, // Se le asigna el nombre

        }; // Se añade el nombre al objeto user

        io.emit('userList', listauser); // Se envia el objeto user
    });

    socket.on('ding', (sonido) => { // Se define el evento ding

        socket.broadcast.emit('ding'); // Se envia el mensaje

    });


    socket.on('typing', (nombre) => { // Se define el evento typing
        console.log(listauser); // Se muestra en consola el nombre
        //io.emit('typing',listauser); // Se envia el nombre
        socket.broadcast.emit('typing', `      
        <div class="escribiendo">
        ${listauser[socket.id].nombre}
        <span style="--i:1">e</span>
        <span style="--i:2">s</span>
        <span style="--i:3">t</span>
        <span style="--i:4">a</span>
        <span style="--i:5"> </span>
        <span style="--i:6">e</span>
        <span style="--i:7">s</span>
        <span style="--i:8">c</span>
        <span style="--i:9">r</span>
        <span style="--i:10">i</span>
        <span style="--i:11">b</span>
        <span style="--i:12">i</span>
        <span style="--i:13">e</span>
        <span style="--i:14">n</span>
        <span style="--i:15">d</span>
        <span style="--i:16">o</span>
        <span style="--i:17" class="punto">.</span>
        <span style="--i:18" class="punto">.</span>
        <span style="--i:19" class="punto">.</span>
      </div>`); // Se envia el nombre
    });


    console.log('Un usuario se ha conectado'); // Se muestra en consola que un usuario se ha conectado

    socket.on('disconnect', () => { // Se define el evento de desconexión

        delete listauser[socket.id]; // Se elimina el nombre del objeto user

        io.emit('user', listauser); // Se envia el objeto user

        io.emit('userList', listauser); // Se envia el objeto user
        io.emit('userList', listauser); // Se envia el objeto user

        console.log('Un usuario se ha desconectado'); // Se muestra en consola que un usuario se ha desconectado

    });

    socket.on('mensaje del chat', (msg) => { // Se define el evento de mensaje

        console.log(`mensaje: ${msg}`); // Se muestra en consola el mensaje

        io.emit('mensaje del chat', `${listauser[socket.id].nombre} : ${msg}`); // Se envia el mensaje

    });

    // * snoop dogg
    socket.on('gifs', (gifs) => { // Se define el evento gif

        io.emit('gifs', (gifs)); // Se envia el gif


    });

    // * john cena
    socket.on('john', (cena) => { // Se define el evento gif

        io.emit('john', (cena)); // Se envia el gif


    });


    // * toasty
    socket.on('toasty', (mk) => { // Se define el evento gif

        io.emit('toasty', (mk)); // Se envia el gif


    });


});


http.listen(port, () => { // Se define el puerto

    console.log(`Servidor corriendo en el puerto ${port}`); // Se muestra en consola el puerto

});




