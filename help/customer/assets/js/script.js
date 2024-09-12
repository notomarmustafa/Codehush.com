// mailing
function SendMail() {
  var params = {
    from_name: document.getElementById("name").value,
    email_id: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };
  emailjs
    .send("service_djh0lws", "template_k8jpgif", params)
    .then(function (res) {
      alert("Message Sent Successfully!" + res.status);
    });
}
