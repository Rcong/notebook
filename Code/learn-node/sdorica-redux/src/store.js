import { createStore, combineReducers } from 'redux';
import RoleListReducer from '@Pages/RoleList/reducer';

const reducer = combineReducers({
    RoleListReducer,
});

export default createStore(reducer);