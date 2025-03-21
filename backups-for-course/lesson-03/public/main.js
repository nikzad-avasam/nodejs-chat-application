const socket = io()
const clientsTotal = document.getElementById('clients-total')

socket.on('client-total' , (data)=>{
    console.log(data)
    clientsTotal.innerText = `total clients : ${data}`
})