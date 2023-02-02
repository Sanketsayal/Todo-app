const mongoose=require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/todo_list');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error in establishing database'));
db.once('open',function(){
    console.log('database connected');
});