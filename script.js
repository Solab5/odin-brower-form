const form = document.getElementById('myForm');
const highFive = document.getElementById('highFive');

const validationRules = {
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMsg: "Please enter a valid email address"
    },
    country: {
        list: ["USA", "Canada", "UK", "Australia"], // Example list
        errorMsg: "Please enter a valid country"
    },
    zipCode: {
        regex: /^\d{5}(-\d{4})?$/,
        errorMsg: "Please enter a valid ZIP code"
    },
    password: {
        minLength: 8,
        errorMsg: "Password must be at least 8 characters long"
    },
    passwordConfirm: {
        matchField: "password",
        errorMsg: "Passwords do not match"
    }
};

function validateField(fieldName, value) {
    const rules = validationRules[fieldName];
    
    if (rules.regex) {
        return rules.regex.test(value);
    } else if (rules.list) {
        return rules.list.includes(value);
    } else if (rules.minLength) {
        return value.length >= rules.minLength;
    } else if (rules.matchField) {
        const matchValue = document.getElementById(rules.matchField).value;
        return value === matchValue;
    }
    
    return true;
}

function updateFieldStatus(field, isValid) {
    const errorElement = document.getElementById(`${field.id}-error`);
    
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('valid');
        errorElement.textContent = '';
    } else {
        field.classList.remove('valid');
        field.classList.add('error');
        errorElement.textContent = validationRules[field.name].errorMsg;
    }
}

form.addEventListener('input', (event) => {
    const field = event.target;
    const isValid = validateField(field.name, field.value);
    updateFieldStatus(field, isValid);
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    let isFormValid = true;
    
    for (const field of form.elements) {
        if (field.name && validationRules[field.name]) {
            const isValid = validateField(field.name, field.value);
            updateFieldStatus(field, isValid);
            isFormValid = isFormValid && isValid;
        }
    }
    
    if (isFormValid) {
        highFive.textContent = "High five! Form submitted successfully!";
        highFive.style.display = 'block';
        form.reset();
    } else {
        alert("Please correct the errors in the form before submitting.");
    }
});