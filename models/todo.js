mongoose = require("mongoose");
//Схема модели данных для задач
var ToDoSchema = mongoose.Schema({
	"description" : String,
	"tags" : [String]
});
//Модель данных для задач
var ToDo = mongoose.model("ToDo", ToDoSchema);
module.exports = ToDo;