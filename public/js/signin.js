import { showElement, hideElement } from './util.js';

const $inputId = document.getElementById('signin-input-id');
const $inputPassword = document.getElementById('signin-input-password');
const $signinForm = document.getElementById('signin-form');
const $idError = document.getElementById('signin-id-error');
const $passwordError = document.getElementById('signin-password-error');

const submitLogin = (e) => {
  const idValue = $inputId.value;
  const passwordValue = $inputPassword.value;

  if (!idValue) {
    e.preventDefault();
    showElement($idError);
    return;
  }
  if (!passwordValue) {
    e.preventDefault();
    showElement($passwordError);
    return;
  }
};

const changeInputId = () => {
  const idValue = $inputId.value;

  if (idValue) {
    hideElement($idError);
  }
};

const changeInputPassword = () => {
  const passwordValue = $inputPassword.value;

  if (passwordValue) {
    hideElement($passwordError);
  }
};

$inputId.addEventListener('input', changeInputId);
$inputPassword.addEventListener('input', changeInputPassword);
$signinForm.addEventListener('submit', submitLogin);
