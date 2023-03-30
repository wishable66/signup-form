const form = document.querySelector('form');
function updateError(errorElement, errorMessage) {
    return (errorElement.textContent = errorMessage);
}
form.addEventListener('submit', (e) => e.preventDefault());
form.addEventListener('change', (e) => {
    const target = e.target;
    const inputType = target.id.replace('#', '');
    const inputValue = target.value;
    const errorDiv = target.nextElementSibling;
    const validity = target.validity;
    if (validity.valid)
        return updateError(errorDiv, '');
    if (validity.tooShort) {
        updateError(errorDiv, `* ${inputType} is too short! (${inputValue.length.toString()}/${target.getAttribute('minlength')})`);
    }
});
