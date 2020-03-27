var express = require('express');
var app = express();

const io = require('socket.io')();

const port = process.env.PORT || 3030;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

io.attach(server);

io.on('connection', function(socket) {
    console.log('a user has connected');
    socket.emit('connected', {sID: socket.id, message: "new connection"});

    socket.on('chat_message', function(msg) {
        console.log(msg); 
        
            socket.on('userJoined', function(user){
        console.log(user+ 'has joined the chat');
        io.emit('newUser', user);
    })
     
        io.emit('new_message', { id: socket.id, message: msg})
    })

    socket.on('disconnect', function() {
        console.log('a user has disconnected');
    })
})