import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Table from '../components/Table';

describe('<Table>', () => {

    test("render table when is inUse on small devices must display id and state", () => {
        const table = {
            id: 1,
            x: 10,
            y: 100,
            state: "inUse",
            size: 3,
        };

        const { getByTestId } = render(<Table table={table} />);

        expect(getByTestId('table-small-id')).toHaveTextContent(table.id)
        expect(getByTestId('table-small-state')).toHaveTextContent(table.state)
    });

    test("render table when is inUse on larger devices must display id and state", () => {
        global.innerWidth = 500;

        const table = {
            id: 1,
            x: 10,
            y: 100,
            state: "inUse",
            size: 3,
        };

        const { getByTestId } = render(<Table table={table} />);

        //expect(getByTestId('table-badge')).toHaveTextContent(`${table.id}.${table.state}`)
        //expect(getByTestId('table-size')).toHaveTextContent(`size: ${table.size}`)
        //expect(getByTestId('table-detail')).toHaveTextContent('Detalle...')
    });
});