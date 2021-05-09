var main = function(toDoObjects) {
	"use strict";
	$(".tabs a span").toArray().forEach(function(element) {
		$(element).on("click", function() {
			var toDos = toDoObjects.map(function(toDo) {
				return toDo.description;
			});
			var $element = $(element);
			var $content;
			$(".tabs a span").removeClass("active");
			$element.addClass("active");
			$("main .content").empty();
			if ($element.parent().is(":nth-child(1)")) {
				$content = $("<ul>");
				toDos.forEach(function(todo) {
					$content.prepend($("<li>").text(todo));
				});
				$("main .content").append($content);
			} else if ($element.parent().is(":nth-child(2)")) {
				$content = $("<ul>");
				toDos.forEach(function(todo) {
					$content.append($("<li>").text(todo));
				});
				$("main .content").append($content);
			} else if ($element.parent().is(":nth-child(3)")) {
				var organizedByTag = organizeByTag(toDoObjects);
				organizedByTag.forEach(function(tag) {
					var $tagName = $("<h3>").text(tag.name), $content = $("<ul>");
					tag.toDos.forEach(function(description) {
						var $li = $("<li>").text(description);
						$content.append($li);
					});
					$("main .content").append($tagName);
					$("main .content").append($content);
				});
			} else if ($element.parent().is(":nth-child(4)")) {
				var input = function() {
					var $inputDescription = $(".content .description");
					var textDescription = $inputDescription.val();
					var $inputTag = $(".content .tag");
					var textTag = $inputTag.val().replace(/\s+/g, " ").trim().replace(/,\s/g, ",").split(",");
					if(textDescription !== "" && textTag !== "") {
						var newToDo = {"description" : textDescription, "tags" : textTag};
						toDoObjects.push(newToDo);
						$inputDescription.val("");
						$inputTag.val("");
						console.log(newToDo);
						toDos = toDoObjects.map(function(toDo) {
							return toDo.description;
						});
						$.post("todos", newToDo, function(responce) {
							console.log("Мы отправили данные и получили ответ сервера!");
							console.log(responce);
						});
					}
				}
				var $inputDescriptionLabel = $("<p>").text("Описание");
				var $inputDescription = $("<input>").addClass("description");
				var $inputTagDescription = $("<p>").text("Теги");
				var $inputTag = $("<input>").addClass("tag");
				var $button = $("<button>").text("+");
				$("main .content").append($inputDescriptionLabel, $inputDescription, $inputTagDescription, $inputTag, $button);
				$(".content button").on("click", function() {
					input();
				}); 
				$(".content input").on("keypress", function(event) {
					if(event.keyCode === 13) {
						input();
					}
				});
			}
			return false;
		});
	});
	$(".tabs a:first-child span").trigger("click");
}
function organizeByTag(toDoObjects) {
	var arrayTags = [];
	toDoObjects.forEach(function(toDo) {
		toDo.tags.forEach(function(tag) {
			if(arrayTags.indexOf(tag) === -1) arrayTags.push(tag);
		});
	});
	var organizeByTag = arrayTags.map(function(tag) {
		var toDosTags = [];
		toDoObjects.forEach(function(toDo) {
			if(toDo.tags.indexOf(tag) !== -1) toDosTags.push(toDo.description);
		});
		return {"name" : tag, "toDos" : toDosTags};
	});
	return organizeByTag;
}
$(document).ready(function() {
	$.getJSON("todos.json", function(toDoObjects) {
		main(toDoObjects);
	});
});