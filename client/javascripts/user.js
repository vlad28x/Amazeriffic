var main = function() {
	"use strict";
	var $input = $("<input>"),
	$buttonCreate = $("<button>").text("Создать аккаунт"),
	$buttonLogin = $("<button>").text("Войти в аккаунт"),
	$buttonTrial = $("<button>").text("Попробовать"),
	$buttonEdit = $("<button>").text("Изменить пользователя"),
	$buttonDelete = $("<button>").text("Удалить пользователя");

	$buttonCreate.on("click", function() {
		var username = $input.val().trim().toLowerCase();
		if(username !== "") {
			var newUser = {"username" : username};
			$.post("/user", newUser, function(responce) {	
			}).done(function(responce) {
			}).fail(function(error) {
				if (error.status === 501) {
					alert("Такой пользователь уже существует!");
				} else {			
					alert("Ошибка!\n" + error.status + " " + error.statusText);	
				}
			});
		}
	});

	$buttonLogin.on("click", function() {
		var username = $input.val().trim().toLowerCase();
		if (username !== "") {
			$.get("/user/" + username, function(responce) {
			}).done(function(responce) {
				window.location.replace('user/' + username + '/');
			}).fail(function(error) {
				console.log(error);
				alert("Произошла ошибка!\n" + error.status + " " + "Такой пользователь отсутсвует!");	
			});
		}
	});

	$buttonTrial.on("click", function() {
		window.location.replace('/list.html');
	});

	$buttonEdit.on("click", function() {
		var username = $input.val().trim().toLowerCase();
		if (username !== "") {
			var newUsername = prompt("Введите новое имя пользователя").trim().toLowerCase();
			if (newUsername !== "") {
				$.ajax({
					'url': '/user/'+ username,
					'type': 'PUT',
					'data': { 'username': newUsername }
				}).done(function(response) {
					$input.val(newUsername);
					alert('Имя пользователя успешно изменено');
				}).fail(function(error) {
					alert("Произошла ошибка!\n" + error.status + " " + "Такой пользователь уже существует!");	
				});
			}
		}
	});

	$buttonDelete.on("click", function() {
		var username = $input.val().trim().toLowerCase();
		if (username !== "") {
			if (confirm("Вы уверены, что хотете удалить пользователя " + username + "?")) {
				$.ajax({
					'url': '/user/'+ username,
					'type': 'DELETE',
				}).done(function(response) {
					$input.val("");
					alert('Пользователь успешно удален');
				}).fail(function(error) {
					alert("Произошла ошибка!\n" + error.status + " " + "Такой пользователь отсутсвует!");	
				});
			}
		}
	});

	$(".login").append($input, $buttonCreate, $buttonLogin, $buttonTrial, $buttonEdit, $buttonDelete);
};
$(document).ready(function() {
	main();
});