var express = require('express');
var app = express();

// add socket here
const io = require('socket.io')();

const port = process.env.PORT || 3030;

// tell express where our static files are (js, images, css etc)
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

// attach our chat server to our app
io.attach(server);

io.on('connection', function(socket) { // socket is your connection
    console.log('a user has connected');
    io.emit('connected', {sID: socket.id, message: "new connection"});
    

    socket.on('userJoined', function(user){
        console.log(user+ 'has joined the chat');
        io.emit('newUser', user);
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', (data))
      })

    socket.on('chat_message', function(msg) {
        console.log(msg); 
        io.emit('new_message', { id: socket.id, message: msg})
    })

    socket.on('disconnect', function() {
        console.log('a user has disconnected');
    })
})