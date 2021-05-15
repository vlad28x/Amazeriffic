var express = require("express"),
http = require("http"),
app = express(),
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
//Схема модели данных для задач
var ToDoSchema = mongoose.Schema({
	"description" : String,
	"tags" : [String]
});
//Модель данных для задач
var ToDo = mongoose.model("ToDo", ToDoSchema);
app.get("/todos.json", function(req, res) {
	ToDo.find({}, function(err, toDos) {
		if(err !== null) {
			console.log(err);
			res.send("ERROR");
		} else {
			res.json(toDos);
		}
	});
});
app.post("/todos", function(req, res) {
	var newToDo = new ToDo({
		"description" : req.body.description,
		"tags" : req.body.tags
	});
	newToDo.save(function(err, result) {
		if(err !== null) {
			console.log(err);
			res.json(err);
		} else {
			res.json(result);
		}
	});
});