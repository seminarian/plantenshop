$(function() {
	if (jQuery().validate) {
		console.log("validatie geladen")
	} else {
		console.log("validatie niet geladen")
	}


	$("#regForm").validate({
		rules:{
			vnaam: "required"
		},
		messages:{vnaam: "voornaam is verplicht"},
		submitHandler:function(form) {
			form.submit();
		}
	});
}) //einde doc ready