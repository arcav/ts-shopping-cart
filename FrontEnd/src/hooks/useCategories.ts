import { useQuery } from 'react-query';
import { supabase } from '../lib/supabaseClient';

export type Category = {
    path: string;
    label: string;
    image?: string;
};

const getCategories = async (): Promise<Category[]> => {
    // 1. Fetch categories from Supabase
    const { data: catData, error: catError } = await supabase
        .from('categories')
        .select('path, label')
        .eq('parent_path', '/eletrodomesticos/')
        .order('label', { ascending: true });
    
    if (catError) {
        console.error('Error fetching categories:', catError);
        throw catError;
    }

    if (!catData) return [];

    // 2. Fetch representative images in parallel for EACH category path
    const categoriesWithImages = await Promise.all(
        catData.map(async (cat) => {
            const { data: prodData } = await supabase
                .from('products')
                .select('image')
                .contains('category_paths', [cat.path])
                .limit(1);
            
            return {
                ...cat,
                image: prodData?.[0]?.image
            };
        })
    );

    console.log('✅ Categories with Real Images:', categoriesWithImages);
    return categoriesWithImages;
};

export const useCategories = () => {
    const { data, isLoading, error } = useQuery<Category[]>(
        'categories',
        getCategories
    );

    return {
        categories: data || [],
        isLoading,
        error
    };
};
