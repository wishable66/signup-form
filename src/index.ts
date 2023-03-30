const form = <HTMLFormElement>document.querySelector('form');

function updateError(errorElement: HTMLDivElement, errorMessage: string) {
  return (errorElement.textContent = errorMessage);
}

form.addEventListener('submit', (e) => e.preventDefault());

form.addEventListener('change', (e: Event) => {
  const target = <HTMLFormElement>e.target;
  const inputType = target.id.replace('#', '');
  const inputValue = target.value;
  const errorDiv = <HTMLDivElement>target.nextElementSibling;
  const validity = <ValidityState>target.validity;

  if (validity.valid) return updateError(errorDiv, '');

  if (validity.tooShort) {
    updateError(
      errorDiv,
      `* ${inputType} is too short! (${inputValue.length.toString()}/${target.getAttribute(
        'minlength'
      )})`
    );
  }
});
