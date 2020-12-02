const express = require('express');
const bodyParser= require('body-parser');
const cors=require('cors');
require('dotenv').config();
const TodoTask = require("./models/todoschema");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());


const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DB_CONNECT || "mongodb+srv://nik:nikheel@cluster0.enx00.mongodb.net/<dbname>?retryWrites=true&w=majority", { useNewUrlParser: true }, () => {
console.log("Connected to db!")});

tasks=['headline','abdhv','asjhdj'];
app.get('/',(req,resp)=>{TodoTask.find({}, (err, tasks) => {resp.render("todo.ejs", { todoTasks: tasks });});});


app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
    headline:req.body.headline,
    content: req.body.content
    });
    try {
    await todoTask.save();
    res.redirect("/");
    } catch (err) {
        console.log(err)
    res.redirect("/");
    }
    });

app.route("/remove/:id").get((req, res) => {const id = req.params.id;TodoTask.findByIdAndRemove(id, err => {if (err) return res.send(500, err);res.redirect("/");});});

app.route("/edit/:id").post((req, res) => {
const id = req.params.id;
TodoTask.findByIdAndUpdate(id, { headline:req.body.headline,content: req.body.content }, err => {
if (err) return res.send(500, err);
res.redirect("/");
});
});

// app.post('/',(req,resp)=>{resp.render('todo.ejs')});





app.listen(process.env.PORT|| 3000,()=>{
    console.log(`app is runing on ${process.env.PORT}`)
})