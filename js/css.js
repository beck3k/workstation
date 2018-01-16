function showModal(id) {
	var e = $("#" + id);
	e.fadeIn();
	e.children().css("top", "30%");
}
function hideModal(id){
	var e = $("#" + id);
	e.children().css("top", "0");
	e.fadeOut();
}
$(".modal").click(function(e) {
	var modal = $(e.target);
	if(!modal.hasClass("noclick")){
		hideModal(modal.attr('id'));
	}
});
$("a.modal-dismiss").click(function(e){
	var button = $(e.target);
	var modal = button.parents().find("div.modal");
	hideModal(modal.attr("id"));
});
$("a.btn").click(function(e){
	var button = $(this);
	var data = button.attr("data-target");
	if(data){
		showModal(data);
	}
});
