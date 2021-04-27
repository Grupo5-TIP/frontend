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
      },
      amount: 1,
    };
  
    const component = render(<Item item={item} />);
  
    component.getByText('$ 10,00')
    component.getByText('Cant: 1')
  
  });
  
  test("render item with price 40 when has a product with price 20 and amount 2", () =>{
    const item = {
      product: {
        price: 20,
      },
      amount: 2,
    };
  
    const component = render(<Item item={item}/>);
  
    component.getByText('$ 40,00')
    component.getByText('Cant: 2')
  
  });
  
  test("render item with price 45 name this is an item test and when has a product with price 15 and amount 3", () =>{
    const item = {
      product: {
        price: 15,
        name: "this is an item test"
      },
      amount: 3,
    };
  
    const component = render(<Item item={item} />);
  
    component.getByText('$ 45,00')
    component.getByText('Cant: 3')
    component.getByText('this is an item test')
  });
  
  test("test the x button on item element", () =>{
    const item = {
      product: {
        price: 15,
        name: "this is an item test"
      },
      amount: 3,
    };
  
    const mockHandler = jest.fn()
  
    const component = render(<Item item={item} onDeleteProduct={mockHandler} />);
  
    const button = component.getByText('x');
    fireEvent.click(button)
    expect(mockHandler).toHaveBeenCalledTimes(1); 
  });

})