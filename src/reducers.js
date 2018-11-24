/**
* Root Reducer
*/
import { combineReducers } from 'redux';

// Import Reducers
import loginStore from './login/Reducers';
import studentStore from './student/Reducers';


// Combine all reducers into one root reducer
const rootReducer = combineReducers({
    loginStore,
    studentStore
});

export default rootReducer