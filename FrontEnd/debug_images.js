const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qivsxfxzkwogksnknjab.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpdnN4Znh6a3dvZ2tzbmtuamFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MTQyNjUsImV4cCI6MjA4MTk5MDI2NX0.HtEbicAQ__tK5TWOfqvmzTdcUjMDC9LItlVqFNdWwJw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function debugMapping() {
    // Get categories
    const { data: catData } = await supabase
        .from('categories')
        .select('label')
        .eq('parent_path', '/eletrodomesticos/');
    
    console.log('Category Labels:', catData.map(c => c.label));

    // Get a sample of product category names
    const { data: prodData } = await supabase
        .from('products')
        .select('source_category_name')
        .limit(20);
    
    console.log('Sample Product Category Names:', [...new Set(prodData.map(p => p.source_category_name))]);

    // Try a specific match
    if (catData && catData.length > 0) {
        const firstLabel = catData[0].label;
        const { data: matchData } = await supabase
            .from('products')
            .select('image')
            .eq('source_category_name', firstLabel)
            .limit(1);
        console.log(`Matching images for "${firstLabel}":`, matchData);
    }
}

debugMapping();
