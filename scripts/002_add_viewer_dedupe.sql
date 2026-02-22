-- Track per-device viewers to avoid double counting within a time window
CREATE TABLE IF NOT EXISTS public.page_viewers (
    page_id TEXT REFERENCES public.page_views (id) ON DELETE CASCADE,
    viewer_id TEXT NOT NULL,
    last_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (page_id, viewer_id)
);

-- Allow anonymous read/write since this is a public counter (adjust if needed)
ALTER TABLE public.page_viewers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow anon page_viewers" ON public.page_viewers;

CREATE POLICY "allow anon page_viewers" ON public.page_viewers FOR ALL USING (true)
WITH
    CHECK (true);

-- Update function to increment with dedupe per viewer within N hours (default 24)
CREATE OR REPLACE FUNCTION public.increment_view_count(page_id TEXT, viewer_id TEXT, dedupe_hours INT DEFAULT 24)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count BIGINT;
  seen page_viewers%ROWTYPE;
BEGIN
  SELECT * INTO seen
  FROM page_viewers
  WHERE page_id = increment_view_count.page_id
    AND viewer_id = increment_view_count.viewer_id;

  IF NOT FOUND THEN
    INSERT INTO page_viewers (page_id, viewer_id) VALUES (page_id, viewer_id);
    UPDATE page_views
      SET view_count = view_count + 1, updated_at = now()
      WHERE id = page_id
      RETURNING view_count INTO new_count;
    RETURN new_count;
  END IF;

  IF seen.last_seen < now() - (dedupe_hours || ' hours')::INTERVAL THEN
    UPDATE page_viewers
      SET last_seen = now()
      WHERE page_id = page_id AND viewer_id = viewer_id;
    UPDATE page_views
      SET view_count = view_count + 1, updated_at = now()
      WHERE id = page_id
      RETURNING view_count INTO new_count;
    RETURN new_count;
  END IF;

  -- Already counted recently: just refresh last_seen and return current count
  UPDATE page_viewers
    SET last_seen = now()
    WHERE page_id = page_id AND viewer_id = viewer_id;
  SELECT view_count INTO new_count FROM page_views WHERE id = page_id;
  RETURN new_count;
END;
$$;