/*
  # Create storage bucket for product files

  ## Summary
  Creates a Supabase Storage bucket called "product-files" for storing:
  - Product photos (image_url)
  - Receipt images/PDFs (receipt_url)

  ## Security
  - Bucket is private (not public)
  - RLS policies allow authenticated users to manage only their own files
  - Files are organized by user_id prefix: {user_id}/{filename}
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-files',
  'product-files',
  false,
  10485760,
  ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/heic','application/pdf']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users can upload their own product files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-files' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can view their own product files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'product-files' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can update their own product files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product-files' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'product-files' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can delete their own product files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-files' AND (storage.foldername(name))[1] = auth.uid()::text);
