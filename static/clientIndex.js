let socket = io();

socket.on('connect', function(){
    console.log("User connected");
});

socket.on('disconnect', function(){
    console.log("User disconnected");
});

socket.on('newMessage', function(message){
    console.log(message);
})

socket.emit('message', {
    from:"pk",
    to: "pj"
}, function(){
    console.log('Server got it.')
})