var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var todos = {};

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

io.on('connection', function(socket) {
    socket.on('add', function(data) {
       console.log(data);
       todos.append(data);
       console.log(todos)
    });

    socket.on('delete', function(data) {
        console.log("TODO: Delete");
    });

    socket.on('update', function(data) {
        console.log("TODO: Update");
    });

    socket.on('create', function(data) {
        console.log("TODO: Create");
    });
});

http.listen(8000, function() {
   console.log('listening on localhost:8000');
});

//Is the task sent?
//Is it clicked?
//How much time?
//ID