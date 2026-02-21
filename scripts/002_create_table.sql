CREATE TABLE IF NOT EXISTS public.page_views (
  id TEXT PRIMARY KEY DEFAULT 'portfolio',
  view_count BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
