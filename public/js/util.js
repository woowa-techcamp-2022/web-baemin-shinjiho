export const showElement = ($target) => {
  $target.classList.remove('hide');
};

export const hideElement = ($target) => {
  $target.classList.add('hide');
};

export const toggleRemoveButton = ($removeButton, condition) => {
  if (condition) showElement($removeButton);
  else hideElement($removeButton);
};

export const removeInputValue = ($input, $removeButton) => {
  $input.value = '';
  if ($removeButton) hideElement($removeButton);
};

export const verifyInputValue = ($target, isValid) => {
  if (isValid) $target.classList.add('verified');
  else $target.classList.remove('verified');
};

export const setAutoDot = ($target, value) => {
  $target.value = value.replace(/[^0-9]/g, '').replace(/^(\d{4})(\d{2})(\d{2})$/, `$1.$2.$3`);
};

export const setAutoHyphen = ($target, value) => {
  $target.value = value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
};
