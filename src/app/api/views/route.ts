import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

function getVisitorIp(headersList: Headers): string {
  // Vercel sets x-forwarded-for automatically
  const forwarded = headersList.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
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

    const supabase = await createClient();
    const { data, error } = await supabase.rpc("increment_view_count", {
      visitor_ip: visitorIp,
    });

    if (error) {
      // Fallback: just return current count
      const { data: fallback } = await supabase
        .from("page_views")
        .select("view_count")
        .eq("id", "portfolio")
        .single();
      return NextResponse.json(
        { view_count: fallback?.view_count ?? 0 },
        { status: 200 }
      );
    }

    return NextResponse.json({ view_count: data });
  } catch {
    return NextResponse.json({ view_count: 0 }, { status: 200 });
  }
}
