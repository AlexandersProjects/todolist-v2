//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];
// mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");
 
//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
//   const itemsSchema = new mongoose.Schema({
//     name: String,
//   });


mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", { useNewUrlParser: true })
.then(function() {
  console.log("Successfully connected to the database");  

  // const item1 = new Item({
  //   name: "Welcome to your todolist!"
  // });
  
  // const item2 = new Item({
  //   name: "Hit the + button to add a new item."
  // });
  
  // const item3 = new Item({
  //   name: "<-- Hit this to delete an item."
  // });
  
  // const defaultItems = [item1, item2, item3];

  // return Item.insertMany(defaultItems);

})
.then(function() {
  // console.log("Successfully saved all the default items to todolistDB.");

  // Start the server after the default items are inserted
  app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
})
.catch(function(err) {
  console.log("Error connecting to the database: " + err);
});

const itemsSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemsSchema);


// mongoose.connection.close();

// Item.insertMany(defaultItems, function(error, docs) {});
// Item.insertMany(defaultItems).then(function() {
//   console.log("Succesfully saved all the default items to todolistDB.");
// }).catch(function(err) {
//   console.log(err);
// });

app.get("/", function(req, res) {

  // const day = date.getDate();

  const items = Item.find({}).exec().then(savedItems => {
    res.render("list", {
      listTitle: "Today", 
      newListItems: savedItems});
      return savedItems;
  }).catch(err => console.log(err));
  // const items = Item.find().select("name");
  console.log(items);

  // res.render("list", {listTitle: day, newListItems: items});
  // res.render("list", {listTitle: "Today", newListItems: items});

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    // workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

// app.listen(3000, function() {
//   console.log("Server started on port 3000");
// });
