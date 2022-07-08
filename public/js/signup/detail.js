import {
  showElement,
  hideElement,
  removeInputValue,
  verifyInputValue,
  setAutoDot,
  toggleRemoveButton,
} from '../util.js';

import { validateBirth, validateEmail, validatePassword } from '../validate.js';

const $signupForm = document.querySelector('.signup-detail-form');
const $emailGroup = document.querySelector('.input-group.email');
const $emailInput = document.querySelector('.input-group.email .input');
const $emailError = document.querySelector('.input-group.email p.error-message');
const $emailRemoveButton = document.querySelector('.input-remover');
const $emailDuplicateButton = document.querySelector('.singup-email-duplicate-button');

const $nicknameInput = document.querySelector('.input-group.nickname .input');
const $nicknameError = document.querySelector('.input-group.nickname p.error-message');

const $passwordInput = document.querySelector('.input-group.password .input');
const $passwordError = document.querySelector('.input-group.password p.error-message');

const $birthInput = document.querySelector('.input-group.birth .input');
const $birthError = document.querySelector('.input-group.birth p.error-message');

const $nextButton = document.querySelector('#signup-detail-next-page');

const verifyAllRequiredInputs = () => {
  const inputCount = document.querySelectorAll('.input').length;
  const verifiedInputCount = document.querySelectorAll('.input.verified').length;
  return inputCount === verifiedInputCount;
};

const activateNextButton = () => {
  $nextButton.classList.add('verified');
};

const deactivateNextButton = () => {
  $nextButton.classList.remove('verified');
};

const checkForm = () => {
  if (!verifyAllRequiredInputs()) deactivateNextButton();
  else activateNextButton();
};

const clickEmailDuplicateButton = () => {
  const emailValue = $emailInput.value;

  verifyInputValue($emailInput, validateEmail(emailValue));

  if (validateEmail(emailValue)) {
    $emailGroup.classList.add('verified');
    $emailInput.disabled = true;
    hideElement($emailRemoveButton);
  } else {
    showElement($emailError);
  }
};

const changeEmailInput = (e) => {
  const { value } = e.target;

  toggleRemoveButton($emailRemoveButton, !!value);

  if (!$emailError.classList.contains('hide')) hideElement($emailError);
};

const changeNicknameInput = (e) => {
  const { value } = e.target;

  verifyInputValue($nicknameInput, !!value);

  if (!value) showElement($nicknameError);
  else hideElement($nicknameError);
};

const changePasswordInput = (e) => {
  const { value } = e.target;

  verifyInputValue($passwordInput, validatePassword(value));

  if (!validatePassword(value)) showElement($passwordError);
  else hideElement($passwordError);
};

const clickEmailRemoveButton = () => {
  removeInputValue($emailInput, $emailRemoveButton);
};

const changeBirthInput = (e) => {
  const { value } = e.target;

  setAutoDot($birthInput, value);

  verifyInputValue($birthInput, validateBirth($birthInput.value));

  if (!validateBirth($birthInput.value)) showElement($birthError);
  else hideElement($birthError);
};

const clickNextButton = () => {
  if (!$nextButton.classList.contains('verified')) return;

  $emailInput.disabled = false;
  $signupForm.submit();
};

const changeForm = () => {
  checkForm();
};

$emailInput.addEventListener('input', changeEmailInput);
$emailDuplicateButton.addEventListener('click', clickEmailDuplicateButton);
$emailRemoveButton.addEventListener('click', clickEmailRemoveButton);
$nicknameInput.addEventListener('input', changeNicknameInput);
$passwordInput.addEventListener('input', changePasswordInput);
$birthInput.addEventListener('input', changeBirthInput);
$nextButton.addEventListener('click', clickNextButton);
$signupForm.addEventListener('input', changeForm);
