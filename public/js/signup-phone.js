const PHONE_NUMBER_LENGTH = 13;

const init = () => {
  const $phoneForm = document.getElementById('signup-phone-form');
  const $phoneLabel = document.getElementById('signup-phone-label');
  const $phoneInput = document.getElementById('signup-phone-input');
  const $validateButton = document.getElementById('signup-phone-validate-button');
  const $phoneInputRemoveButton = document.getElementById('signup-phone-input-remover');
  const $phoneValidateCheck = document.getElementById('signup-phone-verified-check');

  const generateRandomVerifiedCode = () => {
    const randomCode = new Array(4).map((_) => Math.floor(Math.random() * 10)).join('');

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

  const submitPhoneForm = (e) => {
    e.preventDefault();

    $validateButton.classList.add('verified');
    $phoneLabel.classList.add('verified');
    $phoneInput.disabled = true;

    const randomCode = generateRandomVerifiedCode();
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

  $phoneForm.addEventListener('submit', submitPhoneForm);
  $phoneInput.addEventListener('input', changePhoneInput);
  $phoneInputRemoveButton.addEventListener('click', removePhoneInputValue);
};

init();
