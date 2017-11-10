import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Count from './component/Count'
import reducers from './reducers'

const store = createStore(reducers)

const render = () => ReactDOM.render(
  <Count
    value={store.getState()}
    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
    onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
  />, document.getElementById('root')
)

render();

store.subscribe(render)