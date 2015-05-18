// Javascript Document
//script voor verzorging pagina

$(function(){
	var $tabs = $('#verzorging');
	$('#toonZiektes').one('click',function(e) {
		e.preventDefault();
		var aantalTabs	= $('.ui-tabs-nav a').length;
		var tekst = "ziektes"
		var eInh = "<div id='" + tekst + "'>";
		var eLink = "<li><a href='#" + tekst + "'>" + tekst + "</a></li>";
		var $nieuweTabInhoud = $(eInh).load("inc/ziektes.html");
		$tabs.append($nieuweTabInhoud);	//inhoud toevoegen
		$tabs.find("ul").append(eLink)	//navgiatie item toevoegen
		$tabs.tabs("refresh");
		$tabs.tabs("option","active", aantalTabs);
		$(this).remove();

	})
	$('#verzorging').tabs({
		active: 1,
		disabled: [3]
	});

	$('#toonWaterplanten').change(function() {
		var wpI = $('.ui-tabs-nav a').index($('a[href=#waterplanten]'))
		if(this.checked) {
			$('#verzorging').tabs('enable',wpI).tabs("option", "active", wpI);
		} else {
			$('#verzorging').tabs("option","active", 0).tabs('disable',wpI)
		}
	})
})