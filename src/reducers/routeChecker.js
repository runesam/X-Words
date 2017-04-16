import { Reducer, Actions } from 'react-native-router-flux';
import generalUtils from '../utils/generalUtils';

export default params => {
  const defaultReducer = Reducer(params);
  return (state, action) => {
    if (action.reCheck) {
      setTimeout(() => {
        generalUtils.storageSetItem('status', 'ready');
        Actions.HomePageHolder();
      });
    }
    return defaultReducer(state, action);
  };
};
