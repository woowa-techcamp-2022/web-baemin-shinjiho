import { SECOND_MILLISECOND, PHONE_NUMBER_LENGTH, VERIFIED_CODE_LENGTH } from './constant.js';

import {
  setAutoHyphen,
  removeInputValue,
  hideElement,
  showElement,
  verifyInputValue,
  toggleRemoveButton,
} from './util.js';

const init = () => {
  const $phoneForm = document.querySelector('#signup-phone-form');
  const $phoneLabel = document.querySelector('.input-group.phone .label');
  const $phoneInput = document.querySelector('.input-group.phone .input');
  const $validateButton = document.querySelector('#signup-phone-validate-button');
  const $phoneInputRemoveButton = document.querySelector('.input-group.phone .input-remover');

  const $verifiedCodeForm = document.querySelector('#signup-phone-verified-form');
  const $verifiedCodeInput = document.querySelector('.input-group.verified-code .input');
  const $verifiedCodeReload = document.querySelector('#signup-phone-reload-code');
  const $nextPageButton = document.querySelector('#signup-phone-next-page');

  const generateRandomVerifiedCode = () => {
    const randomCode = new Array(4)
      .fill(0)
      .map((_) => Math.floor(Math.random() * 10))
      .join('');

    return randomCode;
  };

  const validatePhoneNumber = (value) => {
    const phoneRegExp = /01[0-9]{1}-[0-9]{4}-[0-9]{4}/;

    return phoneRegExp.test(value);
  };

  const removeVerifiedCode = () => {
    removeInputValue($verifiedCodeInput);

    $nextPageButton.classList.remove('verified');
  };

  const setVerifiedCode = (randomCode) => {
    removeVerifiedCode();

    setTimeout(() => {
      $verifiedCodeInput.value = randomCode;

      $nextPageButton.classList.add('verified');
    }, 2 * SECOND_MILLISECOND);
  };

  const submitPhoneForm = (e) => {
    e.preventDefault();

    if (!validatePhoneNumber($phoneInput.value)) return;

    $phoneLabel.classList.add('verified');

    hideElement($validateButton);
    hideElement($phoneInputRemoveButton);
    showElement($verifiedCodeForm);

    $phoneInput.disabled = true;

    const randomCode = generateRandomVerifiedCode();
    setVerifiedCode(randomCode);
  };

  const clickPhoneRemoveButton = () => {
    removeInputValue($phoneInput, $phoneInputRemoveButton);
  };

  const changePhoneInput = (e) => {
    const { value } = e.target;

    setAutoHyphen($phoneInput, value);

    toggleRemoveButton($phoneInputRemoveButton, !!$phoneInput.value);

    if ($phoneInput.value.length === PHONE_NUMBER_LENGTH) {
      verifyInputValue($phoneInput, validatePhoneNumber($phoneInput.value));
      return;
    }

    $phoneInput.classList.remove('verified');
  };

  const clickReloadVerfiedCode = () => {
    const randomCode = generateRandomVerifiedCode();
    setVerifiedCode(randomCode);
  };

  const changeVerifiedCodeInput = (e) => {
    const { value } = e.target;

    if (value.length === VERIFIED_CODE_LENGTH) {
      $nextPageButton.classList.add('verified');
      return;
    }

    $nextPageButton.classList.remove('verified');
  };

  const clickNextPageButton = () => {
    if (!$nextPageButton.classList.contains('verified')) return;

    location.href = '/signup/detail';
  };

  $phoneForm.addEventListener('submit', submitPhoneForm);
  $phoneInput.addEventListener('input', changePhoneInput);
  $phoneInputRemoveButton.addEventListener('click', clickPhoneRemoveButton);
  $verifiedCodeReload.addEventListener('click', clickReloadVerfiedCode);
  $verifiedCodeInput.addEventListener('input', changeVerifiedCodeInput);
  $nextPageButton.addEventListener('click', clickNextPageButton);
};

init();
