class Room {
    constructor() {
        this.users = []
    }
    
    addUser = (nickname, connectionId) => {
        this.users.push(new User({ nickname, connectionId }))
    }
    findUserById = connectionId => {
        for (let user of this.users) {
            if (user.connectionId === connectionId) {
                return user
            }
        }
        return
    }
    findUserByNickname = nickname => {
        for (let user of this.users) {
            if (user.nickname === nickname) {
                return user
            }
        }
        return
    }
}

const io = require('socket.io')(8000)

const room = new Room()

console.log(room)

io.on('connect', (client) => {
    client.on('connected', (nickname = null) => {
        if (nickname) {
            if (room.findUserByNickname(nickname)) {
                let user = room.findUserByNickname(nickname)
                console.log(user)
                user.updateConnection(client.id)
            } else {
                room.users.push(new User({ nickname, connectionId: client.id }))
            }
        } else {
            io.emit('Invalid Nickname')
        }
        console.log(room.users)
    })
    client.on('disconnect', (data) => {
        try {
            let user = findUserById(client.id)
        } catch (e) {
            console.error(e)
        }
        // console.log(`User ${user.nickname} foi desconectado do servidor.`)
        console.log(user)
        // user.updateConnection()
        console.log(users)
    })
})



class User {
    constructor(props) {
        this.nickname = props.nickname
        this.connectionId = props.connectionId
        this.connected = true
    }
    
    updateConnection(connectionId = null) {
        if (connectionId) {
            this.connectionId = connectionId
        } else {
            this.connected = false
            this.connectionId = null
        }
    }
    
}

