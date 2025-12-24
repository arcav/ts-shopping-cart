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
import BrandFilter from './Components/Filter/BrandFilter';




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
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);


    const { data, isLoading, error } = useCart();
    
    const {
        cartProducts,
        handleAddToCar,
        handleRemoveFromCart,
        calculateTotal,
        clearCart
    } = useCartContext();

    const { categories } = useCategories();

    const filteredProducts = data?.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;
        return matchesSearch && matchesBrand;
    });

    const brands = Array.from(new Set(data?.map(p => p.brand).filter(Boolean) || [])).map(brandName => {
        const logos: { [key: string]: string } = {
            'Electrolux': 'https://logo.clearbit.com/electrolux.com',
            'Panasonic': 'https://logo.clearbit.com/panasonic.com'
        };




        return {
            name: brandName as string,
            image: logos[brandName as string] || data?.find(p => p.brand === brandName)?.image
        };
    });




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

                        <div className="my-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Filtrar por Marca</h3>
                            <BrandFilter 
                                brands={brands} 
                                selectedBrand={selectedBrand} 
                                onSelectBrand={setSelectedBrand} 
                            />
                        </div>

                        <div className="space-y-12 my-8">
                            <h3 className="text-2xl font-bold text-gray-800 tracking-tight mb-6">All Products</h3>
                            
                            <ProductList
                                data={filteredProducts}
                                handleAddToCar={handleAddToCar}
                                cartProducts={cartProducts}
                                handleRemoveFromCart={handleRemoveFromCart}
                                showCategories={true}
                            />
                            
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