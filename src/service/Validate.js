function validateEmailAndPassword(mail, pass) {
  const seven = /.{6,}/;
  const reg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  return (reg.test(mail) && seven.test(pass));
}

export default validateEmailAndPassword;