/* eslint-disable sonarjs/prefer-single-boolean-return */
/* eslint-disable max-statements */
export function validatePassword(firstInput: string, confirmationInput: string): boolean {
  if (firstInput !== confirmationInput) {
    return false;
  }

  if (firstInput.length < 8) {
    return false;
  }

  if (!/[A-Z]+/.test(firstInput)) {
    return false;
  }

  if (!/\d+/.test(firstInput)) {
    return false;
  }

  if (!/[!#$%()*,.:;@^]+/.test(firstInput)) {
    return false;
  }

  return true;
}
