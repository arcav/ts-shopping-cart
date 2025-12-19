import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

//EndPoint
const URL = 'https://fakestoreapi.com/products';

const getProducts = async (): Promise<CarItemType[]> => {
    const { data } = await axios.get(URL);
    return data;
};

export const useCart = () => {
    const [cartProducts, setCartProducts] = useState([] as CarItemType[]);

    const { data, isLoading, error } = useQuery<CarItemType[]>(
        'products',
        getProducts
    );

    const calculateTotal = (products: CarItemType[]) =>
        products.reduce((ack: number, product) => ack + product.amount * product.price, 0);

    const handleAddToCar = (clickproduct: CarItemType) => {
        setCartProducts(prev => {
            const isProductInCart = prev.find(product => product.id === clickproduct.id);
            if (isProductInCart) {
                return prev.map(product =>
                    product.id === clickproduct.id
                        ? { ...product, amount: product.amount + 1 }
                        : product
                );
            }
            return [...prev, { ...clickproduct, amount: 1 }];
        });
    };

    const handleRemoveFromCart = (id: number) => {
        setCartProducts(prev => (
            prev.reduce((ack, product) => {
                if (product.id === id) {
                    if (product.amount === 1) return ack;
                    return [...ack, { ...product, amount: product.amount - 1 }];
                } else {
                    return [...ack, product];
                }
            }, [] as CarItemType[])
        ));
    };

    return {
        data,
        isLoading,
        error,
        cartProducts,
        handleAddToCar,
        handleRemoveFromCart,
        calculateTotal
    };
};
