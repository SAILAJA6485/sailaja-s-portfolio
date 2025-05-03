// Initialize EmailJS with your Public Key
emailjs.init("YkqA5o0k7qui-VIEW");

function sendEmail() {
    // Get form data
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const notification = document.getElementById("notification");
    const notificationMessage = document.getElementById("notification-message");

    // Email validation regex
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;

    // Validate form data
    if (fullName === '') {
        notificationMessage.textContent = 'Please enter your full name.';
        notification.classList.add("show", "error");
        return;
    }

    if (!emailRegex.test(email)) {
        notificationMessage.textContent = 'Please enter a valid email address.';
        notification.classList.add("show", "error");
        return;
    }

    if (message === '') {
        notificationMessage.textContent = 'Please enter your message.';
        notification.classList.add("show", "error");
        return;
    }

    // Get current time for the {{time}} parameter
    const currentTime = new Date().toLocaleString();

    // Prepare email parameters to match the template
    const templateParams = {
        name: fullName, // Maps to {{name}}
        time: currentTime, // Maps to {{time}}
        message: message, // Maps to {{message}}
        email: email // Maps to {{email}} for Reply To
    };

    // Send email using EmailJS
    emailjs.send("service_pgzkqqq", "template_mzb668b", templateParams)
        .then(function(response) {
            console.log("Email sent successfully!", response.status, response.text);
            // Show success notification
            notificationMessage.textContent = 'Message sent successfully!';
            notification.classList.add("show", "success");
            // Clear form
            document.getElementById("fullName").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
        }, function(error) {
            // Log the full error object
            console.error("Failed to send email:", JSON.stringify(error, null, 2));
            // Show detailed error notification
            notificationMessage.textContent = `Failed to send message: ${error.text || error.statusText || 'Bad request. Please check your EmailJS configuration.'}`;
            notification.classList.add("show", "error");
        });
}