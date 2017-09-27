import React, { Component, PropTypes } from 'react'

class Counter extends Component {

    constructor(props) {
        super(props);
    }

    incrementIfOdd() {
        this.props.value % 2 !== 0 && this.props.increment();
    }
    
    incrementAsync() {
        setTimeout(this.props.increment, 1000);
    }

    render() {

        const { increment, decrement, value } = this.props;

        return (
        <p>
            Clicked: {value} times
            {' '}
            <button onClick={increment}>+</button>
            {' '}
            <button onClick={decrement}>-</button>
            {' '}
            <button onClick={this.incrementIfOdd.bind(this)}>Increment if odd</button>
            {' '}
            <button onClick={this.incrementAsync.bind(this)}>Increment async</button>
        </p>
        )
    }
}

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

export default Counter