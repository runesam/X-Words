import generalUtils from './generalUtils';

module.exports = {
  getStatus: (callback) => {
    generalUtils.storageGetItem('status').then((status) => {
      // console.log(status);
      callback(status);
    });
  },
};
