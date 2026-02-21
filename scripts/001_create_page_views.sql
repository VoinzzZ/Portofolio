-- Create the page_views table to track total portfolio views
CREATE TABLE IF NOT EXISTS public.page_views (
  id TEXT PRIMARY KEY DEFAULT 'portfolio',
  view_count BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert the initial row for the portfolio
INSERT INTO public.page_views (id, view_count)
VALUES ('portfolio', 0)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the view count (public portfolio)
CREATE POLICY "Allow public read" ON public.page_views
  FOR SELECT USING (true);

-- Create a function to increment view count safely
CREATE OR REPLACE FUNCTION public.increment_view_count(page_id TEXT)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count BIGINT;
BEGIN
  UPDATE public.page_views
  SET view_count = view_count + 1, updated_at = now()
  WHERE id = page_id
  RETURNING view_count INTO new_count;
  
  RETURN new_count;
END;
$$;
