import React, { useState } from 'react'
//Fetching
import axios from 'axios';
//Hooks
import { useQuery } from 'react-query'

//Components
import ProductList from './Components/Product/ProductList';

//styles
import { makeStyles } from '@material-ui/core'
import Layout from './Components/Layout/Layout';
import Card from '@material-ui/core/Card'

const useStyles = makeStyles(({
    root: {
        width: '80%',
    },

    porgress: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
}));

//EndPoint
const URL = 'https://fakestoreapi.com/products'

const getProducts = async (): Promise<CarItemType[]> => {
    const { data } = await axios.get(URL)
    return data
}

const App = () => {
    const classes = useStyles()

    const [cartProducts, setCartProducts] = useState([] as CarItemType[])
    const { data, isLoading, error } = useQuery<CarItemType[] | any>(
        'products',
        getProducts
    );

    const calculateTotal = (products: CarItemType[]) =>
        products.reduce((ack: number, product) => ack + product.amount * product.price, 0)

    const handleAddToCar = (clickproduct: CarItemType) => {
        setCartProducts(prev => {
            const isProductInCart = prev.find(product => product.id === clickproduct.id)
            if (isProductInCart) {
                return prev.map(product =>
                    product.id === clickproduct.id
                        ? { ...product, amount: product.amount + 1 } :
                        product
                )
            }
            return [...prev, { ...clickproduct, amount: 1 }]
        })
    }
    const handleRemoveFromCart = (id: number) => {
        setCartProducts(prev => (
            prev.reduce((ack, product) => {
                if (product.id === id) {
                    if (product.amount === 1) return ack;
                    return [...ack, { ...product, amount: product.amount - 1 }]

                } else {
                    return [...ack, product]
                }
            }, [] as CarItemType[])
        ))
    }
    return (
        <>
            <Layout isLoading={isLoading} error={error} cartProducts={cartProducts} handleRemoveFromCart={handleRemoveFromCart} handleAddToCar={handleAddToCar} calculateTotal={calculateTotal}>
                <h3 className="center">Ts-ShopingCart</h3>
                <Card>
                    <ProductList data={data} handleAddToCar={handleAddToCar} />
                </Card>
            </Layout>
        </>
    )
}

export default App