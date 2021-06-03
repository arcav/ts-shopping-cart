import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';

//Types
type Props = {
    product: CarItemType;
    handleAddToCar: (clickedproduct: CarItemType) => void
}

//Styles
const useStyles = makeStyles({
    card: {
        height: 320
    },
    media: {
        marginTop: 15,
        height: 150,
        backgroundSize: "contain",
    },
    btn: {
        marginLeft: "10px",
    }
});

export const Product: React.FC<Props> = ({ product, handleAddToCar }) => {
    const classes = useStyles()
    return (
        <>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia className={classes.media}
                        image={product.image}
                    />
                    <Container >
                        <div style={{ height: "4rem", marginTop: "2rem" }}>
                            <Typography
                                gutterBottom
                                variant="body2"
                            >
                                {product.title}
                            </Typography>
                        </div>
                    </Container>
                </CardActionArea>
                <Button className={classes.btn}
                    size="small"
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleAddToCar(product)}>
                    Add To Cart
           </Button>
            </Card>
        </>
    )
}