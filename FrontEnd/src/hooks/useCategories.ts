import { useQuery } from 'react-query';
import { supabase } from '../lib/supabaseClient';

export type Category = {
    path: string; // Combined paths separated by |
    paths: string[];
    label: string;
    image?: string;
};


const getCategories = async (): Promise<Category[]> => {
    // 1. Fetch categories from Supabase
    const { data: catData, error: catError } = await supabase
        .from('categories')
        .select('path, label')
        .eq('level', 2) // Level 2 are the subcategories we usually show (like Geladeiras, Fogões, etc)
        .order('label', { ascending: true });

    
    if (catError) {
        console.error('Error fetching categories:', catError);
        throw catError;
    }

    if (!catData) return [];

    // 2. Normalize and merge categories with similar labels
    // Example: "Microondas" and "Micro Ondas" -> "Micro-ondas"
    const normalizeLabel = (label: string) => {
        const lower = label.toLowerCase().trim().replace(/[-\s]/g, '');
        if (lower === 'microondas') return 'Micro-ondas';
        // Add more normalizations here if needed
        return label;
    };

    const mergedMap = new Map<string, { label: string; paths: string[] }>();
    
    catData.forEach(cat => {
        const normalized = normalizeLabel(cat.label);
        if (mergedMap.has(normalized)) {
            mergedMap.get(normalized)!.paths.push(cat.path);
        } else {
            mergedMap.set(normalized, { label: normalized, paths: [cat.path] });
        }
    });

    const uniqueCategories = Array.from(mergedMap.values());

    // 3. Fetch representative images in parallel for merged categories
    const categoriesWithImages = await Promise.all(
        uniqueCategories.map(async (cat) => {
            // Try to find a product image from ANY of the merged paths
            const { data: prodData } = await supabase
                .from('products')
                .select('image')
                .or(cat.paths.map(path => `category_paths.cs.{"${path}"}`).join(','))
                .limit(1);
            
            return {
                label: cat.label,
                path: cat.paths.join('|'), // Pass all paths joined by |
                paths: cat.paths,
                image: prodData?.[0]?.image
            };
        })
    );

    console.log('✅ Normalized Categories:', categoriesWithImages);
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
