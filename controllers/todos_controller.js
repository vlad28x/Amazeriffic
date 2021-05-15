var ToDo = require("../models/todo.js"),
User = require("../models/user.js"),
ToDosController = {};
ToDosController.index = function(req, res) {
	var username = req.params.username || null;
	var respondWithToDos = function(query) {
		ToDo.find(query, function(err, result) {
			if(err !== null) {
				res.status(500).json(err);
			} else {
				res.status(200).json(result);
			}
		});
	};
	if(username !== null) {
		User.find({"username" : username}, function(err, result) {
			if(err !== null) {
				res.status(500).json(err);
			} else if(result.length === 0) {
				res.send(404);
			} else {
				respondWithToDos({"owner" : result[0]._id});
			}
		});
	} else {
		respondWithToDos({});
	}
};
ToDosController.create = function(req, res) {
	var username = req.params.username || null;
	var newToDo = new ToDo({
		"description" : req.body.description,
		"tags" : req.body.tags
	});
	User.find({"username" : username}, function(err, result) {
		if(err) {
			res.send(500);
		} else {
			if(result.length === 0) {
				newToDo.owner = null;
			} else {
				newToDo.owner = result[0]._id;
			}
			newToDo.save(function(err, result) {
				if(err !== null) {
					res.status(500).json(err);
				} else {
					res.status(200).json(result);
				}
			});
		}
	});
};
ToDosController.show = function(req, res) {
	var id = req.params.id;
	ToDo.find({"_id" : id}, function(err, todo) {
		if(err !== null) {
			res.status(500).json(err);
		} else {
			if(todo.length > 0) {
				res.status(200).json(todo[0]);
			} else {
				res.send(404);
			}
		}
	});
};
module.exports = ToDosController;