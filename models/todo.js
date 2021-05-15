var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
//Схема модели данных для задач
var ToDoSchema = mongoose.Schema({
	description : String,
	tags : [String],
	owner : {type : ObjectId, ref : "User"}
});
//Модель данных для задач
var ToDo = mongoose.model("ToDo", ToDoSchema);
module.exports = ToDo;