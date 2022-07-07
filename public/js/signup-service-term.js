const init = () => {
  const $checkAllAgree = document.getElementById('check-all-agree-input');
  const $checkboxList = document.getElementById('service-term-checkbox-list');
  const $nextButton = document.getElementById('service-term-next-button');

  const $toggleCheckbox = ($checkbox) => {
    $checkbox.checked = !$checkbox.checked;
  };

  const toggleAllCheckbox = () => {
    const checkboxList = $checkboxList.querySelectorAll('input[type="checkbox"]');

    checkboxList.forEach((checkbox) => {
      $toggleCheckbox(checkbox);
    });
  };

  const toggleNextButton = (isAllRequired) => {
    if (isAllRequired) {
      $nextButton.style.backgroundColor = '#2ac1bc';
      return;
    }
    $nextButton.style.backgroundColor = '#bbbbbb';
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

  $checkAllAgree.addEventListener('change', toggleAllCheckbox);
  $checkboxList.addEventListener('change', checkRequiredCheckbox);
};

init();
