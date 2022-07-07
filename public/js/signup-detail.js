import { PASSWORD_MIN_LENGTH } from './constant.js';

const init = () => {
  const $signupForm = document.querySelector('.singup-detail-form');
  const $emailGroup = document.querySelector('.singup-detail-group.email');
  const $emailInput = document.querySelector('.singup-detail-group.email .signup-input');
  const $emailError = document.querySelector('.singup-detail-group.email p.error-message');
  const $emailRemoveButton = document.querySelector('.signup-detail-input-remover');
  const $emailDuplicateButton = document.querySelector('.singup-email-duplicate-button');

  const $nicknameInput = document.querySelector('.singup-detail-group.nickname .signup-input');
  const $nicknameError = document.querySelector('.singup-detail-group.nickname p.error-message');

  const $passwordInput = document.querySelector('.singup-detail-group.password .signup-input');
  const $passwordError = document.querySelector('.singup-detail-group.password p.error-message');

  const $birthInput = document.querySelector('.singup-detail-group.birth .signup-input');
  const $birthError = document.querySelector('.singup-detail-group.birth p.error-message');

  const $nextButton = document.querySelector('#signup-detail-next-page');

  const removeInputValue = ($input, $removeButton) => {
    $input.value = '';
    $removeButton.classList.add('hide');
  };

  const showErrorMessage = ($target) => {
    $target.classList.remove('hide');
  };

  const hideErrorMessage = ($target) => {
    $target.classList.add('hide');
  };

  const verifyInputValue = ($target, isValid) => {
    if (isValid) $target.classList.add('verified');
    else $target.classList.remove('verified');
  };

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

  const setAutoDot = ($target, value) => {
    $target.value = value.replace(/[^0-9]/g, '').replace(/^(\d{4})(\d{2})(\d{2})$/, `$1.$2.$3`);
  };

  const verifyAllRequiredInputs = () => {
    const inputCount = document.querySelectorAll('.signup-input').length;
    const verifiedInputCount = document.querySelectorAll('.signup-input.verified').length;
    return inputCount === verifiedInputCount;
  };

  const activeNextButton = () => {
    $nextButton.classList.add('verified');
  };

  const checkForm = () => {
    if (!verifyAllRequiredInputs()) return;

    activeNextButton();
  };

  const clickEmailDuplicateButton = () => {
    const emailValue = $emailInput.value;

    verifyInputValue($emailInput, validateEmail(emailValue));

    if (validateEmail(emailValue)) {
      $emailGroup.classList.add('verified');
      $emailInput.disabled = true;
      $emailRemoveButton.classList.add('hide');
    } else {
      showErrorMessage($emailError);
    }
  };

  const changeEmailInput = (e) => {
    const { value } = e.target;

    if (value) $emailRemoveButton.classList.remove('hide');
    else $emailRemoveButton.classList.add('hide');

    if (!$emailError.classList.contains('hide')) hideErrorMessage($emailError);
  };

  const changeNicknameInput = (e) => {
    const { value } = e.target;

    verifyInputValue($nicknameInput, !!value);

    if (!value) showErrorMessage($nicknameError);
    else hideErrorMessage($nicknameError);

    checkForm();
  };

  const changePasswordInput = (e) => {
    const { value } = e.target;

    verifyInputValue($passwordInput, validatePassword(value));

    if (!validatePassword(value)) showErrorMessage($passwordError);
    else hideErrorMessage($passwordError);

    checkForm();
  };

  const clickEmailRemoveButton = () => {
    removeInputValue($emailInput, $emailRemoveButton);
  };

  const changeBirthInput = (e) => {
    const { value } = e.target;

    setAutoDot($birthInput, value);

    verifyInputValue($birthInput, validateBirth($birthInput.value));

    if (!validateBirth($birthInput.value)) showErrorMessage($birthError);
    else hideErrorMessage($birthError);

    checkForm();
  };

  const clickNextButton = () => {
    if (!$nextButton.classList.contains('verified')) return;

    $emailInput.disabled = false;
    $signupForm.submit();
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  $emailInput.addEventListener('input', changeEmailInput);
  $emailDuplicateButton.addEventListener('click', clickEmailDuplicateButton);
  $emailRemoveButton.addEventListener('click', clickEmailRemoveButton);
  $nicknameInput.addEventListener('input', changeNicknameInput);
  $passwordInput.addEventListener('input', changePasswordInput);
  $birthInput.addEventListener('input', changeBirthInput);
  $nextButton.addEventListener('click', clickNextButton);
  $signupForm.addEventListener('submit', submitForm);
};

init();
