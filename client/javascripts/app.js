var main = function() {
	"use strict";
	var tabs = [];
	tabs.push({
		"name" : "Новые",
		"content" : function(callback) {
			$.getJSON("todos.json", function(toDoObjects) {
				var toDos = toDoObjects.map(function(toDo) {
					return toDo.description;
				});
				var $content = $("<ul>");
				toDos.forEach(function(todo) {
					$content.prepend($("<li>").text(todo));
				});
				callback(null, $content);
			}).fail(function(jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});
	tabs.push({
		"name" : "Старые",
		"content" : function(callback) {
			$.getJSON("todos.json", function(toDoObjects) {
				var toDos = toDoObjects.map(function(toDo) {
					return toDo.description;
				});
				var $content = $("<ul>");
				toDos.forEach(function(todo) {
					$content.append($("<li>").text(todo));
				});
				callback(null, $content);
			}).fail(function(jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});
	tabs.push({
		"name" : "Теги",
		"content" : function(callback) {
			$.getJSON("todos.json", function(toDoObjects) {
				var $content = $("<div>");
				var organizedByTag = organizeByTag(toDoObjects);
				organizedByTag.forEach(function(tag) {
					var $tagName = $("<h3>").text(tag.name);
					var $contentTag = $("<ul>");
					tag.toDos.forEach(function(description) {
						var $li = $("<li>").text(description);
						$contentTag.append($li);
					});
					$content.append($tagName);
					$content.append($contentTag);
				});
				callback(null, $content);
			}).fail(function(jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});
	tabs.push({
		"name" : "Добавить",
		"content" : function(callback) {
			$.getJSON("todos.json", function(toDoObjects) {
				var input = function() {
					var textDescription = $inputDescription.val();
					var textTag = $inputTag.val().replace(/\s+/g, " ").trim().replace(/,\s/g, ",").split(",");
					if(textDescription !== "" && textTag[0] !== "") {
						var newToDo = {"description" : textDescription, "tags" : textTag};
						toDoObjects.push(newToDo);
						$inputDescription.val("");
						$inputTag.val("");
						console.log(newToDo);
						$.post("todos", newToDo, function(responce) {
							console.log("Мы отправили данные и получили ответ сервера!");
							console.log(responce);
							$(".tabs a:first-child span").trigger("click");
						});
					}
				}
				var $content = $("<div>");
				var $inputDescriptionLabel = $("<p>").text("Описание");
				var $inputDescription = $("<input>").addClass("description");
				var $inputTagDescription = $("<p>").text("Теги");
				var $inputTag = $("<input>").addClass("tag");
				var $button = $("<button>").text("+");
				$button.on("click", function() {
					input();
				});
				$content.append($inputDescriptionLabel, $inputDescription, $inputTagDescription, $inputTag, $button);
				callback(null, $content);
			}).fail(function(jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});
	tabs.forEach(function(tab) {
		var $aElement = $("<a>").attr("href", ""),
		$spanElement = $("<span>").text(tab.name);
		$aElement.append($spanElement);
		$(".tabs").append($aElement);
		$spanElement.on("click", function() {
			$(".tabs a span").removeClass("active");
			$spanElement.addClass("active");
			$("main .content").empty();
			tab.content(function(err, $content) {
				if(err !== null) {
					alert("Возникла проблема при обработке запроса: " + err);
				} else {
					$("main .content").append($content);
				}
			});
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
	main();
});