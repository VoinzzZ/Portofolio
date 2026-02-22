-- Add IP recording to page_viewers and extend increment_view_count to store it

-- Add column if not exists (safe for repeated runs)
ALTER TABLE public.page_viewers
  ADD COLUMN IF NOT EXISTS last_ip TEXT;

-- Recreate function with ip parameter (not used for dedupe, only logging)
CREATE OR REPLACE FUNCTION public.increment_view_count(
  page_id TEXT,
  viewer_id TEXT,
  ip TEXT DEFAULT NULL,
  dedupe_hours INT DEFAULT 24
)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count BIGINT;
  seen page_viewers%ROWTYPE;
BEGIN
  -- Ensure the page row exists
  INSERT INTO page_views (id, view_count)
  VALUES (increment_view_count.page_id, 0)
  ON CONFLICT (id) DO NOTHING;

  SELECT * INTO seen
  FROM page_viewers pv
  WHERE pv.page_id = increment_view_count.page_id
    AND pv.viewer_id = increment_view_count.viewer_id;

  IF NOT FOUND THEN
    INSERT INTO page_viewers (page_id, viewer_id, last_ip)
    VALUES (increment_view_count.page_id, increment_view_count.viewer_id, ip);

    UPDATE page_views
      SET view_count = view_count + 1, updated_at = now()
      WHERE id = increment_view_count.page_id
      RETURNING view_count INTO new_count;
    RETURN new_count;
  END IF;

  IF seen.last_seen < now() - (dedupe_hours || ' hours')::INTERVAL THEN
    UPDATE page_viewers pv
      SET last_seen = now(), last_ip = COALESCE(ip, pv.last_ip)
      WHERE pv.page_id = increment_view_count.page_id
        AND pv.viewer_id = increment_view_count.viewer_id;

    UPDATE page_views
      SET view_count = view_count + 1, updated_at = now()
      WHERE id = increment_view_count.page_id
      RETURNING view_count INTO new_count;
    RETURN new_count;
  END IF;

  -- Already counted recently: just refresh last_seen/ip and return current count
  UPDATE page_viewers pv
    SET last_seen = now(), last_ip = COALESCE(ip, pv.last_ip)
    WHERE pv.page_id = increment_view_count.page_id
      AND pv.viewer_id = increment_view_count.viewer_id;

  SELECT view_count INTO new_count
  FROM page_views
  WHERE id = increment_view_count.page_id;

  RETURN new_count;
END;
$$;
