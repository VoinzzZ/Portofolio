import { createClient } from "@/lib/supabase/server";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

function getVisitorIp(headersList: Headers): string {
  const forwarded = headersList.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  const realIp = headersList.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "unknown";
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("page_views")
      .select("view_count")
      .eq("id", "portfolio")
      .single();

    if (error) {
      return NextResponse.json({ view_count: 0 }, { status: 200 });
    }

    return NextResponse.json({ view_count: data.view_count });
  } catch {
    return NextResponse.json({ view_count: 0 }, { status: 200 });
  }
}

export async function POST() {
  try {
    const headersList = await headers();
    const visitorIp = getVisitorIp(headersList);
    const cookieStore = await cookies();
    let viewerId = cookieStore.get("viewer_id")?.value;
    const shouldSetCookie = !viewerId;

    if (!viewerId) {
      viewerId = randomUUID();
    }

    const supabase = await createClient();
    const { data, error } = await supabase.rpc("increment_view_count", {
      page_id: "portfolio",
      viewer_id: viewerId,
      ip: visitorIp,
    });

    // If increment failed, log and fall back to the current count
    const fallbackCount =
      (
        await supabase
          .from("page_views")
          .select("view_count")
          .eq("id", "portfolio")
          .single()
      ).data?.view_count ?? 0;

    if (error) {
      console.error("[api/views] increment_view_count failed:", error);
    }

    const viewCount = error ? fallbackCount : data ?? fallbackCount;

    const response = NextResponse.json({ view_count: viewCount }, { status: 200 });

    if (shouldSetCookie && viewerId) {
      response.cookies.set("viewer_id", viewerId, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 180, // 180 days
        path: "/",
      });
    }

    return response;
  } catch {
    return NextResponse.json({ view_count: 0 }, { status: 200 });
  }
}
