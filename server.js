var express = require("express"),
	http = require("http"),
	mongoose = require("mongoose"),
	ToDosController = require("./controllers/todos_controller.js"),
	UsersController = require("./controllers/users_controller.js"),
	app = express(); 
http.createServer(app).listen(3000);
app.use('/',express.static(__dirname + "/client"));
app.use(express.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost/amazeriffic", {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "console error:"));
db.once("open", function() {
	console.log("mongoose: we're connected!");
});

app.get("/todos.json", ToDosController.index);
app.get("/todos/:id", ToDosController.show); 
app.post("/todos", ToDosController.create);
app.put("/todos/:id", ToDosController.update);
app.delete("/todos/:id", ToDosController.destroy);

app.get("/user/:username/todos.json", ToDosController.index);
app.post("/user/:username/todos", ToDosController.create);
app.put("/user/:username/todos/:id", ToDosController.update);
app.delete("/user/:username/todos/:id", ToDosController.destroy);

app.get("/user.json", UsersController.index);
app.post("/user", UsersController.create);
app.get("/user/:username", UsersController.show);
app.put("/user/:username", UsersController.update);
app.delete("/user/:username", UsersController.destroy);