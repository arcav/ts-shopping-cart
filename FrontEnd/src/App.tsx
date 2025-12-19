import React from 'react';
import { useCart } from './hooks/useCart';

//Components
import ProductList from './Components/Product/ProductList';
import Layout from './Components/Layout/Layout';

const App = () => {
    const {
        data,
        isLoading,
        error,
        cartProducts,
        handleAddToCar,
        handleRemoveFromCart,
        calculateTotal
    } = useCart();

    return (
        <Layout
            isLoading={isLoading}
            error={error}
            cartProducts={cartProducts}
            handleRemoveFromCart={handleRemoveFromCart}
            handleAddToCar={handleAddToCar}
            calculateTotal={calculateTotal}
        >
            <h3 className="text-2xl font-bold text-center my-4">Ts-Shopping Cart</h3>
            <div className="bg-white shadow-md rounded-lg p-4">
                <ProductList data={data} handleAddToCar={handleAddToCar} />
            </div>
        </Layout>
    );
};

export default App;