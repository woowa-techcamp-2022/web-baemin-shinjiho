import { PASSWORD_MIN_LENGTH } from './constant.js';

import {
  showElement,
  hideElement,
  removeInputValue,
  verifyInputValue,
  setAutoDot,
  toggleRemoveButton,
} from './util.js';

const init = () => {
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

  const validateEmail = (value) => {
    const emailRegExp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailRegExp.test(value);
  };

  const validatePassword = (value) => {
    if (value.length < PASSWORD_MIN_LENGTH) return false;

    let regCheckCount = 0;

    const engUpperCaseRegExp = /[A-Z]/g;
    const engLowerCaseRegExp = /[a-z]/g;
    const numberRegExp = /[0-9]/g;
    const specialRegExp = /[`~!@#$%^&*|\\\'\";:\/?]/g;

    if (engUpperCaseRegExp.test(value)) regCheckCount += 1;
    if (engLowerCaseRegExp.test(value)) regCheckCount += 1;
    if (numberRegExp.test(value)) regCheckCount += 1;
    if (specialRegExp.test(value)) regCheckCount += 1;

    if (regCheckCount < 2) return false;

    const sameNumberRegExp = /([0-9])\1\1/g;
    const continuousNumberRegExp = /012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210/g;

    if (sameNumberRegExp.test(value) || continuousNumberRegExp.test(value)) return false;

    return true;
  };

  const validateBirth = (value) => {
    const birthRegExp = /^(19[0-9][0-9]|20\d{2}).(0[0-9]|1[0-2]).(0[1-9]|[1-2][0-9]|3[0-1])$/;

    return birthRegExp.test(value);
  };

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
};

init();
