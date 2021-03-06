import {
  AsyncStorage
} from 'react-native';

module.exports = {
  storageSetItem: async (key, value) => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        console.log('Saved selection to disk');
      } catch (error) {
        console.log(error);
      }
  },
  storageGetItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return JSON.parse(value);
    } catch (error) {
      console.log(error);
    }
  },
  storageRemoveItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log('Selection removed from disk.');
    } catch (error) {
      console.log(error);
    }
  },
  storageGetAllItems: async () => {
    try {
      await AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (error, stores) => {
          stores.map((result, i, store) => {
            const key = store[i][0];
            const value = JSON.parse(store[i][1]);
            console.log({ [key]: value });
            return { key, value };
           });
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
  getDataFromApi: async (uri, data) => {
    const URL = `https://10wordsapp.com/AgknHajKK/api/application/${uri}.php`;
    try {
      const response = await fetch(URL, data || null);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.log(error);
    }
  },
  setDataFromApi: async (uri, data) => {
    const URL = `https://10wordsapp.com/AgknHajKK/api/application/${uri}.php`;
    return fetch(URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      const responseJson = response.json();
      return responseJson;
    })
    .catch((reason) => console.log(reason));
  },
  validateEmail: (email) => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(reg.test(email));
    return reg.test(email);
  },
  validatePhone: (phone) => {
    const reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone.match(reg)) {
      console.log(reg.test(phone));
      return true;
    }
    console.log(reg.test(phone));
    return false;
  }
};
