import { SECOND_MILLISECOND, PHONE_NUMBER_LENGTH, VERIFIED_CODE_LENGTH } from './constant.js';

const init = () => {
  const $phoneForm = document.querySelector('#signup-phone-form');
  const $phoneLabel = document.querySelector('.input-group.phone .label');
  const $phoneInput = document.querySelector('.input-group.phone .input');
  const $validateButton = document.querySelector('#signup-phone-validate-button');
  const $phoneInputRemoveButton = document.querySelector('.input-group.phone .input-remover');
  const $phoneValidateCheck = document.querySelector('.input-group.phone .input-check');

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

  const setAutoHyphen = ($target, value) => {
    $target.value = value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  };

  const validatePhoneNumber = (value) => {
    const phoneRegExp = /01[0-9]{1}-[0-9]{4}-[0-9]{4}/;

    return phoneRegExp.test(value);
  };

  const removePhoneInputValue = () => {
    $phoneInput.value = '';

    toggleShowPhoneInputRemoveButton();
  };

  const toggleShowPhoneInputRemoveButton = () => {
    if ($phoneInput.value.length) {
      $phoneInputRemoveButton.classList.remove('hide');
    } else {
      $phoneInputRemoveButton.classList.add('hide');
    }
  };

  const removeVerifiedCode = () => {
    $verifiedCodeInput.value = '';
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
    $validateButton.classList.add('hide');
    $verifiedCodeForm.classList.remove('hide');
    $phoneInputRemoveButton.classList.add('hide');

    $phoneInput.disabled = true;

    const randomCode = generateRandomVerifiedCode();
    setVerifiedCode(randomCode);
  };

  const changePhoneInput = (e) => {
    const { value } = e.target;

    setAutoHyphen($phoneInput, value);

    toggleShowPhoneInputRemoveButton();
    if ($phoneInput.value.length === PHONE_NUMBER_LENGTH) {
      if (validatePhoneNumber($phoneInput.value)) {
        $phoneValidateCheck.classList.add('verified');
        return;
      }
    }

    $phoneValidateCheck.classList.remove('verified');
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
  $phoneInputRemoveButton.addEventListener('click', removePhoneInputValue);
  $verifiedCodeReload.addEventListener('click', clickReloadVerfiedCode);
  $verifiedCodeInput.addEventListener('input', changeVerifiedCodeInput);
  $nextPageButton.addEventListener('click', clickNextPageButton);
};

init();
