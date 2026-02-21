import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

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
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("increment_view_count");

    if (error) {
      return NextResponse.json({ view_count: 0 }, { status: 200 });
    }

    return NextResponse.json({ view_count: data });
  } catch {
    return NextResponse.json({ view_count: 0 }, { status: 200 });
  }
}
