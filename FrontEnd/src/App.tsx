import React, { useState } from 'react';
import { useCart } from './hooks/useCart';
import { useCategories } from './hooks/useCategories';
import { useCartContext } from './context/CartContext';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import ProductList from './Components/Product/ProductList';
import Layout from './Components/Layout/Layout';
import { BannerHero } from './Components/BannerHero/BannerHero';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login/Login';
import Dashboard from './pages/Admin/Dashboard';
import CategoryList from './Components/Category/CategoryList';
import CategoryPage from './pages/Category/CategoryPage';



// Protected Route Component
const ProtectedRoute = ({ children, role, ...rest }: any) => {
    const { user, isAuthenticated } = useAuth();
    return (
        <Route {...rest} render={({ location }) => {
            if (!isAuthenticated) {
                return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
            }
            if (role && user?.role !== role) {
                return <Redirect to="/" />;
            }
            return children;
        }} />
    );
};

const AppContent = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const { data, isLoading, error } = useCart();
    
    const {
        cartProducts,
        handleAddToCar,
        handleRemoveFromCart,
        calculateTotal,
        clearCart
    } = useCartContext();

    const { categories } = useCategories();

    const filteredProducts = data?.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getTotalItems = (items: CarItemType[]) => {
        const total = items.reduce((ack: number, item) => ack + item.amount, 0);
        console.log('🔢 Badge total:', total, 'from items:', items.map(i => ({ id: i.id, amount: i.amount })));
        return total;
    };

    if (error) return <div>Something went wrong ...</div>;

    const commonLayoutProps = {
        cartOpen,
        setCartOpen,
        badgeContent: getTotalItems(cartProducts),
        clearCart,
        onSearch: setSearchQuery,
        isLoading,
        error,
        cartProducts,
        handleRemoveFromCart,
        handleAddToCar,
        calculateTotal
    };

    return (
        <div className="App">
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                
                <ProtectedRoute path="/admin" role="admin">
                    <Layout {...commonLayoutProps}>
                        <Dashboard products={data} cartProducts={cartProducts} />
                    </Layout>
                </ProtectedRoute>

                <Route path="/category">
                    <Layout {...commonLayoutProps}>
                        <CategoryPage />
                    </Layout>
                </Route>

                <Route path="/">
                    <Layout {...commonLayoutProps}>
                        <BannerHero images={[
                            "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                            "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                            "https://images.unsplash.com/photo-1472851294608-415522f96385?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
                            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        ]} />
                        
                        <Loja />

                        <CategoryList categories={categories} />

                        <div className="space-y-12 my-8">
                            <h3 className="text-2xl font-bold text-gray-800 tracking-tight mb-6">All Products</h3>
                            
                            {Array.from(new Set(filteredProducts?.map(p => p.category))).map(category => {
                                const productsInCategory = filteredProducts?.filter(p => p.category === category);
                                
                                if (!productsInCategory || productsInCategory.length === 0) return null;

                                return (
                                    <div key={category} className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
                                        <h3 className="text-2xl font-bold text-gray-800 tracking-tight mb-6 capitalize border-b pb-2 border-gray-100">
                                            {category}
                                        </h3>
                                        <ProductList
                                            data={productsInCategory}
                                            handleAddToCar={handleAddToCar}
                                            cartProducts={cartProducts}
                                            handleRemoveFromCart={handleRemoveFromCart}
                                        />
                                    </div>
                                );
                            })}
                            
                            {filteredProducts?.length === 0 && (
                                <div className="text-center py-12 text-gray-500">
                                    No products found matching your search.
                                </div>
                            )}
                        </div>
                    </Layout>
                </Route>
            </Switch>
        </div>
    );
}

import { LocationProvider } from './context/LocationContext';
import { Loja } from './Components/Loja/Loja';
import { CartProvider } from './context/CartContext';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <LocationProvider>
                    <CartProvider>
                        <AppContent />
                    </CartProvider>
                </LocationProvider>
            </AuthProvider>
        </Router>
    )
};

export default App;