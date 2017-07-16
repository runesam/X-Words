import generalUtils from './generalUtils';

module.exports = {
  setUserData() {
    generalUtils.storageGetItem('memberId').then(data => {
      this.memberId = data || 55;
    });
    generalUtils.storageGetItem('email').then(data => {
      this.email = data || 'ahmed.badw@gmail.com';
    });
    generalUtils.storageGetItem('password').then(data => {
      this.password = data || 11;
    });
  },
  getUserData() {
    return {
      memberId: this.memberId,
      email: this.email,
      password: this.password
    };
  }
};
