var main = function() {
	"use strict";
	var makeTabActive = function(tabNumber) {
		var tabSelector = ".tabs a:nth-child(" + tabNumber + ") span";
		$(".tabs span").removeClass("active");
		$(tabSelector).addClass("active");
	};
	$(".tabs a:nth-child(1)").on("click", function(event) {
		makeTabActive(1);
		$("main .content").empty();
		return false;
	});
	$(".tabs a:nth-child(2)").on("click", function(event) {
		makeTabActive(2);
		$("main .content").empty();
		return false;
	});
	$(".tabs a:nth-child(3)").on("click", function(event) {
		makeTabActive(3);
		$("main .content").empty();
		return false;
	});
}
$(document).ready(main);