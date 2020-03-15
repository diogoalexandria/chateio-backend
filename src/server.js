if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
// const bcrypt = require('bcrypt');
const passport = require('passport');
const initializePassport = require('./passport-config');
const flash = require('express-flash');
const session = require('express-session');

initializePassport(passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

const PORT = process.env.PORT

let user = [];

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/register', async (req, res) => {
    console.log(req);
    try {
        // const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        res.send(req);
    } catch {
        res.send("Algo deu errado!");
    }
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
});


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

