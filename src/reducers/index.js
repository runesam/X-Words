import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SelectionReducer from './SelectionReducer';

export default combineReducers({
  auth: AuthReducer,
  selectedLibraryId: SelectionReducer
});
