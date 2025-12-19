import React from 'react'
import { NavBar } from './NavBar/NavBar'
import CartDrawer from './Drawer/CartDrawer';
import CartButton from '../Cart/CartButton'

//Types
type Props = {
    children: React.ReactNode
    isLoading: boolean
    error: any
    cartProducts: CarItemType[]
    handleRemoveFromCart: (id: number) => void
    handleAddToCar: (clickedproduct: CarItemType) => void
    calculateTotal: (products: CarItemType[]) => number
}

const Layout = ({ children, isLoading, error, cartProducts, handleRemoveFromCart, handleAddToCar, calculateTotal }: Props) => {
    const [cartOpen, setCartOpen] = React.useState(false)

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <NavBar />

            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
                    <div className="h-full bg-indigo-600 animate-pulse"></div>
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
            />
            <CartButton setCartOpen={setCartOpen} products={cartProducts} />
        </div>
    )
}
export default Layout