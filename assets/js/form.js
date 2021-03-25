$(document).ready(function() {

    /* ======= jQuery form validator ======= */ 
    /* Ref: http://jqueryvalidation.org/documentation/ */   
    $("#contact-form").validate({
		messages: {
		
		    name: {
    			required: 'Please enter your name' //You can customise this message
			},
			email: {
				required: 'Please enter your email' //You can customise this message
			},		
			message: {
				required: 'Please enter your message' //You can customise this message
			}
			
		}
		
	});
    

});


document.getElementById("send-now").addEventListener("click", function() {
  var cname =  document.getElementById("cname").value;
  var cemail = document.getElementById("cemail").value;
  var reason = document.getElementById("services").value;
  var cmessage = document.getElementById("cmessage").value;
  const url = 'http://127.0.0.1:5000/contact';
  var xhr = new XMLHttpRequest();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const event = new Date();

xhr.open("POST", url, true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.preventDefault()
xhr.send(JSON.stringify({ name: cname, from: cemail, reason: reason, time: event.toLocaleDateString(undefined, options), text: cmessage}));
});
