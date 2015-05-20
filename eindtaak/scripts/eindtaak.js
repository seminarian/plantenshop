$(function() {
	console.log("bestand geladen");

	//tabs activeren UI plugin
	$( "#inhoud" ).tabs({
  	active: 0
	});

	//directorySlider plugin options
  	$('#prent').directorySlider({
						directory : 'images/',	
						animation: 'fade',
						filebase: 'sardines',
						extension: 'jpg',
						numslides: 4,
						timeout: 3000
						  });


	var $retour = $('#retour');
	$retour.prop("checked",false);


	$retour.change(function(){
		if ($(this).is(':checked')) {
				$("#terugdatum").show();
				$("#terugdatum").prev("label").show();
		} else {
				$("#terugdatum").hide();
				$("#terugdatum").prev("label").hide();
				$("#terugdatum").val("");
		}
	})
	$('#terugdatum').hide();
	$("#terugdatum").prev("label").hide();



	// fill coutry dropdown list
	$('#countries').append("<option value=''>--- Kies land van vertrek ---</option>");
	
    $.getJSON("php/ajax_json_countries.php", function(data) {
        $.each(data, function() {
            $('#countries').append("<option value='" + this.country_code + "'>" + this.country_name + "</option>");
        });
    });

    // adapt airports list when country is selected
	$("#countries").change(function(){
		
		$('#airports').empty();
		console.log($(this).val());
		var waarde = $(this).val();
		
		$('#airports').append("<option value=''>--- Kies een airport ---</option>");
		
		$.getJSON("php/ajax_json_airports.php?country_code=" + waarde, function(data){
			
			$.each(data, function() {
            $('#airports').append("<option value='" + this.airport_code + "'>" + this.airport_name + "</option>");
			});		
		            
        }); //end getjson

	});	//end country change


		// date picker settings for vertrek
	$("#vertrekdatum").datepicker({
		dateFormat : "yy-mm-dd",
		minDate : -0,
		maxDate : +356,
		changeMonth : true,
		changeYear : true,		
		maxYear : +1
		
		});
	
	// date picker settings for retour	
	$("#terugdatum").datepicker({
		dateFormat : "yy-mm-dd",
		minDate :  +1,
		maxDate : +356,
		changeMonth : true,
		changeYear : true,	
		});

	$.datepicker.setDefaults($.datepicker.regional['nl-BE']);

	var $foutenBox = $('div#fouten')

	// min 1 volwassen of 1 kind selected (if babies min 1 volwassen selected)
	$.validator.addMethod("passagiers", function (value, element) {
        if (parseInt($("#kinderen").val()) + parseInt($("#volwassenen").val()) < 1) {
            return false;
        }
        else if (parseInt($("#babies").val()) > 0 && parseInt($("#volwassenen").val()) < 1) {
            return false;
        }
        else {
            return true;
        }
    });


	//validation rules and messages
	$("#frmVlucht").validate({

		debug : true,

        groups: {
            passagiers: "volwassenen kinderen babies"
        },


		rules : {
			
			countries : "required",
			airports  : "required",
            vertrekdatum: {
				         dateISO: true,
               			 required: true
            },
			terugdatum : {
				           
                		dateISO: true,
						required : "#retour:checked"
						
			},
			tickettype : "required",
			boekingreferentie  : {
							wwCheck : true
			},
			
			 volwassenen: {
                passagiers: true
            },
            kinderen: {
                passagiers: true
            },
			babies: {
                passagiers: true
            }		
				
							
		},
			
		messages:{
			
			countries 	: "land is verplicht",
			airports 	: "airports is verplicht",
			vertrekdatum :{
				         dateISO: "incorrect format",
               			 required: "vertrekdate verplicht"
           				 },
			terugdatum : { 
							           
                		dateISO: "format incorrect",
						required : "retour date required"
					
							},
			tickettype : "kies uw tickettype",
			boekingreferentie  : "",
			
			
			volwassenen: {
                passagiers: "minstens 1 volwassen of 1 kind en babies moeten vergezeld worden door minstens 1 volwassene"
            },
            kinderen: {
                passagiers: "minstens 1 volwassen of 1 kind en babies moeten vergezeld worden door minstens 1 volwassene"
            },
			babies: {
                passagiers: "minstens 1 volwassen of 1 kind en babies moeten vergezeld worden door minstens 1 volwassene"
            }
			
			
		},
		
		
		
		errorContainer: $foutenBox,
        errorLabelContainer: $("ul", $foutenBox),
		wrapper: "li",
		
		submitHandler:function(form){
			form.submit();
			}
			
		
		}); // end validate

		// regular expression for boekingreferentie
    $.validator.addMethod("wwCheck", function (value, element) {
        return value.match(/^([a-zA-Z0-9]+)$/);
    });

	var $checkinFoutBox = $('div#checkinFouten')
	$("#frmCheckin").validate({

		debug : true,
		rules : {
				boekingreferentie  : {
							wwCheck : true,
							minlength : 6,
							maxlength : 6
							},
							
				kredietkaartnummer : {
							required : true,
							creditcard : true
					}	,		
					
			   familienaam: {
            			    required: true
            	}
			},
		messages:{
			boekingreferentie  :"boekingreferentie is verplicht : min 6 Karakters (enkel letters en cijfers)",
            kredietkaartnummer: {
                required: "kredietkaartnummer is verplicht",
                creditcard: "kredietkaartnummer is not valid"
            	},
			 familienaam: {
                required: "familienaam is verplicht",
            }
		},

		
		errorContainer: $checkinFoutBox,
        errorLabelContainer: $("ul", $checkinFoutBox),
		wrapper: "li",
		
		submitHandler:function(form){
			form.submit();
			}
			
		
		}); // end validate

}) //einde doc load


