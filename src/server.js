const express = require('express');
const routes = require('./routes');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(routes);
// app.use('/', (req, res) => {
//     res.render('index.html');
// });
app.use('/room-one', (req, res) => {
    res.render('room-one.html');
});
app.use('/room-two', (req, res) => {
    res.render('room-two.html');
});
// app.use('/home', (req, res) => {
//     res.render('home.html');
// });

let messages = [];

// io.on('connection', socket => {    
//     console.log(`Socket conectado: ${socket.id}`);
//     socket.emit('previousMessages', messages);
//     socket.on('sendMessage', data => {        
//         message.push(data);
//         socket.broadcast.emit('receivedMessage', data)
//     });
//     socket.on('disconnect', () => {
//         console.log(socket.id, 'desconectado!');
//     })
// });

let messagesRoomOne = [];
let messagesRoomtwo= [];

const roomOne = io.of('/room-one');
roomOne.on('connection', socket => {
    console.log(`${socket.id} connected to room one`);    
    socket.emit('previousMessages', messagesRoomOne);
    socket.on('sendMessage', data => {
        messagesRoomOne.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });
    socket.on('disconnect', () => {
        console.log(socket.id, 'disconnected from room one');
    });    
});

const roomTwo = io.of('/room-two');
roomTwo.on('connection', socket => {
    console.log(`${socket.id} connected to room two`);
    socket.emit('previousMessages', messagesRoomtwo);
    socket.on('sendMessage', data => {
        messagesRoomtwo.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });
    socket.on('disconnect', () => {
        console.log(socket.id, 'disconnected from room two');
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
