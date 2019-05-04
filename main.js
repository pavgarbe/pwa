// Service Worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  })
  .catch(function(error) {
    console.log('Service worker registration failed, error:', error);
  });
}


// Scroll Suavizado
$(document).ready(function function_name(argument) {
	// body...
	$("#menu a").click(function(e){
		e.preventDefault();

		

		$("html, body").animate({
			scrollTop: $($(this).attr('href')).offset().top 
		});

		return false;
	});
});