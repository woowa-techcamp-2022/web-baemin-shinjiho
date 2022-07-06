const init = () => {
  const $inputId = document.getElementById('signin-input-id');
  const $inputPassword = document.getElementById('signin-input-password');
  const $signinForm = document.getElementById('signin-form');
  const $spanErrorId = document.getElementById('signin-id-error');
  const $spanErrorPassword = document.getElementById('signin-password-error');

  const submitLogin = (e) => {
    const idValue = $inputId.value;
    const passwordValue = $inputPassword.value;

    if (!idValue) {
      e.preventDefault();
      $spanErrorId.innerText = '아이디 또는 이메일을 입력해주세요';
      return;
    }
    if (!passwordValue) {
      e.preventDefault();
      $spanErrorPassword.innerText = '비밀번호를 입력해주세요';
      return;
    }
  };

  $signinForm.addEventListener('submit', submitLogin);
};

init();
