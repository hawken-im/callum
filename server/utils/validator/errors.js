const errors = {
  ERR_IS_REQUIRED(field) {
    return {
      code: 'ERR_IS_REQUIRED',
      message: `${field} is required`
    };
  },
  ERR_IS_INVALID(field) {
    return {
      code: 'ERR_IS_INVALID',
      message: `${field} is invalid`
    };
  },
  ERR_NOT_FOUND(field) {
    return {
      code: 'ERR_NOT_FOUND',
      message: `${field} not found`
    };
  },
  ERR_IS_DUPLICATED(field) {
    return {
      code: 'ERR_IS_DUPLICATED',
      message: `${field} is duplicated`
    };
  },
  ERR_NO_PERMISSION(field) {
    return {
      code: 'ERR_NOT_PERMISSION',
      message: `no permission of ${field}`
    };
  },
}

module.exports = errors;