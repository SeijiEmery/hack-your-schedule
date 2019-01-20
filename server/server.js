var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var todos = [];

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

io.on('connection', function(socket) {
    socket.on('add', function(data) {
        //Merge create
        todos.push(data);
        console.log(todos);
    });

    socket.on('delete', function(data) {
        todos.pop();
        console.log(todos);
    });

    socket.on('update', function(data) {
        todos.pop();
        todos.push(data);
        console.log(todos);
    });
});

http.listen(8000, function() {
   console.log('listening on localhost:8000');
});

//Is the task sent?
//Is it clicked?
//How much time?
//ID