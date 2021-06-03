import React from 'react'
import { Product } from './Product'
import Grid from '@material-ui/core/Grid'

//Types
type Props = {
    data: CarItemType[];
    handleAddToCar: (clickproduct: CarItemType) => void 
}

const ProductList: React.FC<Props> = ({ data, handleAddToCar}) => {
    return (
        <>
            <Grid container spacing={3}>
                {data?.map(product => (
                    <Grid item
                        key={product.id}
                        xs={12} sm={6} md={4} lg={3}>
                        <Product
                            product={product}
                            handleAddToCar={handleAddToCar} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}
export default ProductList