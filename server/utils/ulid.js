function generateUlid(length) {
  var chars = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var str = '';
  for (i = 0; i < length; i++) {
    str += chars.charAt(Math.round(Math.random() * (61)));
  }
  str += Date.now();
  return str;
}
module.exports = {
  generateUlid
}