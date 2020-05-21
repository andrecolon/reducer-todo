import React, { useReducer, useRef } from 'react'

export default function Reducer() {

    const inputRef = useRef();
    //referecne on a node
    const [items, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'add':
                return [
                    // return a new array
                    ...state,
                    //copy everything from state
                    {
                        id: state.length,
                        name: action.name
                        // add our new items here
                    }
                ]
            case 'remove':
                return state.filter((_, index) => index !== action.index)
            // lets filter out the array - remove the index regarding teh action
            case 'clear':
                return []
            default:
                return state
        }

    }, []);


    const handleSubmit = event => {
        event.preventDefault();
        dispatch({
            type: 'add',
            name: inputRef.current.value

        })
        inputRef.current.value = ''
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input ref={inputRef} />

            </form>
            <button onClick={() => dispatch({ type: 'clear' })}>clear</button>
            <ul>
                {items.map((item, index) => (
                    <li key={item.id}>
                        {item.name}
         - <button onClick={() => dispatch({ type: 'remove', index })}> remove me</button>
                    </li>
                ))}

            </ul>
        </div>
    )
}

