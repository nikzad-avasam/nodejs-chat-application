const socket = io()
const clientsTotal = document.getElementById('clients-total')
const messageContainer = document.getElementById('message-container') 
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

messageForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    sendMessage()
})

socket.on('client-total' , (data)=>{
    console.log(data)
    clientsTotal.innerText = `total clients : ${data}`
})

function sendMessage(){
    if(messageInput.value === '') return
    const data ={
        name:nameInput.value,
        message : messageInput.value , 
        dateTime : new Date()
    }
    socket.emit('message',data)

    addMessageToUI(true , data)
}

socket.on('chat-message',(data)=>{
    console.log(data.message)
    
    addMessageToUI(false , data)
})
function addMessageToUI(isOwnMessage,data){
    const element = 
    `
        <li class="${isOwnMessage ? "message-right" : "message-left" } ">
            <p class="message">
               ${data.message}
            </p>
            <span>${data.name} . ${moment(data.dateTime).fromNow()}</span>
        </li>
    `
    messageContainer.innerHTML += element
    messageInput.value = ''
    scrollToBottom()
}

function scrollToBottom(){
    messageContainer.scrollTo(0 , messageContainer.scrollHeight)
}