import { Reducer, Actions } from 'react-native-router-flux';
import generalUtils from '../utils/generalUtils';

export default params => {
  const defaultReducer = Reducer(params);
  return (state, action) => {
    console.log(action);
    if (!action.scene || !action.key) {
      setTimeout(() => {
        // generalUtils.storageSetItem('status', 'ready');
        // Actions.HomePageHolder();
      });
    }
    return defaultReducer(state, action);
  };
};
