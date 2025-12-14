'use client';

import { useReducer } from 'react';
import { Button } from './ui/button';

type Item = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

const items: Item[] = [
  { id: '1', name: 'Nuxt 3', price: 10, qty: 1 },
  { id: '2', name: 'Next 19', price: 20, qty: 1 },
  { id: '3', name: 'Svelkit', price: 30, qty: 1 },
];

type State = {
  items: Item[];
  totalAmount: number;
  totalQuantity: number;
};

const initialState: State = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

type Action = {
  type: 'add_to_cart' | 'remove_from_cart';
  payload: Item;
};

const ShoppingCartReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'add_to_cart': {
      let hasExistingItem = false;

      const updatedItems = state.items.map((item) => {
        if (item.id === action.payload.id) {
          hasExistingItem = true;
          return { ...item, qty: item.qty + 1 };
        }
        return item;
      });

      if (hasExistingItem === false) {
        updatedItems.push(action.payload);
      }

      return {
        items: updatedItems,
        totalAmount: state.totalAmount + action.payload.price,
        totalQuantity: state.totalQuantity + 1,
      };
    }
    case 'remove_from_cart': {
      const items = state.items.reduce<Item[]>((acc, item) => {
        if (item.id === action.payload.id) {
          if (item.qty > 1) {
            acc.push({ ...item, qty: item.qty - 1 });
          }
          // If qty === 1, don't push (removes the item)
        } else {
          acc.push(item);
        }
        return acc;
      }, []);

      return {
        items,
        totalAmount: state.totalAmount - action.payload.price,
        totalQuantity: state.totalQuantity - 1,
      };
    }
    default:
      return state;
  }
};

export default function ShoppingCartWithReducer() {
  const [state, dispatch] = useReducer(ShoppingCartReducer, initialState);

  return (
    <div className="p-4 space-y-4">
      <section>
        <h1>Items</h1>
        <div className="gap-4 flex-col p-4 border flex">
          {items.map((item) => (
            <div key={item.id} className="flex gap-2 items-center">
              <p>
                {item.name} - ${item.price}
              </p>
              <Button onClick={() => dispatch({ type: 'add_to_cart', payload: item })}>
                Add to cart
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h1>Cart</h1>
        <div className="gap-4 flex-col p-4 border flex">
          {state.items.length ? (
            state.items.map((item) => (
              <div key={item.id} className="flex gap-2 items-center">
                <p>
                  {item.name} - ${item.price} x {item.qty}
                </p>
                <Button onClick={() => dispatch({ type: 'remove_from_cart', payload: item })}>
                  Remove from cart
                </Button>
              </div>
            ))
          ) : (
            <p>Cart is empty</p>
          )}
          <p>Total amount: ${state.totalAmount}</p>
          <p>Total quantity: {state.totalQuantity}</p>
        </div>
      </section>
    </div>
  );
}
