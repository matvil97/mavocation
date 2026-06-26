import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface LeadPayload {
  prenom: string;
  email: string;
  telephone?: string;
  profileCode: string;
  topCareer: string;
}

export async function POST(req: NextRequest) {
  const body: LeadPayload = await req.json();

  if (!body.prenom || !body.email || !body.profileCode) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await supabase.from("leads").insert([
    {
      prenom: body.prenom,
      email: body.email,
      telephone: body.telephone ?? null,
      profile_code: body.profileCode,
      top_career: body.topCareer,
    },
  ]);

  if (error) {
    console.error("[LEAD] Supabase error:", error.message);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
