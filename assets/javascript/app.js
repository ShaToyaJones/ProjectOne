
//JavaScript and jQuery for Materialize to function.
$( document ).ready(function(){
		Materialize.updateTextFields();
	$(".button-collapse").sideNav();
	$('select').material_select();    
	$('#textarea1').val("");
	$('#textarea1').trigger('autoresize');
});