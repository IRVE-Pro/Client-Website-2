// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form validation and submission
const contactForm = document.getElementById('contact-form');
const formGroups = document.querySelectorAll('.form-group');

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

const validatePhone = (phone) => {
    return String(phone)
        .match(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/);
};

const showError = (input, message) => {
    const formGroup = input.parentElement;
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;

    // Remove any existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        formGroup.removeChild(existingError);
    }

    formGroup.appendChild(errorDiv);
    input.style.borderColor = '#ef4444';
};

const removeError = (input) => {
    const formGroup = input.parentElement;
    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        formGroup.removeChild(errorDiv);
    }
    input.style.borderColor = '#e5e7eb';
};

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    // Clear all previous error messages
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (input) {
            removeError(input);
        }
    });

    // Validate name
    const nameInput = document.getElementById('name');
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Le nom est requis');
        isValid = false;
    }

    // Validate email
    const emailInput = document.getElementById('email');
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Veuillez entrer une adresse email valide');
        isValid = false;
    }

    // Validate phone
    const phoneInput = document.getElementById('phone');
    if (!validatePhone(phoneInput.value)) {
        showError(phoneInput, 'Veuillez entrer un numéro de téléphone français valide');
        isValid = false;
    }

    // Validate message
    const messageInput = document.getElementById('message');
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Le message est requis');
        isValid = false;
    }

    if (isValid) {
        // Here you would typically send the form data to your server
        // For demonstration, we'll just show a success message
        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            message: messageInput.value
        };

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.backgroundColor = '#10b981';
        successMessage.style.color = 'white';
        successMessage.style.padding = '1rem';
        successMessage.style.borderRadius = '0.375rem';
        successMessage.style.marginTop = '1rem';
        successMessage.textContent = 'Votre message a été envoyé avec succès !';

        contactForm.appendChild(successMessage);
        contactForm.reset();

        // Remove success message after 5 seconds
        setTimeout(() => {
            contactForm.removeChild(successMessage);
        }, 5000);
    }
});

// Remove error messages on input
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    if (input) {
        input.addEventListener('input', () => {
            removeError(input);
        });
    }
});
