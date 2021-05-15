import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Products from '../components/Products';

describe('<Products>', ()=>{

    test("render products component when products list is undefined and loading is true should display Loading...", () =>{
        const products = undefined
        const onAddProduct = jest.fn()
        const loading = true;

        const { getByTestId } = render(<Products products={products} onAddProduct ={onAddProduct} loading ={loading}  />);
        
        expect(getByTestId('products-loading')).toHaveTextContent('Loading...');
    })

    test("render products component when products list is undefined and loading is false should display Loading...", () =>{
        const products = undefined;
        const onAddProduct = jest.fn()
        const loading = false;

        const { getByTestId } = render(<Products products={products} onAddProduct ={onAddProduct} loading ={loading}  />);
        
        expect(getByTestId('products-loading')).toHaveTextContent('Loading...');
    })

    test("render products component when products list is empty and loading is true should display Loading...", () =>{
        const products = [];
        const onAddProduct = jest.fn()
        const loading = true;

        const { getByTestId } = render(<Products products={products} onAddProduct ={onAddProduct} loading ={loading}  />);
        
        expect(getByTestId('products-loading')).toHaveTextContent('Loading...');
    })

    test("render products component when products list is empty and loading is true should not display Loading...", () =>{
        const products = [];
        const onAddProduct = jest.fn()
        const loading = false;

        const { getByTestId } = render(<Products products={products} onAddProduct ={onAddProduct} loading ={loading}  />);
        
        /*expect(getByTestId('product-name')).toHaveTextContent(product.name);
        expect(getByTestId('product-description')).toHaveTextContent(product.description);
        expect(getByTestId('product-price')).toHaveTextContent('$ 10,50');*/
        expect(getByTestId('products-loading')).not.toHaveTextContent('Loading...');
    })
})