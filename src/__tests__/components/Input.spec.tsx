import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input Component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should renders highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElem = getByPlaceholderText('E-mail');
    const containerElem = getByTestId('input-container');

    fireEvent.focus(inputElem);

    await waitFor(() => {
      expect(containerElem).toHaveStyle('border-color: #ff9000;');
      expect(containerElem).toHaveStyle('color: #ff9000;');
    });

    fireEvent.blur(inputElem);

    await waitFor(() => {
      expect(containerElem).not.toHaveStyle('border-color: #ff9000;');
      expect(containerElem).not.toHaveStyle('color: #ff9000;');
    });
  });

  it('should keep input highlight when input filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElem = getByPlaceholderText('E-mail');
    const containerElem = getByTestId('input-container');

    fireEvent.change(inputElem, {
      target: { value: 'jondoe@example.com' },
    });
    fireEvent.blur(inputElem);

    await waitFor(() => {
      expect(containerElem).toHaveStyle('color: #ff9000;');
    });
  });
});
