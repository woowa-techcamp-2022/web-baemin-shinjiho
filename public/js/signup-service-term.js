const init = () => {
  const $checkAllAgree = document.getElementById('check-all-agree-input');
  const $checkboxList = document.getElementById('service-term-checkbox-list');

  const $toggleCheckbox = ($checkbox) => {
    $checkbox.checked = !$checkbox.checked;
  };

  const toggleAllCheckbox = () => {
    const checkboxList = $checkboxList.querySelectorAll('input[type="checkbox"]');

    checkboxList.forEach((checkbox) => {
      $toggleCheckbox(checkbox);
    });
  };

  $checkAllAgree.addEventListener('change', toggleAllCheckbox);
};

init();
