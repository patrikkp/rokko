
/*
  # Garant - Warranty Tracker Initial Schema

  ## Overview
  Initial database schema for Garant, an EU-focused warranty tracking application
  tailored for Croatian/Balkan markets.

  ## New Tables

  ### 1. profiles
  Extended user profile data linked to auth.users.
  - id: UUID (matches auth.users id)
  - full_name, avatar_url: User display info
  - currency: Preferred currency (EUR default for EU)
  - language: UI language preference (hr, bs, sr, en)

  ### 2. categories
  Product categories with Croatian translations and icons.
  Pre-seeded with common categories.
  - id, name (EN), name_hr (Croatian), icon, color

  ### 3. products
  Core warranty tracking records.
  - Basic: name, brand, model, serial_number
  - Purchase: purchase_date, purchase_price, currency, retailer info
  - Warranty: warranty_months (commercial), eu_statutory (always 24 per EU law)
  - Docs: receipt_url, manual_url, image_url
  - QR/Transfer: qr_code, is_transferred, transfer_date

  ### 4. claim_logs
  Track warranty claim attempts and outcomes.
  - product_id, title, description, status, resolution

  ## Security
  - RLS enabled on all tables
  - Users can only access their own data
  - Categories are publicly readable (no user data)
*/

-- CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_hr text NOT NULL,
  icon text NOT NULL DEFAULT 'package',
  color text NOT NULL DEFAULT '#3b82f6',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are publicly readable"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Seed categories
INSERT INTO categories (name, name_hr, icon, color) VALUES
  ('Electronics', 'Elektronika', 'smartphone', '#3b82f6'),
  ('Home Appliances', 'Kućanski aparati', 'home', '#06b6d4'),
  ('TV & Audio', 'TV i Audio', 'tv', '#8b5cf6'),
  ('Computers', 'Računala', 'laptop', '#6366f1'),
  ('Vehicles', 'Vozila', 'car', '#ef4444'),
  ('Tools & DIY', 'Alati i DIY', 'wrench', '#f97316'),
  ('Sporting Goods', 'Sportska oprema', 'activity', '#22c55e'),
  ('Furniture', 'Namještaj', 'armchair', '#a16207'),
  ('Clothing & Shoes', 'Odjeća i obuća', 'shirt', '#ec4899'),
  ('Toys', 'Igračke', 'gamepad-2', '#f59e0b'),
  ('Kitchen', 'Kuhinja', 'utensils', '#10b981'),
  ('Other', 'Ostalo', 'package', '#94a3b8')
ON CONFLICT DO NOTHING;

-- PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  currency text NOT NULL DEFAULT 'EUR',
  language text NOT NULL DEFAULT 'hr',
  notification_days integer[] DEFAULT ARRAY[90, 30, 7],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id uuid REFERENCES categories(id),

  -- Product info
  name text NOT NULL,
  brand text,
  model text,
  serial_number text,

  -- Purchase info
  purchase_date date NOT NULL,
  purchase_price numeric(12, 2),
  currency text NOT NULL DEFAULT 'EUR',
  retailer_name text,
  retailer_phone text,
  retailer_email text,
  retailer_website text,

  -- Warranty info
  warranty_months integer NOT NULL DEFAULT 24,
  eu_statutory_months integer NOT NULL DEFAULT 24,
  notes text,

  -- Documents
  receipt_url text,
  manual_url text,
  image_url text,

  -- Transfer tracking (for second-hand)
  is_transferred boolean NOT NULL DEFAULT false,
  transfer_date date,
  transfer_buyer_name text,

  -- Status
  is_active boolean NOT NULL DEFAULT true,

  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own products"
  ON products FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own products"
  ON products FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own products"
  ON products FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- CLAIM LOGS TABLE
CREATE TABLE IF NOT EXISTS claim_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'in_review', 'approved', 'rejected', 'resolved')),
  resolution text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE claim_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own claim logs"
  ON claim_logs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own claim logs"
  ON claim_logs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own claim logs"
  ON claim_logs FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own claim logs"
  ON claim_logs FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS products_user_id_idx ON products(user_id);
CREATE INDEX IF NOT EXISTS products_category_id_idx ON products(category_id);
CREATE INDEX IF NOT EXISTS products_purchase_date_idx ON products(purchase_date);
CREATE INDEX IF NOT EXISTS claim_logs_product_id_idx ON claim_logs(product_id);
CREATE INDEX IF NOT EXISTS claim_logs_user_id_idx ON claim_logs(user_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_claim_logs_updated_at BEFORE UPDATE ON claim_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
