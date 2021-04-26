let socket = io();

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

socket.on('newLocationMessage', function(message){
    console.log(message);
    const formattedTime = moment(message.createdAt).format('LT');

    let li = document.createElement('li');
    let a = document.createElement('a');
    li.innerText = `${message.from} ${formattedTime} : `
    a.setAttribute('target', '_blank')
    a.setAttribute('href', message.url)

    a.innerText='My current location';
    li.appendChild(a)

    document.querySelector('body').appendChild(li);
})

document.querySelector('#submit-btn').addEventListener('click', function (event){
    event.preventDefault();

    socket.emit("message", {
        from:"User",
        text: document.querySelector('input[name="message"]').value
    }, function(){

    })
});

document.querySelector('#send-location').addEventListener('click', function (event){
    if(!navigator.geolocation){
        return alert('Geo Location is not supported')
    }

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocation',{
            lat: position.coords.latitude,
            lon: position.coords.longitude
        })
    }, function(){
        alert('Unable to fetch location')
    })
});