import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { AddShoppingCartOutlined } from '@material-ui/icons';
import Badge from '@material-ui/core/Badge'
import { makeStyles } from '@material-ui/core'

//Types
type Props = {
    setCartOpen: (arg: boolean) => void,
    products: CarItemType[]
}

//Styles
const useStyles = makeStyles({
    btn: {
        background: "red",
        color: "white",
        marginTop: 20,

        border: "solid",
        borderWidth: 1,
        position: "fixed",
        '&:hover': {
            color: "red",
            backgroundColor: "whitesmoke",
            border: "solid",
            borderWidth: 1
        }
    },
})

const CartButton = ({ setCartOpen, products }: Props) => {
    const classes = useStyles()

    const getTotalProducts = (products: CarItemType[]) =>
        products.reduce((ack: number, product) => ack + product.amount, 0)

    return (
        <IconButton className={classes.btn} onClick={() => setCartOpen(true)} >
            <Badge badgeContent={getTotalProducts(products)} color='primary'>
                <AddShoppingCartOutlined />
            </Badge>
        </IconButton>
    )
}
export default CartButton
