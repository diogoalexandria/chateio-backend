const io = require('socket.io')(8000)

users={

}

io.on('connect', (client)=>{
    client.on('connected', (data)=>{
        
        users[client.id] = data
        console.log(users)
    })

})
