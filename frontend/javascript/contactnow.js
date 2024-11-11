function submitContactForm() {
    const name = document.getElementById("name").value;
    const contact = document.getElementById("contact").value;
    const location = document.getElementById("location").value;
    const queries = document.getElementById("queries").value;

    if (!name || !contact || !location) {
        alert("Please fill in all required fields.");
        return;
    }

    // Simulate sending an email
    const emailSubject = `Contact Request from ${name}`;
    const emailBody = `
        Name: ${name}\n
        Contact Number: ${contact}\n
        Location: ${location}\n
        Additional Queries: ${queries || 'N/A'}
    `;

    // Simulate sending an SMS message
    const smsMessage = `Hello ${name}, thank you for reaching out. We will contact you soon!`;

    // Simulated "send" confirmation
    alert("Simulated Email Sent:\n" + emailBody);
    alert("Simulated SMS Sent:\n" + smsMessage);

    // Clear the form
    document.getElementById("contactForm").reset();
}
