import generalUtails from '../utils/generalUtils';

const signupDataKey = 'signupData';

module.exports = {
  updateInterestsData: (data, key, property) => {
    const newData = data;
    newData[key][property] = !newData[key][property];
    const oldData = generalUtails.storageGetItem(signupDataKey);
    oldData.interestsData = newData;
    generalUtails.storageSetItem(signupDataKey, oldData);
    return newData;
  },
};
