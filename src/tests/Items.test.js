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
        const { getByTestId }  = render(<Items items={[]} onDeleteProduct ={onDeleteProductMock} />)

        expect(getByTestId('items-error')).toHaveTextContent('No hay elementos en tu orden')
    });

})