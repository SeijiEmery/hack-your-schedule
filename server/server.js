/*
by wise monkey
20190120
*/

const mongoose = require('mongoose');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


//setup database connection locally
mongoose.connect('mongodb://localhost/tasks',{ useNewUrlParser: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected To Mongo database");
});


// create a schema for the database ie formate of the 
// tasks in the json object
let TaskSchema = new mongoose.Schema({
  text: String,
  complete: Boolean,
  timestamp: Number,//todo change to Date() schema type https://www.tutorialspoint.com/mongodb/mongodb_quick_guide.htm 
  isDeleted:false,
  id:Number,
  tags: Array,
});
//data model functions (helper functions)
TaskSchema.methods.formateToString = function () {
    return `${this.text} ${this.complete} ${this.timestamp} ${this.isDeleted} ${this.id} ${this.tags} `;
}

// create new model using schema above
let TaskModel = mongoose.model("tasks",TaskSchema);
// let task = new TaskModel({text:"hello form the past!"});
// console.log(task);

let todos = [];
// function SaveToDatabase(_task){

// }
app.get('/', function(req, res) {
   res.sendfile('index.html');
});

io.on('connection', function(socket) {

    TaskModel.find(function(err, docs) {
    //docs = array of all the docs in the collections
        //TODO refactor if this part can be ran after load documenst
        socket.emit("sync",{"tasks":docs});
        console.log(docs);
    });
    
    socket.on('add', function(data) {
        // create a new document (aka table)
        // todo add try catch
        let task = new TaskModel(data);
        console.log(data); 

        task.save((error,task)=>{
            if(error){
                return console.error(error);
            }
            console.log(task.formateToString());
        })

    });
    socket.on('update', function(data) {
        // create a new document (aka table)
        // todo add try catch
        console.log(`----------\n${data}`)

        // TODO remove for each to make better speed in future
        if(data.length > 0){//deal with edge case
            data.forEach((value,i, arr)=>{

                let currentTask = value;
                let search_for_id =  value._id;


                console.log(currentTask);
                console.log(search_for_id);
                    if(currentTask.isDeleted == true){
                        try{
                            TaskModel.findByIdAndRemove(search_for_id, (err, todo) => {
                                if (err){
                                    return console.log(err);
                                } 
                                const response = {
                                    message: "successfully deleted",
                                    id: todo._id
                                };
                                return console.log(response);
                            });
                        }catch(e){
                            console.log(e);
                        }
                    }
            });
        }       

    });
});

http.listen(8000, function() {
   console.log('listening on localhost:8000');
});
