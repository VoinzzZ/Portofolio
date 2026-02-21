"use client";

import { useEffect, useState } from "react";
import { Row, Text } from "@once-ui-system/core";

export const ViewCounter = () => {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("portfolio_visited");

    if (!hasVisited) {
      fetch("/api/views", { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          setViewCount(data.view_count);
          sessionStorage.setItem("portfolio_visited", "true");
        })
        .catch(() => {
          fetch("/api/views")
            .then((res) => res.json())
            .then((data) => setViewCount(data.view_count))
            .catch(() => setViewCount(0));
        });
    } else {
      fetch("/api/views")
        .then((res) => res.json())
        .then((data) => setViewCount(data.view_count))
        .catch(() => setViewCount(0));
    }
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
