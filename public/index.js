const form = document.querySelector('form');
function updateError(errorElement, errorMessage) {
    return (errorElement.textContent = errorMessage);
}
function validatePassword() {
    const password = (document.querySelector('#password')).value;
    const confirmPassword = (document.querySelector('#confirmpass')).value;
    if (!confirmPassword || !password)
        return '1pass';
    if (password === confirmPassword) {
        return true;
    }
    else {
        return false;
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
});
form.addEventListener('change', (e) => {
    const confirmPassEl = (document.querySelector('#confirmpass').nextElementSibling);
    const target = e.target;
    const inputType = target.id.replace('#', '');
    const inputValue = target.value;
    const errorDiv = target.nextElementSibling;
    const validity = target.validity;
    console.log(validatePassword());
    if (validity.valid)
        updateError(errorDiv, '');
    if (inputType === 'password' || inputType === 'confirmpass') {
        if (!validatePassword()) {
            updateError(confirmPassEl, '* Password does not match');
        }
    }
    if (validity.tooShort) {
        updateError(errorDiv, `* ${inputType} is too short! (${inputValue.length.toString()}/${target.getAttribute('minlength')})`);
    }
    if (validity.patternMismatch) {
        updateError(errorDiv, `* Invalid phone number. Example: 123-456-7890`);
    }
    if (validity.typeMismatch) {
        updateError(errorDiv, `* Invalid email address.`);
    }
});
