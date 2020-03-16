if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const { routes, passport } = require('./routes');
const flash = require('express-flash');
const session = require('express-session');
const bodyParse = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT;
const SECRET = process.env.SESSION_SECRET;

// let users = [];

app.use(cors());
app.use(bodyParse.urlencoded({
    extended: true
}));
app.use(bodyParse.json());
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
});
app.use(routes);

// const io = require('socket.io')(8000)

// const room = new Room()

// console.log(room)

// io.on('connect', (client) => {
//     client.on('connected', (nickname = null) => {
//         if (nickname) {
//             if (room.findUserByNickname(nickname)) {
//                 let user = room.findUserByNickname(nickname)
//                 console.log(user)
//                 user.updateConnection(client.id)
//             } else {
//                 room.users.push(new User({ nickname, connectionId: client.id }))
//             }
//         } else {
//             io.emit('Invalid Nickname')
//         }
//         console.log(room.users)
//     })
//     client.on('disconnect', (data) => {
//         try {
//             let user = findUserById(client.id)
//         } catch (e) {
//             console.error(e)
//         }
//         // console.log(`User ${user.nickname} foi desconectado do servidor.`)
//         console.log(user)
//         // user.updateConnection()
//         console.log(users)
//     })
// })

// class Room {
//     constructor() {
//         this.users = []
//     }

//     addUser = (nickname, connectionId) => {
//         this.users.push(new User({ nickname, connectionId }))
//     }
//     findUserById = connectionId => {
//         for (let user of this.users) {
//             if (user.connectionId === connectionId) {
//                 return user
//             }
//         }
//         return
//     }
//     findUserByNickname = nickname => {
//         for (let user of this.users) {
//             if (user.nickname === nickname) {
//                 return user
//             }
//         }
//         return
//     }
// }

// class User {
//     constructor(props) {
//         this.nickname = props.nickname
//         this.connectionId = props.connectionId
//         this.connected = true
//     }

//     updateConnection(connectionId = null) {
//         if (connectionId) {
//             this.connectionId = connectionId
//         } else {
//             this.connected = false
//             this.connectionId = null
//         }
//     }    
// }

