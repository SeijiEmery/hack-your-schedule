var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var todos = [];

var increment = 0;
app.get('/', function(req, res) {
   res.sendfile('index.html');
});

io.on('connection', function(socket) {
    socket.emit("sync",{"tasks":todos});
    socket.on('add', function(data) {
    console.log(data);
    todos.push(data);   
});

// todo
    // socket.on('delete', function(data) {
    //     try{
    //     delete todos[data.key];
    //     }catch(e){
    //         console.log("Error no key");
    //     }
    //         console.log(todos);
    // });

    // socket.on('update', function(data) {
    //     todos.pop();
    //     todos.push(data);
    //     console.log("TODO: Update");
    // });
});

http.listen(8000, function() {
   console.log('listening on localhost:8000');
});

//Is the task sent?
//Is it clicked?
//How much time?
//ID