import React from 'react'
import { Container, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from "@material-ui/core"
import CartProduct from '../CartProduct/CartProduct';
import { AddShoppingCartOutlined } from '@material-ui/icons';

//Types
type Props = {
    cartProducts: CarItemType[];
    addToCart: (clickproduct: CarItemType) => void;
    removeFromCart: (id: number) => void
    onClose: () => void
    calculateTotal: (cartProducts: CarItemType[]) => number
}

//Styles
const useStyles = makeStyles({
    btn: {
        background: "red",
        color: "white",
        marginTop: 20,
        border: "solid",
        borderWidth: 1,
        '&:hover': {
            color: "red",
            backgroundColor: "whitesmoke",
            border: "solid",
            borderWidth: 1
        }
    }
})

const Cart: React.FC<Props> = ({ cartProducts, addToCart, removeFromCart, onClose, calculateTotal }) => {
    const classes = useStyles()
    return (
        <Container>
            <IconButton
                className={classes.btn}
                onClick={() => onClose()}
            >
                <AddShoppingCartOutlined />
            </IconButton>
            <Typography variant="h4" align="center"
                style={{ marginTop: "25px" }}>
                Your Shoping Cart
            </Typography>
            {cartProducts.length === 0 ? <p>No Products in Cart</p> : null}
            {cartProducts.map(product => (
                <CartProduct
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
            <h2>Total: ${calculateTotal(cartProducts).toFixed(2)}</h2>
        </Container>
    )
}
export default Cart