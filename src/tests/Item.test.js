import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Item from '../components/Item';
import { fireEvent } from '@testing-library/dom';

describe('<Item>', ()=>{
  
  test("render item test when has a product with price 10", () =>{
    const item = {
      product: {
        price: 10,
        name: 'test'
      },
      amount: 1,
    };
  
    const { getByTestId } = render(<Item item={item} />);
  
    expect(getByTestId('amount')).toHaveTextContent('1')
    expect(getByTestId('total')).toHaveTextContent('$ 10,00')
  });
  
  test("render item with price 40 when has a product with price 20 and amount 2", () =>{
    const item = {
      product: {
        price: 20,
        name: 'test'
      },
      amount: 2,
    };
  
    const { getByTestId } = render(<Item item={item}/>);
  
    expect(getByTestId('amount')).toHaveTextContent('2')
    expect(getByTestId('total')).toHaveTextContent('$ 40,00')
  
  });
  
  test("render item with price 45 name this is an item test and when has a product with price 15 and amount 3", () =>{
    const item = {
      product: {
        price: 15,
        name: "this is an item test"
      },
      amount: 3,
    };
  
    const { getByTestId } = render(<Item item={item} />);
  
    expect(getByTestId('amount')).toHaveTextContent('3')
    expect(getByTestId('total')).toHaveTextContent('$ 45,00')
  });


})