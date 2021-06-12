var User = require("../models/user.js"),
ToDo = require("../models/todo.js"),
path = require("path"),
UsersController = {};
UsersController.index = function(req, res) {
	ToDo.find({}, function(err, result) {
		if(err !== null) {
			res.status(500).json(err);
		} else {
			res.status(200).json(result);
		}
	});
};
UsersController.show = function(req, res) {
	User.find({'username': req.params.username}, function(err, result) {
		if(err) {
			console.log(err);
			res.sendStatus(500);
		} else if(result.length !== 0) {
			res.sendFile(path.join(__dirname, "..", "/client/list.html"));
		} else {
		  res.sendStatus(404);
		}
	});
};
UsersController.create = function(req, res) {
	var username = req.body.username;
	User.find({"username" : username}, function(err, result) {
		if(err) {
			console.log(err);
			res.status(500).json(err);
		} else if(result.length === 0) {
			var newUser = new User({"username" : username});
			newUser.save(function(err, result) {
				if(err) {
					console.log(err);
					res.status(500).json(err);
				} else {
					res.status(200).json(result);
				}
			});
		} else {
			res.sendStatus(501);
		}
	});
};
UsersController.update = function(req, res) {
	var username = req.params.username;
	User.find({'username': username}, function(err, result) {
		if(err) {
			console.log(err);
			res.sendStatus(500)
		} else if(result.length !== 0) {
			User.find({'username': req.body.username}, function(err, result) {
				if(err) {
					console.log(err);
					res.sendStatus(500);
				} else if(result.length === 0) {
					var newUsername = {$set: {username: req.body.username}};
					User.updateOne({"username": username}, newUsername, function (err,user) {
						console.log(user);
						if (err !== null) {
							res.status(500).json(err);
						} else {
							if (user.n === 1 && user.nModified === 1 && user.ok === 1) {
								res.status(200).json(user);
							} else {
								res.status(404);
							}
						}
					});
				} else {
				  res.status(501).json({"message" : "Такой пользователь уже существует!"});
				}
			});
		} else {
			res.status(501).json({"message" : "Такой пользователь отсутствует!"});
		}
	});

};
UsersController.destroy = function (req, res) { 
	var username = req.params.username;
	User.find({"username": username}, function (err, result) {
		if (err) {
            res.status(500).send(err);
        } else if (result.length !== 0) {
        	ToDo.deleteMany({"owner": result[0]._id}, function (err, todo) {
				User.deleteOne({"username": username}, function (err, user) {
					if (err !== null) {
						res.status(500).json(err);
					} else {
						if (user.n === 1 && user.ok === 1 && user.deletedCount === 1) {
							res.status(200).json(user);
						} else {
							res.sendStatus(404);
						}
					}
				});
        	});
        } else {
            res.sendStatus(404);
        }
	});
}
module.exports = UsersController;