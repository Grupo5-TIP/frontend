import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Bill from '../components/Bill';
import tableService from '../services/tables-service'

jest.mock('../services/tables-service', () => ({
    getTableById: jest.fn(),
    pedirCuenta: jest.fn(),
    itemsFromTable: jest.fn()
}))


describe('<Bill>', () => {
    test("render Bill loading", () => {

        const { getByTestId } = render(<Bill tableId={0}/>);

        expect(getByTestId('loading')).toBeInTheDocument();
    })

    test("render Bill with data", async () => {

        tableService.itemsFromTable.mockReturnValue([]);
        tableService.pedirCuenta.mockReturnValue(true);


        const { getByTestId } = render(<Bill tableId={1}/>);


        expect(getByTestId('loading')).toBeInTheDocument();
    })

})