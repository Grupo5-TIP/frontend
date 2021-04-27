import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Items from '../components/Items';

const item = {
    product: {
        id: 1,
        price: 15,
        name: "this is an item test"
    },
    amount: 3,
  };

describe('<Items />', ()=>{
    let component;
    let onDeleteProductMock;

    beforeEach(()=>{
        onDeleteProductMock = jest.fn()
        component = render(<Items items={[item]} onDeleteProduct ={onDeleteProductMock} />)
    });

    test("should render ok without childrens", ()=>{
        component = render(<Items items={[]} onDeleteProduct ={onDeleteProductMock} />)

        expect(screen.getByText("No hay elementos en tu orden")).toBeInTheDocument();
    });

    test("should render ok with one childrens", ()=>{
        
        const received = component.getAllByTestId('test-items').map(el => el.textContent);
        expect(received.length).toBe(1); 
        expect(received[0]).toContain(item.product.name);
        expect(received[0]).toContain(item.product.price*item.amount);
        expect(received[0]).toContain(item.amount);
    });
})