"use client";

import { useEffect, useState } from "react";
import { Row, Text } from "@once-ui-system/core";

export const ViewCounter = () => {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    // Always POST - the server handles IP deduplication
    fetch("/api/views", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setViewCount(data.view_count))
      .catch(() => {
        // Fallback to GET if POST fails
        fetch("/api/views")
          .then((res) => res.json())
          .then((data) => setViewCount(data.view_count))
          .catch(() => setViewCount(0));
      });
  }, []);

  if (viewCount === null) {
    return (
      <Row gap="4" vertical="center">
        <Text variant="body-default-xs" onBackground="neutral-weak">
          Loading views...
        </Text>
      </Row>
    );
  }

  return (
    <Row gap="4" vertical="center">
      <Text variant="body-default-xs" onBackground="neutral-weak">
        {viewCount.toLocaleString()} views
      </Text>
    </Row>
  );
};
