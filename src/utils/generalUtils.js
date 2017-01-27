import {
  AsyncStorage
} from 'react-native';

module.exports = {
  storageSetItem: async (key, value) => {
      try {
        await AsyncStorage.setItem(key, value);
        console.log('Saved selection to disk');
      } catch (error) {
        console.log(error);
        console.log('AsyncStorage set error');
      }
  },
  storageGetItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log(value);
      return value;
    } catch (error) {
      console.log(error);
      console.log('AsyncStorage get error');
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
            const value = store[i][1];
            console.log({ [key]: value });
            return { key, value };
           });
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
};
