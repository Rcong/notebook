import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Counter extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { onIncrement, onDecrement, value } = this.props;

        return (
            <p>
                Clicked: {value} times
                {' '}
                <button onClick={onIncrement}>+</button>
                {' '}
                <button onClick={onDecrement}>-</button>
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