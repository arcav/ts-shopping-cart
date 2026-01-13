import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCartContext } from '../CartContext';

// Mock Product
const mockProduct: CarItemType = {
    id: '1',
    title: 'Test Product',
    price: 100,
    amount: 1, // Start amount for the object passed to add
    category: 'test',
    brand: 'test',
    description: 'test',
    image: 'test.jpg'
};

const TestComponent = () => {
    const { cartProducts, handleAddToCar, handleRemoveFromCart, calculateTotal, clearCart } = useCartContext();

    return (
        <div>
            <div data-testid="cart-count">{cartProducts.length}</div>
            <div data-testid="cart-total">{calculateTotal(cartProducts)}</div>
            <div data-testid="item-amount">{cartProducts.find(p => p.id === '1')?.amount || 0}</div>
            <button onClick={() => handleAddToCar(mockProduct)}>Add</button>
            <button onClick={() => handleRemoveFromCart('1')}>Remove</button>
            <button onClick={clearCart}>Clear</button>
        </div>
    );
};

describe('CartContext Logic', () => {
    test('provides initial empty state', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );
        expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
        expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
    });

    test('adds product to cart', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );
        const addButton = screen.getByText('Add');
        fireEvent.click(addButton);

        expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
        expect(screen.getByTestId('cart-total')).toHaveTextContent('100');
        expect(screen.getByTestId('item-amount')).toHaveTextContent('1');
    });

    test('increments amount when adding existing product', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );
        const addButton = screen.getByText('Add');
        fireEvent.click(addButton);
        fireEvent.click(addButton);

        expect(screen.getByTestId('cart-count')).toHaveTextContent('1'); // Still 1 unique item
        expect(screen.getByTestId('item-amount')).toHaveTextContent('2'); // Amount is 2
        expect(screen.getByTestId('cart-total')).toHaveTextContent('200'); // Total 200
    });

    test('removes product from cart logic (decrement)', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );
        const addButton = screen.getByText('Add');
        const removeButton = screen.getByText('Remove');

        // Add twice
        fireEvent.click(addButton);
        fireEvent.click(addButton);
        expect(screen.getByTestId('item-amount')).toHaveTextContent('2');

        // Remove once
        fireEvent.click(removeButton);
        expect(screen.getByTestId('item-amount')).toHaveTextContent('1');
        expect(screen.getByTestId('cart-total')).toHaveTextContent('100');
    });

    test('removes product completely when amount becomes 0', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );
        const addButton = screen.getByText('Add');
        const removeButton = screen.getByText('Remove');

        fireEvent.click(addButton);
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1');

        fireEvent.click(removeButton);
        expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
        expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
    });

    test('clears cart', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );
        fireEvent.click(screen.getByText('Add'));
        fireEvent.click(screen.getByText('Clear'));

        expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
        expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
    });
});
