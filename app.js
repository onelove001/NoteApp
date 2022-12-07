const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const port = 3000;
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Setting up database connction

// Setting up the database connection
const mongoose = require("mongoose");
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/noteDB');
}

const noteSchema = new mongoose.Schema({
  noteTitle:String,
  noteContent:String
});

const Note = mongoose.model("Note", noteSchema)

app.listen(port, () => {
  console.log("Server started on port "+port);
});

app.get("/", (req, res) => {
    res.render("dashboard", {})
})

app.get("/list", (req, res) => {
  Note.find({}, (error, data) => {
    res.render("list", {notes:data});
  })
});


app.get("/titles", (req, res) => {
  Note.find({}, (error, data) => {
    res.render("titles", {notes:data});
  })
});


app.get("/compose", (req, res) => {
  res.render("compose", {});
});


app.post("/compose", (req, res) => {
  const note = new Note({
    noteTitle:req.body.noteTitle,
    noteContent:req.body.noteText,
  });
  note.save((err) => {
    if(!err){
      res.redirect("/")
    }
  });
});


app.get("/notes/:noteID", (req, res) => {
  const noteID = req.params.noteID;
  Post.findOne({_id:noteID}, (error, data) => {
    if(!error){
      console.log(data)
      res.render("post", {noteObject:data});
    }
  });

});
