var User = require("../models/user.js"),
UsersController = {};
User.find({}, function(err, result) {
	if(err !== null) {
		console.log(err);
	} else if(result.length === 0) {
		console.log("Создание тестового пользователя…");
		var exampleUser = new User({"username" : "Vlad"});
		exampleUser.save(function(err, result) {
			if(err) {
				console.log(err);
			} else {
				console.log("Тестовый пользователь сохранен");
			}
		});
	}
});
UsersController.index = function(req, res) {
	console.log("index action called");
	res.send(200);
};
UsersController.show = function(req, res) {
	console.log("show action called");
	User.find({"username" : req.params.username}, function(err, result) {
		if(err) {
			console.log(err);
			res.status(500).send(err);
		} else if(result.length !== 0) {
			res.sendFile('./client/list.html');
		} else {
			res.send(404);
		}
	});
};
UsersController.create = function(req, res) {
	console.log("create action called");
	res.send(200);
};
UsersController.update = function(req, res) {
	console.log("update action called");
	res.send(200);
};
UsersController.destroy = function(req, res) {
	console.log("destroy action called");
	res.send(200);
};
module.exports = UsersController;