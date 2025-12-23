export function validateName(userName) {
  if (userName === null) {
    return false
  }
  return userName.trim().length > 6;
}

export function validateEmail(email) {
  if (email === null) {
    return false;
  }
  return email.includes('@');
}

export function validateString(value) {
  if (value === null) {
    return false;
  }
  return value.trim() !== '';
}
