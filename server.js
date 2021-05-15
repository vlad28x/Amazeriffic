var express = require("express"),
http = require("http"),
app = express(),
ToDosController = require("./controllers/todos_controller.js"),
mongoose = require("mongoose");
app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded({extended : true}));
http.createServer(app).listen(3000);
//подключаемся к хранилищу данных Amazeriffic в Mongo
mongoose.connect("mongodb://localhost/amazeriffic", {useNewUrlParser: true});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "console error:"));
db.once("open", function() {
	console.log("mongoose: we're connected!");
});
app.get("/todos.json", ToDosController.index);
app.post("/todos", ToDosController.create);