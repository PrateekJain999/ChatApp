let socket = io();

var name = window.prompt("Enter your name: ");

socket.on('connect', function(){
    console.log("User connected");
});

socket.on('disconnect', function(){
    console.log("User disconnected");
});

socket.on('newMessage', function(message){
    console.log(message);
    const formattedTime = moment(message.createdAt).format('LT');
    let li = document.createElement('li');

    li.innerText = `${message.from} ${formattedTime} : ${message.text}`
    document.querySelector('body').appendChild(li);
})

document.querySelector('#submit-btn').addEventListener('click', function (event){
    event.preventDefault();
    
    socket.emit("message", {
        from: name,
        text: document.querySelector('input[name="message"]').value
    }, function(){

    })
});