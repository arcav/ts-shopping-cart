import React, { useMemo, useCallback } from 'react'
import ProductCarousel from './ProductCarousel';

//Types
type Props = {
    data: CarItemType[] | undefined;
    handleAddToCar: (clickproduct: CarItemType) => void;
    cartProducts: CarItemType[];
    handleRemoveFromCart: (id: string) => void;
}

const ProductList: React.FC<Props> = ({ data, handleAddToCar, cartProducts, handleRemoveFromCart }) => {

    console.log('🔄 ProductList render - Cart has:', cartProducts.length, 'items:', cartProducts.map(p => ({ id: p.id, amount: p.amount })));

    const getItemQuantity = useCallback((id: string) => {
        const found = cartProducts.find(item => item.id === id);
        const quantity = found?.amount || 0;
        console.log(`🔍 getItemQuantity(${id}):`, quantity, '| Cart IDs:', cartProducts.map(p => p.id), '| Match:', found ? 'YES' : 'NO');
        return quantity;
    }, [cartProducts]);

    // Group products by category
    const groupedProducts = useMemo(() => {
        if (!data) return {};
        
        return data.reduce((groups, product) => {
            const category = product.category;
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(product);
            return groups;
        }, {} as Record<string, CarItemType[]>);
    }, [data]);

    // Get sorted category names
    const categories = Object.keys(groupedProducts).sort();

    return (
        <div className="space-y-4">
            {categories.map(category => (
                <ProductCarousel
                    key={category}
                    title={category}
                    products={groupedProducts[category]}
                    handleAddToCar={handleAddToCar}
                    handleRemoveFromCart={handleRemoveFromCart}
                    getItemQuantity={getItemQuantity}
                />
            ))}
            
            {/* Show fallback if no data */}
            {categories.length === 0 && !data && (
                <div className="text-center py-20 text-gray-400">
                    <p>Loading products...</p>
                </div>
            )}
        </div>
    )
}
export default ProductList