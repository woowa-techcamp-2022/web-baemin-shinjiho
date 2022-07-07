const init = () => {
  const $checkAllAgree = document.getElementById('check-all-agree-input');
  const $checkboxList = document.getElementById('service-term-checkbox-list');
  const $nextButton = document.getElementById('service-term-next-button');

  const toggleNextButton = (isAllRequired) => {
    if (isAllRequired) {
      $nextButton.classList.add('active');
      return;
    }
    $nextButton.classList.remove('active');
  };

  const clickNextButton = () => {
    const isActive = $nextButton.classList.contains('active');
    if (!isActive) return;

    location.href = '/signup/phone';
  };

  const checkCheckBoxList = () => {
    const checkedCheckboxList = $checkboxList.querySelectorAll('input[type="checkbox"]:checked');
    if (checkedCheckboxList.length !== $checkboxList.length) $checkAllAgree.checked = false;
  };

  const checkRequiredCheckbox = () => {
    const requiredCheckboxList = $checkboxList.querySelectorAll('.check-required');
    const checkedRequiredCheckboxList = $checkboxList.querySelectorAll('.check-required:checked');

    if (requiredCheckboxList.length === checkedRequiredCheckboxList.length) {
      toggleNextButton(true);
      return;
    }
    toggleNextButton(false);
  };

  const changeAllCheckbox = () => {
    const checkboxList = $checkboxList.querySelectorAll('input[type="checkbox"]');
    const allCheckFlag = $checkAllAgree.checked;

    checkboxList.forEach((checkbox) => {
      if (allCheckFlag) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    });

    checkRequiredCheckbox();
  };

  const toggleCheckBox = () => {
    checkCheckBoxList();
    checkRequiredCheckbox();
  };

  $checkAllAgree.addEventListener('change', changeAllCheckbox);
  $checkboxList.addEventListener('change', toggleCheckBox);
  $nextButton.addEventListener('click', clickNextButton);
};

init();
