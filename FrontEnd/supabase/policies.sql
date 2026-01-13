-- Enable RLS on the table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Allow read access to everyone (public)
CREATE POLICY "Enable read access for all users" 
ON products FOR SELECT 
TO anon, authenticated 
USING (true);

-- Policy: Allow insert/update/delete only for authenticated users with specific role (optional)
-- Adjust 'service_role' or specific user logic as needed
CREATE POLICY "Enable write access for service role only" 
ON products FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);

-- Explanation:
-- 1. We enable RLS to secure the table by default.
-- 2. We allow public access (anon role) to SELECT (read) products, which is typical for a shop.
-- 3. We restrict modifications to the service_role (backend admin) to prevent clients from modifying prices/products.
