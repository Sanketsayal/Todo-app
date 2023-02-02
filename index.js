const express=require('express');
const path=require('path');
const port=8000;
const db=require('./config/mongoose.js');
const todolist=require('./models/todo.js');
const app=express();

app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/',function(req,res){
    todolist.find({},function(err,tasks){
        if(err){
            console.log('error in fetching contacts');
            return;
        }
        return res.render('home',{
            title:'Todo App',
            task_list:tasks
        })
    })
})

app.post('/create-task',function(req,res){
    console.log(req.body);
    todolist.create({
        task:req.body.task,
        category:req.body.category,
        date:req.body.date
    },function(err,newTask){
        if(err){
            console.log(`Error in creating task: ${err}`);
            return;
        }
        console.log('task created');
        return res.redirect('/');
    });
    
});

app.get('/delete-task',function(req,res){
    let id=req.query.id;
    todolist.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting');
            return;
        }
        return res.redirect('/');
    })
});


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`);
    }
    console.log(`Server is running on: ${port}`);
});