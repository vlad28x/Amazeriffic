var main = function(toDoObjects) {
	"use strict";
	var toDos = toDoObjects.map(function(toDo) {
		return toDo.description;
	});
	$(".tabs a span").toArray().forEach(function(element) {
		$(element).on("click", function() {
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
				//Теги
			} else if ($element.parent().is(":nth-child(4)")) {
				$("main .content").append($("<input>")).append($("<button>").text("+"));
				$(".content button").on("click", function() {
					var $input = $(".content input");
					if($input.val() !== "") {
						toDos.push($input.val());
						$input.val("");
					}
				}); 
				$(".content input").on("keypress", function(event) {
					if(event.keyCode === 13 && $(".content input").val() !== "") {
						toDos.push($(".content input").val());
						$(".content input").val("");
					}
				});
			}
			return false;
		});
	});
	$(".tabs a:first-child span").trigger("click");
}
$(document).ready(function() {
	$.getJSON("todos.json", function(toDoObjects) {
		main(toDoObjects);
	});
});