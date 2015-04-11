$(document).ready(function () {
	console.log('time to validate');
	$('#todoForm').validate({
		rules:{
			todo_priority: {
				required: true,
				rangelength: [3,12]
			},
			todo_title: {
				required: true,
				minlength: 5,
				maxlength: 32,
			},
			todo_due_date:{
				required: true,
				dateISO: true,
			},
			todo_discription:{
				required: true,
				minlength: 1,
				maxlength: 200,
			}
		}
	});
});