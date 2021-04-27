import React from 'react';
import { render } from '@testing-library/react';
import DrawerCart from '../components/DrawerCart';
import { fireEvent } from '@testing-library/dom';

const item = {
    product: {
        id: 1,
        price: 15,
        name: "this is an item test"
    },
    amount: 3,
  };

describe('<DrawerCart />', ()=>{
    let component;


    test("should render ok without items", ()=>{
        const { queryByText  } = render(<DrawerCart items={[]} />)
        expect(queryByText ("No hay elementos en tu carrito")).not.toBeInTheDocument();
    });

})