export function validateEmail(email) {
  const re = /^[a-zA-z]+\.[a-zA-z]+(@ug\.edu\.\ec)$/;   
  return re.test(email);
}
