import React from 'react'
import NavBar from '@/components/organisms/NavBar/NavBar';
import CartDrawer from '@/components/organisms/Drawer/CartDrawer';
import CartButton from '@/components/organisms/Cart/CartButton'

//Types
type Props = {
    children: React.ReactNode
    isLoading: boolean
    error: any
    cartProducts: CarItemType[]
    handleRemoveFromCart: (id: string) => void
    handleAddToCar: (clickedproduct: CarItemType) => void
    calculateTotal: (products: CarItemType[]) => number
    clearCart: () => void
    cartOpen: boolean;
    setCartOpen: (open: boolean) => void;
    badgeContent: number;
    onSearch: (query: string) => void;
}

const Layout = ({ children, isLoading, error, cartProducts, handleRemoveFromCart, handleAddToCar, calculateTotal, clearCart, cartOpen, setCartOpen, badgeContent, onSearch }: Props) => {

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <NavBar
                setCartOpen={setCartOpen}
                badgeContent={badgeContent}
                onSearch={onSearch}
            />

            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
                    <div className="h-full bg-blue-900 animate-pulse"></div>
                </div>
            )}

            <main className="flex-grow pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                {error && <div className="text-red-500 text-center text-xl mt-10">Algo salio mal</div>}
                {children}
            </main>

            <CartDrawer
                cartOpen={cartOpen}
                setCartOpen={setCartOpen}
                products={cartProducts}
                handleRemoveFromCart={handleRemoveFromCart}
                handleAddToCar={handleAddToCar}
                calculateTotal={calculateTotal}
                clearCart={clearCart}
            />
            <CartButton setCartOpen={setCartOpen} products={cartProducts} />
        </div>
    )
}
export default Layout