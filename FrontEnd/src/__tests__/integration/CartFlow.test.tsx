import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCartContext } from '../../context/CartContext';
import ProductList from '../../components/organisms/ProductList';

// Mock Product
const mockProducts: CarItemType[] = [
    {
        id: '1',
        title: 'Integration Fridge',
        price: 500,
        amount: 0,
        category: 'Kitchen',
        brand: 'TestBrand',
        description: 'Testing',
        image: 'test.jpg'
    }
];

// Integration Component Wrapper
// We mock the handlers to use the real Context, or we pass them through.
// ProductList takes Props: handleAddToCar, cartProducts, etc.
// We get these from Context.
const IntegrationWrapper = () => {
    const { cartProducts, handleAddToCar, handleRemoveFromCart, calculateTotal } = useCartContext();

    return (
        <div>
            <div data-testid="global-cart-count">{cartProducts.length}</div>
            <div data-testid="global-cart-total">{calculateTotal(cartProducts)}</div>
            <ProductList
                data={mockProducts}
                cartProducts={cartProducts}
                handleAddToCar={handleAddToCar}
                handleRemoveFromCart={handleRemoveFromCart}
            />
        </div>
    );
};

describe('Cart Integration Flow', () => {
    test('User can add product from list to cart', () => {
        render(
            <CartProvider>
                <IntegrationWrapper />
            </CartProvider>
        );

        // Verify initial state
        expect(screen.getByTestId('global-cart-count')).toHaveTextContent('0');

        // Find the product title to ensure it rendered
        expect(screen.getByText('Integration Fridge')).toBeInTheDocument();

        // Find the "Comprar" button
        // Since there is one product, there should be one button
        const buyButton = screen.getByText('Comprar');

        // Add to cart
        fireEvent.click(buyButton);

        // Verify context updated
        expect(screen.getByTestId('global-cart-count')).toHaveTextContent('1');
        expect(screen.getByTestId('global-cart-total')).toHaveTextContent('500');

        // Add same item again (quantity increase)
        fireEvent.click(buyButton);

        // Cart count (unique items) should still be 1, but total should be 1000
        expect(screen.getByTestId('global-cart-count')).toHaveTextContent('1');
        expect(screen.getByTestId('global-cart-total')).toHaveTextContent('1000');
    });
});
