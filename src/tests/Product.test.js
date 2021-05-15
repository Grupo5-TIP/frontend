import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Product from '../components/Product';
import { fireEvent } from '@testing-library/dom';

describe('<Product>', ()=>{

    test("render item test when has a product with price 10", () =>{
        const product = {
            name: "name",
            description: "description", 
            price: 10.50,
            image: "img", 
            category: "category",         
        }
        const onAddProduct = jest.fn()

        const { getByTestId } = render(<Product product={product} onAddProduct ={onAddProduct} />);
        
        expect(getByTestId('product-name')).toHaveTextContent(product.name);
        expect(getByTestId('product-description')).toHaveTextContent(product.description);
        expect(getByTestId('product-price')).toHaveTextContent('$ 10,50');
    })
})