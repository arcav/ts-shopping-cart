import React from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core'


//Types
type Props = {
    product: CarItemType;
    addToCart: (clickproduct: CarItemType) => void
    removeFromCart: (id: number) => void
}

//Styles
export const useStyles = makeStyles({
    btn: {
        display: "flex",
        justifyContent: "space-between"
    },
    img: {
        maxWidth: "120px",
        objectFit: "contain",
        justifyItems: 'center',
    },
    BorderConatiner: {
        border: 'solid red 1px',
        marginBottom: '15px',
        borderRadius: "20px",
    },
})

const CartProduct: React.FC<Props> = ({ product, addToCart, removeFromCart }) => {
    const classes = useStyles()
    return (
        <Container className={classes.BorderConatiner}>
            <Typography variant='h5' align='center' gutterBottom >{product.title}</Typography>
            <Typography variant='body2' align='center' gutterBottom> Price:${product.price}</Typography>
            <Typography variant='body2' align='center' gutterBottom> Total:${(product.amount * product.price).toFixed(2)}</Typography>
            <div className={classes.btn}>
                <Button
                    color="secondary"
                    size="large"
                    variant="outlined"
                    onClick={() => removeFromCart(product.id)}>
                    -
                     </Button>
                <p>{product.amount}</p>
                <Button
                    color="secondary"
                    size="small"
                    variant="outlined"
                    onClick={() => addToCart(product)}>
                    +
             </Button>
            </div>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="25vh"
                marginBottom="20px"
            >
                <img className={classes.img} src={product.image} alt={product.title} />
            </Box>
        </Container>
    )
}
export default CartProduct