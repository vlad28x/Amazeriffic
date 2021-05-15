var express = require("express"),
http = require("http"),
app = express(),
toDosController = require("./controllers/todos_controller.js"),
usersController = require("./controllers/users_controller.js"),
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
app.get("/users/:username/todos.json", toDosController.index);
app.post("/users/:username/todos", toDosController.create);

app.get("/users.json", usersController.index);
app.post("/users", usersController.create);
app.get("/users/:username", usersController.show);
app.put("/users/:username", usersController.update);
app.del("/users/:username", usersController.destroy);