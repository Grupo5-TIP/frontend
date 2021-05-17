import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import AlertDisplay from '../components/AlertDisplay';

describe('<AlertDisplay>', () => {
    test("render AlertDisplay success should display the message", () => {

        const message = "test";
        const status = "success";

        const { getByTestId } = render(<AlertDisplay message={message} status={status} />);

        expect(getByTestId('alert-message')).toHaveTextContent(message);
    })

})