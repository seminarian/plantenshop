$(function() {
	if (jQuery().validate) {
		console.log("validatie geladen")
	} else {
		console.log("validatie niet geladen")
	}


	//alle dialoogvensters: instellingen
	$(".dialoogvensters").dialog({
		autoOpen:false,
		buttons: {
			"OK":function() {
				$(this).dialog("close");
			}
		},
		modal:true,
		width: 600
	})


	// de dialoog Button
	$('#dialog_link_username')
		.button({icons: {secondary: "ui-icon-help"}})
		.click(function(e){
			e.preventDefault();
			$('#dialog_username').dialog('open');
		});




	$('#promos').click(function(){
		if ($(this).is(':checked')) {
			$('#email').removeAttr('disabled')[0].focus();
		} else {
			$('#email').attr('disabled',true).val("");
		}
	})
	$("#geboren").datepicker({
		dateFormat: "yy-mm-dd",
		yearRange: '-80:+00',
		changeMonth: true,
		changeYear: true
	});

	$.validator.addMethod("wwCheck", function(value, elementt) {
		return value.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/);
	});

	var $foutBoksen = $('div.foutBox');

	// $("#regForm").submit(function(e) {e.preventDefault() })
	$("#regForm").validate({
		debug:true,
		rules:{
			email: {
				required: "#promos:checked",
				email:true
			},
			username : {
				required:true,
				minlength:8
			},
			ww1: {
				wwCheck:true
			},
			ww2: {
				equalTo: "#ww1"
			},
			vnaam: "required",
			postnr: {
				required:true,
				digits:true,
				minlength:4,
				maxlength: 4
			},
			geboren: {
				required:true,
				dateISO: true
			},
			sexe:"required",
			"soort_id[]":{
				required:true,
				rangelength:[1,4]
			}
		},
		messages:{vnaam: "voornaam is verplicht", postnr: 
		{
			required: "de postcode is verplicht",
			digits: "een postcode bestaat enkel uit getallen",
			minlength: "een postcodenummer bestaat uit exact 4 getallen",
			maxlength: "een postcodenummer bestaat uit exact 4 getallen"
		},
			geboren: {
				required: "Geef uw geboortedatum in, aub",
				dateISO: "de datum moet het formaat YYYY-MM-DD hebben"
			},
			sexe:"kies uw geslacht",
			"soort_id[]":"kies minstens een soort maar niet meer dan 4",
			username:"uw gebruikersnaam is verplicht en moet minimum 8 karakters hebben",
			ww1:"het wachtwoord moet min 8 karakters lang zijn en moet minstens een kleine letter, 1 hoofdletter, 1 getal en 1 speciaal karakter bevatten",
			ww2:"Wachtwoord niet identiek",
			email: {
				required: "Een emailadres is nodig om u te kunnen contacteren",
				email: "het emailadres is ongeldig"
			}
	},
		errorContainer: $foutBoksen,
		errorLabelContainer:$("ul",$foutBoksen),
		wrapper: "li",
		submitHandler:function(form) {
			form.submit();
		}
	})
}) //einde doc ready