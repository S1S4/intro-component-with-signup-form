const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

const form = document.querySelector('#form');


// The following isRequired() function returns true if the input argument is empty
const isRequired = value => value === '' ? false : true;

// The following isBetween() function returns false if the length argument is not between the min and max argument:
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

// The following showError() function highlights the border of the input field and displays an error message if the input field is invalid
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}

const checkFirstName = () => {

    let valid = false;
    const fN = firstName.value.trim();

    if (!isRequired(fN)) {
        showError(firstName, 'First Name cannot be empty.');
    } else {
        showSuccess(firstName);
        valid = true;
    }
    return valid;
}

const checkLastName = () => {

    let valid = false;
    const lN = lastName.value.trim();

    if (!isRequired(lN)) {
        showError(lastName, 'Last Name cannot be empty.');
    } else {
        showSuccess(lastName);
        valid = true;
    }
    return valid;
}

const checkEmail = () => {
    let valid = false;
    const em = email.value.trim();

    if (!isRequired(em)) {
        showError(email, 'Email cannot be empty.');
        email.placeholder = "email@example/com";
    } else if (!isEmailValid(em)) {
        showError(email, 'Looks like this is not an email.')
    } else {
        showSuccess(email);
        valid = true;
    }
    return valid;
}

const checkPassword = () => {
    let valid = false;
    const pWrd = password.value.trim();

    if (!isRequired(pWrd)) {
        showError(password, 'Password cannot be empty.');
    } else if (!isPasswordSecure(pWrd)) {
        showError(password, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(password);
        valid = true;
    }

    return valid;
};

form.addEventListener('submit' ,function (event) {
    event.preventDefault();

    // validate forms
    let isFirstNameValid = checkFirstName(),
        isLastNameValid = checkLastName(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword();

    let isFormValid = isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {

    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'first-name':
            checkFirstName();
            break;        
        case 'last-name':
            checkLastName();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
    }
}));