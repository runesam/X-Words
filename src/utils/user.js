import generalUtils from './generalUtils';

module.exports = {
  setUserData() {
    generalUtils.storageGetItem('memberId').then(data => {
      this.memberId = 55;
    });
  },
  password: 11,
  getUserData() {
    return {
      memberId: 55,
      password: this.password
    };
  }
};
