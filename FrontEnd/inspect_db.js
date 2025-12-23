const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qivsxfxzkwogksnknjab.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpdnN4Znh6a3dvZ2tzbmtuamFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MTQyNjUsImV4cCI6MjA4MTk5MDI2NX0.HtEbicAQ__tK5TWOfqvmzTdcUjMDC9LItlVqFNdWwJw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkCategories() {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('parent_path', '/eletrodomesticos/')
        .limit(5);
    
    if (error) {
        console.error('Error:', error);
        return;
    }
    
    console.log('Categories:', JSON.stringify(data, null, 2));
}

checkCategories();
