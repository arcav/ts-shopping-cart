import React from 'react'
import { NavBar } from './NavBar/NavBar'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress';
import CartDrawer from './Drawer/CartDrawer';
import CartButton from '../Cart/CartButton'

//Types
type Props = {
    children: React.ReactNode
    products: CarItemType[]
    handleRemoveFromCart: (id: number) => void
    handleAddToCar: (clickedproduct: CarItemType) => void
    calculateTotal: () => void
}

//Styles
const useStyles = makeStyles({
    root: {
        marginTop: "8rem",
        width: '85%',
    },
    spinner: {
        marginTop: "64px",
    }
})

const Layout = ({ children, isLoading, error, cartProducts, handleRemoveFromCart, handleAddToCar, calculateTotal }: Props | any) => {
    const [cartOpen, setCartOpen] = React.useState(false)
    const classes = useStyles()
    return (
        <>
            {isLoading && <LinearProgress color="secondary" className={classes.spinner} />}
            {error && <h3>Algo salio mal</h3>}
            <CartDrawer
                cartOpen={cartOpen}
                setCartOpen={setCartOpen}
                products={cartProducts}
                handleRemoveFromCart={handleRemoveFromCart}
                handleAddToCar={handleAddToCar}
                calculateTotal={calculateTotal}
            />
            <CartButton setCartOpen={setCartOpen} products={cartProducts} />
            <Container className={classes.root}>
                {children}
            </Container>
        </>
    )
}
export default Layout