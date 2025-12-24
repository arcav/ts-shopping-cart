const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qivsxfxzkwogksnknjab.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpdnN4Znh6a3dvZ2tzbmtuamFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MTQyNjUsImV4cCI6MjA4MTk5MDI2NX0.HtEbicAQ__tK5TWOfqvmzTdcUjMDC9LItlVqFNdWwJw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkProducts() {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(10);
    
    if (error) {
        console.error('Error:', error);
        return;
    }
    
    console.log('Products:', JSON.stringify(data, null, 2));
    
    const brands = [...new Set(data.map(p => p.brand))];
    console.log('Brands found in these 10:', brands);

    // Specifically look for Panasonic
    const { data: panasonic, error: pError } = await supabase
        .from('products')
        .select('*')
        .ilike('brand', '%Panasonic%')
        .limit(5);
    
    if (pError) console.error('Panasonic Error:', pError);
    else console.log('Panasonic Products:', JSON.stringify(panasonic, null, 2));
}

checkProducts();

