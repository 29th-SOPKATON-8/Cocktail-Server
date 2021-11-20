module.exports = {
    success: (status, message, data) => {
      return {
        status,
        message,
        data,
      };
    },
    fail: (status, message) => {
      return {
        status,
        message,
      };
    },
  };