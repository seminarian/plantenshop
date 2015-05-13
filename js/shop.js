$(function() {
// 
	
	$("#slider-range-hoogte").slider({
		range: true,
		values: [100,2500],
		min: 0,
		max: 5000,
		step: 10,
		slide: function(event,ui) {
			$("hoogte_min").val($(this).slider("values",0));
			$("hoogte_max").val($(this).slider("values",1));
		},
		stop: function(event,ui) {
			$("hoogte_min").val($(this).slider("values", 0));
			$("hoogte_max").val($(this).slider("values", 1));
		}
	});

	//initialiseren van de startwaarden
	$("hoogte_min").val($("#slider-range-hoogte").slider("values", 0));
	$("hoogte_max").val($("#slider-range-hoogte").slider("values", 1));

	//toevoegen van een title text aan de slideknoppen
	$(".ui-slider-handle","#slider-range-hoogte").first().attr({'title':'Minimum hoogte'}).end().last().attr({'title':'Maximum hoogte'})

	var $advZoeken = $('#adv_zoeken');
	var $advZoekenLink = $('#adv_zoeken_link');


	// $advZoeken.hide();
	// $advZoeken.show();

	//lees localStorage
	var zoek = localStorage.getItem("advZoeken");
	// var setting = (zoek==0 && zoek!=1)?zoek:0;
	var setting = 1;

	//onmiddellijk toepassen
	toggleZoeken(setting,$advZoekenLink,$advZoeken);

	$advZoekenLink.click(function(e) {
		e.preventDefault();
		setting = 1 - setting; //bitwise Xor
		togglezoeken(setting,$(this),$advZoeken);
		localStorage.setItem("advZoeken",setting);
	})
	// $advZoekenLink.click(function(e){
	// 	e.preventDefault();
	// 	toggleZoeken($(this),$advZoeken)
	// })

}) //einde doc ready

function toggleZoeken($lienk, $el) {
	/*
	@$lienk de hyperlink
	@$el het element dat getoggled moet worden
	*/

	$el.toggle('slow', function() {
		tekst = ($el.css('display')=="none")?"geavanceerd zoeken":"eenvoudig zoeken";
		$lienk.text(tekst);
	})
}