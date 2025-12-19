import React from 'react'
import { Product } from './Product'

//Types
type Props = {
    data: CarItemType[] | undefined;
    handleAddToCar: (clickproduct: CarItemType) => void
}

const ProductList: React.FC<Props> = ({ data, handleAddToCar }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.map(product => (
                <div key={product.id}>
                    <Product
                        product={product}
                        handleAddToCar={handleAddToCar} />
                </div>
            ))}
        </div>
    )
}
export default ProductList