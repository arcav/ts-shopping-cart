const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qivsxfxzkwogksnknjab.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpdnN4Znh6a3dvZ2tzbmtuamFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MTQyNjUsImV4cCI6MjA4MTk5MDI2NX0.HtEbicAQ__tK5TWOfqvmzTdcUjMDC9LItlVqFNdWwJw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkCategoryPaths() {
    const { data: catData } = await supabase
        .from('categories')
        .select('path, label')
        .eq('parent_path', '/eletrodomesticos/');
    
    console.log('Category Paths:', JSON.stringify(catData, null, 2));
}

checkCategoryPaths();
