const express = require('express')


const path = require('path')
const app = express()
const PORT = process.env.PORT || 8000
const server = app.listen(PORT,()=>{
    console.log(`chat server on port : ${PORT} `)
})

const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname,'public')))

let socketConnected = new Set()

io.on('connection',onConnected)

function onConnected(socket){
    console.log(`socket connected : ${socket.id}`)
    socketConnected.add(socket.id)

    io.emit('client-total', socketConnected.size)

    socket.on('disconnect',()=>{
        console.log(`socket disconnected ${socket.id}`)
        socketConnected.delete(socket.id)
        io.emit('client-total', socketConnected.size)
    })
}



