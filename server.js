var express = require("express"),
http = require("http"),
app = express(),
toDosController = require("./controllers/todos_controller.js"),
usersController = require("./controllers/users_controller.js"),
mongoose = require("mongoose");
app.use('/', express.static(__dirname + '/client'));
app.use('/user/:username', express.static(__dirname + '/client'));
app.use(express.urlencoded({extended : true}));
http.createServer(app).listen(3000);
//подключаемся к хранилищу данных Amazeriffic в Mongo
mongoose.connect("mongodb://localhost/amazeriffic", {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "console error:"));
db.once("open", function() {
	console.log("Mongoose: we're connected!");
});
app.get("/todos.json", toDosController.index);
app.post("/todos", toDosController.create);
app.get("/todos/:id", toDosController.show);
app.put("/todos/:id", toDosController.update);
app.delete("/todos/:id", toDosController.destroy);

app.get("/user/:username/todos.json", toDosController.index);
app.post("/user/:username/todos", toDosController.create);
app.get("/user/:username/todos/:id", toDosController.show);
app.put("/user/:username/todos/:id", toDosController.update);
app.delete("user/:username/todos/:id", toDosController.destroy);

app.get("/user.json", usersController.index);
app.post("/user", usersController.create);
app.get("/user/:username", usersController.show);
app.put("/user/:username", usersController.update);
app.delete("/user/:username", usersController.destroy);