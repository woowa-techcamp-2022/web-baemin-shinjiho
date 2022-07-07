import { SECOND_MILLISECOND, PHONE_NUMBER_LENGTH } from './constant.js';

const init = () => {
  const $phoneForm = document.getElementById('signup-phone-form');
  const $phoneLabel = document.getElementById('signup-phone-label');
  const $phoneInput = document.getElementById('signup-phone-input');
  const $validateButton = document.getElementById('signup-phone-validate-button');
  const $phoneInputRemoveButton = document.getElementById('signup-phone-input-remover');
  const $phoneValidateCheck = document.getElementById('signup-phone-verified-check');
  const $verifiedCodeForm = document.getElementById('signup-phone-verified-form');
  const $verifiedCodeInput = document.getElementById('signup-phone-verified-input');
  const $verifiedCodeReload = document.getElementById('signup-phone-reload-code');

  const generateRandomVerifiedCode = () => {
    const randomCode = new Array(4)
      .fill(0)
      .map((_) => Math.floor(Math.random() * 10))
      .join('');

    return randomCode;
  };

  const setAutoHyphen = ($input) => {
    $input.value = $input.value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  };

  const validatePhoneNumber = ($input) => {
    const phoneRegExp = /01[0-9]{1}-[0-9]{4}-[0-9]{4}/;

    return phoneRegExp.test($input.value);
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
  };

  const setVerifiedCode = (randomCode) => {
    removeVerifiedCode();

    setTimeout(() => {
      $verifiedCodeInput.value = randomCode;
    }, 2 * SECOND_MILLISECOND);
  };

  const submitPhoneForm = (e) => {
    e.preventDefault();

    $phoneLabel.classList.add('verified');
    $validateButton.classList.add('hide');
    $verifiedCodeForm.classList.remove('hide');

    $phoneInput.disabled = true;

    const randomCode = generateRandomVerifiedCode();
    setVerifiedCode(randomCode);
  };

  const changePhoneInput = () => {
    setAutoHyphen($phoneInput);
    toggleShowPhoneInputRemoveButton();

    if ($phoneInput.value.length === PHONE_NUMBER_LENGTH) {
      if (validatePhoneNumber($phoneInput)) {
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

  $phoneForm.addEventListener('submit', submitPhoneForm);
  $phoneInput.addEventListener('input', changePhoneInput);
  $phoneInputRemoveButton.addEventListener('click', removePhoneInputValue);
  $verifiedCodeReload.addEventListener('click', clickReloadVerfiedCode);
};

init();
