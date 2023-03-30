const form = <HTMLFormElement>document.querySelector('form');

function updateError(errorElement: HTMLDivElement, errorMessage: string) {
  return (errorElement.textContent = errorMessage);
}

function validatePassword() {
  const password: string = (<HTMLInputElement>(
    document.querySelector('#password')
  )).value;
  const confirmPassword: string = (<HTMLInputElement>(
    document.querySelector('#confirmpass')
  )).value;

  if (!confirmPassword || !password) return '1pass';
  if (password === confirmPassword) {
    return true;
  } else {
    return false;
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
});

form.addEventListener('change', (e: Event) => {
  const confirmPassEl = <HTMLInputElement>(
    document.querySelector('#confirmpass').nextElementSibling
  );
  const target = <HTMLFormElement>e.target;
  const inputType = target.id.replace('#', '');
  const inputValue = target.value;
  const errorDiv = <HTMLDivElement>target.nextElementSibling;
  const validity = <ValidityState>target.validity;

  console.log(validatePassword());

  if (validity.valid) updateError(errorDiv, '');

  if (inputType === 'password' || inputType === 'confirmpass') {
    if (!validatePassword()) {
      updateError(confirmPassEl, '* Password does not match');
    }
  }

  if (validity.tooShort) {
    updateError(
      errorDiv,
      `* ${inputType} is too short! (${inputValue.length.toString()}/${target.getAttribute(
        'minlength'
      )})`
    );
  }

  if (validity.patternMismatch) {
    updateError(errorDiv, `* Invalid phone number. Example: 123-456-7890`);
  }

  if (validity.typeMismatch) {
    updateError(errorDiv, `* Invalid email address.`);
  }
});
