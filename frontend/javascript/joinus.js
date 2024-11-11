document.addEventListener("DOMContentLoaded", function() {
    const togglePassword = document.querySelector("#togglePassword");
    const passwordInput = document.querySelector("#password");
    const joinForm = document.querySelector("#joinForm");

    // Toggle password visibility
    togglePassword.addEventListener("click", function() {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");
    });

    // Handle form submission
    joinForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.querySelector("#name").value;
        const contact = document.querySelector("#contact").value;
        const email = document.querySelector("#email").value;
        const category = document.querySelector("#category").value;
        const location = document.querySelector("#location").value; // New field
        const experience = document.querySelector("#experience").value; // New field
        const about = document.querySelector("#about").value;
        const imageInput = document.querySelector("#image").files[0];

        // Validate contact number
        if (!/^\d{10}$/.test(contact)) {
            alert("Please enter a valid 10-digit contact number.");
            return;
        }

        // Validate password length
        if (passwordInput.value.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        // Convert image file to Base64
        const reader = new FileReader();
        reader.onloadend = function() {
            const newManager = {
                name,
                contact,
                email,
                category,
                location, // Add location to the manager object
                experience, // Add experience to the manager object
                about,
                image: reader.result // Store the Base64 image string
            };

            // Save to local storage
            let managers = JSON.parse(localStorage.getItem("eventManagers")) || [];
            managers.push(newManager);
            localStorage.setItem("eventManagers", JSON.stringify(managers));

            // Show success alert after submission
            alert("Thank you for joining us! Your details have been submitted.");
            joinForm.reset(); // Reset the form after submission
        };

        if (imageInput) {
            reader.readAsDataURL(imageInput); // Read the uploaded image file
        } else {
            alert("Please upload an image.");
        }
    });

    // Display event managers based on category in the URL
    const currentUrl = window.location.href;
    const category = currentUrl.split('/').pop().split('.')[0];
    const managers = JSON.parse(localStorage.getItem("eventManagers")) || [];

    const container = document.querySelector(".service-container");

    managers.forEach(manager => {
        if (manager.category === category) {
            const managerDiv = document.createElement("div");
            managerDiv.classList.add("manager");
            managerDiv.innerHTML = `
                <img src="${manager.image}" alt="Manager Image" class="manager-image">
                <h3>${manager.name}</h3>
                <p>Location: ${manager.location || "Not specified"}</p>
                <p>Experience: ${manager.experience || "Not specified"}</p>
                <p>Specialty: ${manager.about || "Not specified"}</p>
                <button class="book-now-button">Book Now</button>
            `;
            container.appendChild(managerDiv);
        }
    });
});
