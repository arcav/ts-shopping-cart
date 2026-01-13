import React, { useMemo, useCallback } from 'react'
import ProductCarousel from './ProductCarousel';

//Types
type Props = {
    data: CarItemType[] | undefined;
    handleAddToCar: (clickproduct: CarItemType) => void;
    cartProducts: CarItemType[];
    handleRemoveFromCart: (id: string) => void;
    showCategories?: boolean;
    title?: string;
}

const ProductList: React.FC<Props> = ({ 
    data, 
    handleAddToCar, 
    cartProducts, 
    handleRemoveFromCart, 
    showCategories = true,
    title = ""
}) => {

    console.log('🔄 ProductList render - Cart has:', cartProducts.length, 'items:', cartProducts.map(p => ({ id: p.id, amount: p.amount })));

    const getItemQuantity = useCallback((id: string) => {
        const found = cartProducts.find(item => item.id === id);
        const quantity = found?.amount || 0;
        return quantity;
    }, [cartProducts]);

    // Group products by category
    const groupedProducts = useMemo(() => {
        if (!data) return {};
        
        if (!showCategories) {
            return { [title]: data };
        }

        return data.reduce((groups, product) => {
            const category = product.category;
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(product);
            return groups;
        }, {} as Record<string, CarItemType[]>);
    }, [data, showCategories, title]);

    // Get sorted category names
    const categories = Object.keys(groupedProducts).sort();

    return (
        <div className="space-y-4">
            {categories.map(category => (
                <ProductCarousel
                    key={category}
                    title={showCategories ? category : title}
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