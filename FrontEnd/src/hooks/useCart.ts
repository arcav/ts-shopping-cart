import { useState } from 'react';
import { useQuery } from 'react-query';
import { supabase } from '../lib/supabaseClient';

const getProducts = async (): Promise<CarItemType[]> => {
    // Fetch products from Supabase with selective columns for efficiency
    const { data, error } = await supabase
        .from('products')
        .select(`
            id,
            product_id,
            productId,
            name,
            brand,
            link,
            image,
            price,
            list_price,
            listPrice,
            source_category_name,
            source_category_id,
            category_paths,
            categoryPaths
        `);

    if (error) {
        console.error('Error fetching products from Supabase:', error);
        throw error;
    }

    // Adapter logic
    const rawProducts = data || [];

    // Log first product to see structure
    if (rawProducts.length > 0) {
        console.log('🔍 First product structure:', Object.keys(rawProducts[0]));
        console.log('🔍 First product sample:', rawProducts[0]);
    }

    return rawProducts.map((p) => {
        // Extract category from paths
        // Example path: "/eletrodomesticos/lava-loucas/lava-loucas-de-piso/"
        // We want "Lava Loucas" (index 2)
        let category = p.source_category_name || 'Geral';

        const paths = p.category_paths || p.categoryPaths || [];
        if (paths.length > 0) {
            // Find a path that has enough depth
            const validPath = paths.find((path: string) => {
                // Ensure path is a string before splitting
                if (typeof path !== 'string') return false;
                const parts = path.split('/').filter(Boolean);
                return parts.length >= 2;
            });

            if (validPath) {
                const parts = validPath.split('/').filter(Boolean);
                const subCategorySlug = parts[1]; // "lava-loucas"

                // Format: "lava-loucas" -> "Lava Loucas"
                category = subCategorySlug
                    .split('-')
                    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
            }
        }

        // Apply normalization (e.g., "Microondas" -> "Micro-ondas")
        const normalized = category.toLowerCase().trim().replace(/[-\s]/g, '');
        if (normalized === 'microondas') {
            category = 'Micro-ondas';
        }


        // Try different possible ID field names
        const productId = p.product_id || p.productId || p.id || `temp-${Math.random()}`;

        return {
            id: productId,
            category: category,
            brand: p.brand || '',
            description: p.name || '',
            image: p.image || '',
            price: p.price || 0,
            listPrice: p.list_price || p.listPrice || undefined,
            title: p.name || '',
            amount: 0
        };

    });
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
        console.log('🛒 Adding to cart:', clickproduct.id, clickproduct.title);
        setCartProducts(prev => {
            const isProductInCart = prev.find(product => product.id === clickproduct.id);
            console.log('📦 Current cart:', prev.map(p => ({ id: p.id, amount: p.amount })));
            console.log('🔍 Product in cart?', isProductInCart ? 'YES' : 'NO');

            if (isProductInCart) {
                const updated = prev.map(product =>
                    product.id === clickproduct.id
                        ? { ...product, amount: product.amount + 1 }
                        : product
                );
                console.log('✅ Updated cart:', updated.map(p => ({ id: p.id, amount: p.amount })));
                return updated;
            }
            const newCart = [...prev, { ...clickproduct, amount: 1 }];
            console.log('✅ New cart:', newCart.map(p => ({ id: p.id, amount: p.amount })));
            return newCart;
        });
    };

    const handleRemoveFromCart = (id: string) => {
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

    const clearCart = () => {
        setCartProducts([]);
    };

    return {
        data,
        isLoading,
        error,
        cartProducts,
        handleAddToCar,
        handleRemoveFromCart,
        calculateTotal,
        clearCart
    };
};
