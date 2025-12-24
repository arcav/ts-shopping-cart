import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import ProductList from '../../Components/Product/ProductList';
import { useCartContext } from '../../context/CartContext';
import { supabase } from '../../lib/supabaseClient';

type ElectroluxProduct = {
    product_id?: string;
    productId?: string;
    id?: string;
    name: string;
    brand: string;
    link: string;
    image: string;
    price: number;
    list_price?: number;
    listPrice?: number;
    source_category_name?: string;
    source_category_id?: number;
    sourceCategory?: {
        categoryName: string;
    };
    category_paths?: string[];
    categoryPaths?: string[];
};

const CategoryPage: React.FC = () => {
    const location = useLocation();
    const history = useHistory();
    const { cartProducts, handleAddToCar, handleRemoveFromCart } = useCartContext();
    
    // Get path from query params
    const queryParams = new URLSearchParams(location.search);
    const categoryPath = queryParams.get('path') || '';

    // Fetch products filtered by category paths
    const { data: rawProducts, isLoading } = useQuery<ElectroluxProduct[]>(
        ['category-products', categoryPath],
        async () => {
            if (!categoryPath) return [];
            
            // Decodificamos la ruta para manejar caracteres como '|' (%7C)
            const decodedPath = decodeURIComponent(categoryPath);
            const paths = decodedPath.split('|');
            
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .or(paths.map(p => `category_paths.cs.{"${p}"}`).join(','));

            
            if (error) {
                console.error('Error fetching category products:', error);
                throw error;
            }
            
            return data || [];
        },

        {
            enabled: !!categoryPath
        }
    );

    // Transform to CarItemType
    const products: CarItemType[] = rawProducts?.map((p) => {
        const productId = p.product_id || p.productId || p.id || `temp-${Math.random()}`;
        
        let category = p.source_category_name || p.sourceCategory?.categoryName || 'Geral';
        const normalized = category.toLowerCase().trim().replace(/[-\s]/g, '');
        if (normalized === 'microondas') {
            category = 'Micro-ondas';
        }

        return {
            id: productId,
            category: category,
            brand: p.brand,
            description: p.name,
            image: p.image,
            price: p.price,
            listPrice: p.list_price || p.listPrice,
            title: p.name,
            amount: 0
        };
    }) || [];


    // Extract and normalize category label from path
    const categoryLabel = React.useMemo(() => {
        if (!categoryPath) return 'Category';
        
        const firstPath = categoryPath.split('|')[0];
        const rawLabel = firstPath.split('/').filter(Boolean).pop()?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Category';
        
        const normalized = rawLabel.toLowerCase().trim().replace(/[-\s]/g, '');
        if (normalized === 'microondas') return 'Micro-ondas';
        return rawLabel;
    }, [categoryPath]);


    if (isLoading) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <button 
                onClick={() => history.goBack()}
                className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-6 transition-colors"
            >
                <ArrowLeftIcon className="h-5 w-5" />
                <span>Back</span>
            </button>

            <h1 className="text-xl md:text-3xl font-bold text-gray-900 capitalize mb-4 md:mb-8 border-b pb-4">

                {categoryLabel}
            </h1>

            {!products || products.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl">
                    <p className="text-xl text-gray-500">No products found in this category.</p>
                </div>
            ) : (
                <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
                    <ProductList
                        data={products}
                        handleAddToCar={handleAddToCar}
                        cartProducts={cartProducts}
                        handleRemoveFromCart={handleRemoveFromCart}
                        showCategories={false}
                        title=""
                    />
                </div>

            )}
        </div>
    );
};

export default CategoryPage;
