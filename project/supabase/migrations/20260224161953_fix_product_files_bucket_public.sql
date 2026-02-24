/*
  # Fix product-files storage bucket - make it public

  ## Summary
  The product-files bucket was set to private, which caused images to be inaccessible
  via getPublicUrl(). This migration makes the bucket public so that image URLs work correctly.

  ## Changes
  - Updates product-files bucket to public = true
  - This allows getPublicUrl() to return valid, accessible URLs for product images and receipts

  ## Notes
  - Files are still organized by user_id folder prefix
  - RLS policies still restrict who can upload/modify/delete files
  - Only the read access is opened up (public bucket = anyone with URL can view)
*/

UPDATE storage.buckets
SET public = true
WHERE id = 'product-files';
