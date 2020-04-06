function slowScroll(id) {
	var offset = 0;
	$('html, body').animate({
		scrollTop: $(id).offset().top - offset
	}, 500);
	return false;
}
$(function () {                       //run when the DOM is ready
	$("#menu-icon").click(function () {  //use a class, since your ID gets mangled
		$(".navbar").toggleClass("expand");      //add the class to the clicked element
	});
});
// $(document).ready(function () {
// 	$('.menu-link').click(
// 		function () {
// 			$(this).addClass('active');
// 		}
// 	);
// });


