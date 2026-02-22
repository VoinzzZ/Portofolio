import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

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
    const cookieStore = cookies();
    let viewerId = cookieStore.get("viewer_id")?.value;
    const shouldSetCookie = !viewerId;

    if (!viewerId) {
      viewerId = randomUUID();
    }

    const supabase = await createClient();
    const { data, error } = await supabase.rpc("increment_view_count", {
      page_id: "portfolio",
      viewer_id: viewerId,
    });

    // If increment failed, fall back to the current count
    const viewCount = error
      ? (
          (await supabase
            .from("page_views")
            .select("view_count")
            .eq("id", "portfolio")
            .single())
          ).data?.view_count ?? 0
      : data ?? 0;

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
