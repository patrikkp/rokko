/*
  # Fix RLS Performance, Unused Indexes, and Function Security

  1. RLS Policy Optimization
    - Replace `auth.uid()` with `(select auth.uid())` in all policies on:
      - public.profiles (view, insert, update)
      - public.products (view, insert, update, delete)
      - public.claim_logs (view, insert, update, delete)
    - This prevents re-evaluation of auth functions per row, improving query performance at scale

  2. Remove Unused Indexes
    - Drop unused indexes on products and claim_logs tables

  3. Fix Function Search Path
    - Set explicit search_path on update_updated_at_column and handle_new_user
    - Prevents search path injection attacks
*/

-- ============================================================
-- 1. FIX RLS POLICIES: profiles
-- ============================================================
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = (select auth.uid()));

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = (select auth.uid()));

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = (select auth.uid()))
  WITH CHECK (id = (select auth.uid()));

-- ============================================================
-- 2. FIX RLS POLICIES: products
-- ============================================================
DROP POLICY IF EXISTS "Users can view own products" ON public.products;
DROP POLICY IF EXISTS "Users can insert own products" ON public.products;
DROP POLICY IF EXISTS "Users can update own products" ON public.products;
DROP POLICY IF EXISTS "Users can delete own products" ON public.products;

CREATE POLICY "Users can view own products"
  ON public.products FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own products"
  ON public.products FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own products"
  ON public.products FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can delete own products"
  ON public.products FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- ============================================================
-- 3. FIX RLS POLICIES: claim_logs
-- ============================================================
DROP POLICY IF EXISTS "Users can view own claim logs" ON public.claim_logs;
DROP POLICY IF EXISTS "Users can insert own claim logs" ON public.claim_logs;
DROP POLICY IF EXISTS "Users can update own claim logs" ON public.claim_logs;
DROP POLICY IF EXISTS "Users can delete own claim logs" ON public.claim_logs;

CREATE POLICY "Users can view own claim logs"
  ON public.claim_logs FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own claim logs"
  ON public.claim_logs FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own claim logs"
  ON public.claim_logs FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can delete own claim logs"
  ON public.claim_logs FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- ============================================================
-- 4. DROP UNUSED INDEXES
-- ============================================================
DROP INDEX IF EXISTS public.products_category_id_idx;
DROP INDEX IF EXISTS public.products_purchase_date_idx;
DROP INDEX IF EXISTS public.claim_logs_product_id_idx;
DROP INDEX IF EXISTS public.claim_logs_user_id_idx;

-- ============================================================
-- 5. FIX FUNCTION SEARCH PATH
-- ============================================================
ALTER FUNCTION public.update_updated_at_column()
  SET search_path = public, pg_temp;

ALTER FUNCTION public.handle_new_user()
  SET search_path = public, pg_temp;
