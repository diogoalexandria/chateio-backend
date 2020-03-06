const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});

let message = [];

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);
    socket.emit('previousMessages', message);
    socket.on('sendMessage', data => {
        console.log(data);
        message.push(data);
        socket.broadcast.emit('receivedMessage', data)
    })
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});