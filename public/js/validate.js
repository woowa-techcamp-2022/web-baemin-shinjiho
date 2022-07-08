import { PASSWORD_MIN_LENGTH } from './constant.js';

export const validateEmail = (value) => {
  const emailRegExp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailRegExp.test(value);
};

export const validatePassword = (value) => {
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

export const validateBirth = (value) => {
  const birthRegExp = /^(19[0-9][0-9]|20\d{2}).(0[0-9]|1[0-2]).(0[1-9]|[1-2][0-9]|3[0-1])$/;

  return birthRegExp.test(value);
};

export const validatePhoneNumber = (value) => {
  const phoneRegExp = /01[0-9]{1}-[0-9]{4}-[0-9]{4}/;

  return phoneRegExp.test(value);
};
