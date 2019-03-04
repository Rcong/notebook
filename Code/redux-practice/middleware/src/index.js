import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import MovieList from './component/MovieList'
import reducers from './reducers'
import registerServiceWorker from './registerServiceWorker';



import store from 'stores';

const render = () => ReactDOM.render(
  <MovieList
    value={store.getState()}
    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
    onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
  />, document.getElementById('root')
)

render();

store.subscribe(render);

registerServiceWorker();