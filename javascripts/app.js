var main = function() {
	"use strict";
	for(var tabNumber = 1; tabNumber < 4; ++tabNumber) {
		var tabSelector = ".tabs a:nth-child(" + tabNumber + ") span";
		$(tabSelector).on("click", function() {
			$(".tabs span").removeClass("active");
			$(this).addClass("active");
			$("main .content").empty();
			return false;
		});
	}
}
$(document).ready(main);