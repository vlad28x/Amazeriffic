var main = function() {
	"use strict";
	var toDos = [
		"Закончить писать эту книгу",
		"Вывести Грейси на прогулку в парк",
		"Ответить на электронные письма",
		"Подготовиться к лекции в понедельник",
		"Обновить несколько новых задач",
		"Купить продукты"
	];
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
				$("main .content").append($("<input>")).append($("<button>").text("+"));
				$(".content button").on("click", function() {
					var $input = $(".content input");
					if($input.val() !== "") {
						toDos.push($input.val());
						$input.val("");
					}
				}); 
			}
			return false;
		});
	});
	$(".tabs a:first-child span").trigger("click");
}
$(document).ready(main);