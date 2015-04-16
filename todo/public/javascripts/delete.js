$(document).ready(function(){
	$(".deleteButton").click(function(){
		var thisId=$(this)[0].id;
		console.log(this.id);

		$.ajax({
			url: "/todo",
			method: "DELETE",
			data:{
			todo_id: thisId
			}
		},
		success: function (response){
			//resfresh the page(google can tell you how)
			$("todo_id"+todoItemid).remove();

			// remove the DOM element(you've done this before)
		});
	});
});