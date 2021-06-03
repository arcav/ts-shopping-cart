import React from 'react'
import Drawer from '@material-ui/core/Drawer'

//Cart Component
import Cart from '../../Cart/Cart'


type Props = {
    cartOpen: boolean
    setCartOpen: (arg: boolean) => void
    products: CarItemType[]
    handleRemoveFromCart: (id: number) => void
    handleAddToCar: (clickproduct: CarItemType) => void
    calculateTotal: (cartProducts: CarItemType[]) => number
}

const CartDrawer: React.FC<Props> = ({ cartOpen, setCartOpen, products, handleRemoveFromCart, handleAddToCar, calculateTotal }: Props) => {
    return (
        <Drawer
            anchor='right'
            open={cartOpen}
            onClose={() => setCartOpen(false)}
            variant="temporary"
        >
            <Cart
                cartProducts={products}
                addToCart={handleAddToCar}
                removeFromCart={handleRemoveFromCart}
                onClose={() => setCartOpen(false)}
                calculateTotal={calculateTotal}
            >
            </Cart>
        </Drawer>
    )
}
export default CartDrawer