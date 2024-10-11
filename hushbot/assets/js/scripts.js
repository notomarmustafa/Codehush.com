// Add any JavaScript functionality you need here
document.addEventListener("DOMContentLoaded", function () {
    // Example: Handle form submission
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Thank you for your message!");
            form.reset();
        });
    }
});
