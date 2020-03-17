import React from 'react'
import './Counter.scss'

interface CounterParams {
    value: number
    onIncrement: () => void
    onDecrement: () => void
    onIncrementAsync: () => void
}

const Counter: React.FC<CounterParams> = ({
    onIncrement,
    onDecrement,
    onIncrementAsync,
    value,
}) => {
    return (
        <div>
            <button onClick={onIncrement}>Increment</button>
            <button onClick={onDecrement}>Decrement</button>
            <button onClick={onIncrementAsync}>onIncrementAsync</button>
            <hr />
            <div>Clicked: {value} times</div>
        </div>
    )
}

export default Counter
