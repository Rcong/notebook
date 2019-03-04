import { createStore, combineReducers, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import roleListReducer from '@Pages/RoleList/reducer';


// create the saga middleware
// const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({
    roleListReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

// export default createStore(reducer, applyMiddleware(sagaMiddleware));
export default store;