(function () {
    // Initialize EmailJS with your User ID
    // Go to EmailJS Dashboard > Account > API Keys, copy the Public Key
    emailjs.init("YkqA5o0k7qui-VIEW"); // Replace with your EmailJS User ID
})();

// Verify the form exists and attach the submit event listener
const form = document.getElementById("contact-form");
if (!form) {
    console.error("Form with ID 'contact-form' not found!");
} else {
    console.log("Form found, attaching submit event listener...");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const notification = document.getElementById("notification");
        if (!notification) {
            console.error("Notification div with ID 'notification' not found!");
            return;
        }

        // Show a processing message while the email is being sent
        notification.textContent = "Processing...";
        notification.className = "notification processing";
        notification.style.display = "block";

        const templateParams = {
            fullName: this.fullName.value,
            email: this.email.value,
            message: this.message.value,
            to_email: "pappalasailaja2022@gmail.com" // Ensure this matches your EmailJS template recipient
        };

        console.log("Sending email with params:", templateParams);

        // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with your actual EmailJS Service ID and Template ID
        // Service ID: EmailJS Dashboard > Email Services
        // Template ID: EmailJS Dashboard > Email Templates
        emailjs.send("service_pgzkqqq", "template_gb55zxb", templateParams)
            .then(
                function (response) {
                    console.log("SUCCESS! Status:", response.status, "Text:", response.text, "Full Response:", response);
                    notification.textContent = "Message sent successfully!";
                    notification.className = "notification success";
                    notification.style.display = "block";
                    setTimeout(() => {
                        notification.style.display = "none";
                    }, 3000);
                    this.reset(); // Clear the form on success
                },
                function (error) {
                    // Log the full error object for debugging
                    console.error("EmailJS Error:", error, "Status:", error.status, "Text:", error.text);
                    // If the email was sent (status 200 or similar), treat it as success
                    if (error.status === 200 || (error.text && error.text.includes("OK"))) {
                        console.log("Email sent but promise rejected, treating as success...");
                        notification.textContent = "Message sent successfully!";
                        notification.className = "notification success";
                        notification.style.display = "block";
                        setTimeout(() => {
                            notification.style.display = "none";
                        }, 3000);
                        this.reset(); // Clear the form on success
                    } else {
                        // True failure case
                        notification.textContent = `Failed to send message: ${error.text || "Unknown error"}`;
                        notification.className = "notification error";
                        notification.style.display = "block";
                        setTimeout(() => {
                            notification.style.display = "none";
                        }, 5000);
                    }
                }
            );
    });
}
