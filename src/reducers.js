/**
* Root Reducer
*/
import { combineReducers } from 'redux';

// Import Reducers
import loginStore from './login/Reducers';
import studentStore from './student/Reducers';
import userStore from './users/Reducers';


// Combine all reducers into one root reducer
const rootReducer = combineReducers({
    loginStore,
    studentStore,
    userStore
});

export default rootReducer