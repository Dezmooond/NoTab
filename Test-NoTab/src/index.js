document.querySelector('.feedback-form button').addEventListener('click', function(event) {
	event.preventDefault();
 
	const formElements = document.querySelectorAll('.feedback-form input, .feedback-form textarea');
	formElements.forEach(function(element) {
	  if (!element.value) {
		 element.classList.add('error');
	  } else {
		 element.classList.remove('error');
	  }
	});
 });

 const cookieNotice = document.querySelector('.cookie-notice');
 const cookieNoticeBtn = document.querySelector('.cookie-notice-btn');
 
 setTimeout(function() {
	cookieNotice.style.display = 'flex';
 }, 1000);
 
 cookieNoticeBtn.addEventListener('click', function() {
	cookieNotice.style.display = 'none';
 });