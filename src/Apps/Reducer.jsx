import React, { useReducer } from 'react';

const initialState = { items: [], total: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
      };
    case 'REMOVE_ITEM':
      const updatedItems = state.items.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        items: updatedItems,
        total: state.total - action.payload.price,
      };
    default:
      return state;
  }
};

function ShoppingCart() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {state.items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => removeItem(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${state.total}</p>
      <button onClick={() => addItem({ id:Math.round(Math.random() * 1000000), name: 'Product', price: 10 })}>
        Add Product
      </button>
    </div>
  );
}
 export default ShoppingCart;