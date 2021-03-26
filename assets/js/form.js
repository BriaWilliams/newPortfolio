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


document.getElementById("send-now").addEventListener("click", function(event) {
  const SERVER_URL = 'https://email-controller.herokuapp.com/contact';
  const POST_METHOD = 'POST';
  const isAsync = true;
  event.preventDefault();
  var cname =  document.getElementById("cname").value;
  var cemail = document.getElementById("cemail").value;
  var reason = document.getElementById("services").value;
  var cmessage = document.getElementById("cmessage").value;
  var xhr = new XMLHttpRequest();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date();

xhr.open(POST_METHOD, SERVER_URL, isAsync);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onreadystatechange = function() {//Call a function when the state changes.
  var alert = document.getElementById("alert");
     if(xhr.readyState == 4 && xhr.status == 200) {
     // if(false){
      // show alert if success
      var message = JSON.parse(xhr.responseText).message;
      document.getElementById("paragraph").textContent = message;
      console.log("Class type", alert.classList);
      if(alert.classList.contains("alert-danger")) {
        alert.classList.remove("alert-danger")
        alert.classList.add("alert-success")
        console.log("SUCCESS;");
      }
      alert.style.display = "block";
      // clean form
      document.getElementById("cname").value='';
      document.getElementById("cemail").value='';
      document.getElementById("services").value='';
      document.getElementById("cmessage").value='';
    } else {
      alert.classList.remove("alert-success")
      alert.classList.add("alert-danger")
      var alert =  document.getElementById("alert");
      alert.style.display = "block";
      document.getElementById("paragraph").textContent = 'Some error occurred. Please try again.';
    }
}
xhr.send(JSON.stringify({ name: cname, from: cemail, reason: reason, time: date.toLocaleDateString(undefined, options), text: cmessage}));
});
