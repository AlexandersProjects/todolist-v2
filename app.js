//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

  // mongoose schema
  const itemsSchema = new mongoose.Schema({
    name: String
  });

  // mongoose model
  const Item = mongoose.model("Item", itemsSchema);

// Start DataBase

// Catch errors of starting Database
main().catch((err) => console.log(err));
async function main() {
  // Use await
  await mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");
  // mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  console.log("Successfully connected to the database");  

  const item1 = new Item({
    name: "Welcome to your todolist!"
  });

  const item2 = new Item({
    name: "Hit the + button to add a new item."
  });

  const item3 = new Item({
    name: "<-- Hit this to delete an item."
  });
  
  const defaultItems = [item1, item2, item3];

  app.get("/", function(req, res) {

  // const day = date.getDate();
  
  console.log("Directly before 'items'");
  // const items = Item.find({}).exec().then(foundItem => {

  Item.find({})
  .then(foundItems => {
    if (foundItems.length === 0) {
      console.log("Successfully saved all the default items to todolistDB.");
      return Item.insertMany(defaultItems);
    } else {
      return foundItems;
    }
  })
  .then(savedItems => {
    res.render("list", {
      listTitle: "Today",
      newListItems: savedItems
    });
    console.log("The savedItems: " + savedItems); 
  })
  .catch(err => console.log(err));
});
}

// End DataBase


app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const newItem = new Item({
    name: itemName
  });
  console.log("The newItem: " + newItem);

  if (req.body.list === "Work") {
    // workItems.push(item);
    res.redirect("/work");
  } else {
    newItem.save();
    res.redirect("/");
  }

});

app.post("/delete", function(req, res){
    const checkedItemId = req.body.theCheckbox;
    console.log("checkedItemId = "  + checkedItemId);

    Item.findByIdAndRemove(checkedItemId).then( function(err) {
      if (!err) {
        console.log("Successfully deleted the item with the ID: " + checkedItemId);
        res.redirect("/")
      } else {
        console.log("Error deleting the item with the ID: " + checkedItemId);
        console.log(err);
      }
    });
  });

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

// TODO include: mongoose.connection.close();