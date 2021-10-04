import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomerProfile from './CustomerProfile';

describe('<CustomerProfile />', () => {
  test('it should mount', () => {
    render(<CustomerProfile />);
    
    const customerProfile = screen.getByTestId('CustomerProfile');

    expect(customerProfile).toBeInTheDocument();
  });
});