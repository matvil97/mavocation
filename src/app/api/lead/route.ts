import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

  // Send emails (non-blocking — ne fait pas échouer la requête si l'email plante)
  try {
    await Promise.all([
      // Notification admin
      resend.emails.send({
        from: "Mavocation <onboarding@resend.dev>",
        to: "vilmenmatthieu@gmail.com",
        subject: `Nouveau lead – ${body.prenom} (${body.profileCode})`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;">
            <h2 style="margin:0 0 16px;color:#111">Nouveau lead Mavocation</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:8px 0;color:#666;width:120px">Prénom</td><td style="padding:8px 0;font-weight:600">${body.prenom}</td></tr>
              <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${body.email}">${body.email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#666">Téléphone</td><td style="padding:8px 0">${body.telephone || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#666">Profil RIASEC</td><td style="padding:8px 0;font-weight:700;color:#7c3aed">${body.profileCode}</td></tr>
              <tr><td style="padding:8px 0;color:#666">Métier principal</td><td style="padding:8px 0">${body.topCareer}</td></tr>
            </table>
          </div>
        `,
      }),

      // Confirmation utilisateur
      resend.emails.send({
        from: "Mavocation <onboarding@resend.dev>",
        to: body.email,
        subject: `Ton profil RIASEC ${body.profileCode} – Mavocation`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#07070f;color:#f0f0ff;border-radius:16px;">
            <div style="margin-bottom:24px;">
              <span style="font-size:18px;font-weight:900;background:linear-gradient(to right,#a78bfa,#22d3ee);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">ma</span><span style="font-size:18px;font-weight:900;color:#f0f0ff;">vocation</span>
            </div>
            <h2 style="margin:0 0 8px;color:#f0f0ff;font-size:22px;">Salut ${body.prenom} !</h2>
            <p style="color:#94a3b8;margin:0 0 24px;line-height:1.6;">On a bien reçu ta demande. Voici un récap de ton profil :</p>
            <div style="background:#1a1a2e;border:1px solid rgba(167,139,250,0.2);border-radius:12px;padding:20px;margin-bottom:24px;">
              <div style="margin-bottom:12px;">
                <p style="margin:0;font-size:11px;color:#7c3aed;text-transform:uppercase;letter-spacing:0.1em;font-weight:700;">Ton code Holland</p>
                <p style="margin:4px 0 0;font-size:36px;font-weight:900;color:#a78bfa;letter-spacing:0.05em;">${body.profileCode}</p>
              </div>
              <div>
                <p style="margin:0;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;font-weight:700;">Métier principal recommandé</p>
                <p style="margin:4px 0 0;font-size:16px;font-weight:600;color:#e2e8f0;">${body.topCareer}</p>
              </div>
            </div>
            <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0 0 16px;">Un conseiller en formation va prendre contact avec toi prochainement pour t'accompagner dans ton orientation.</p>
            <p style="color:#64748b;font-size:11px;margin:0;border-top:1px solid rgba(255,255,255,0.06);padding-top:16px;">Tu reçois cet email car tu as rempli le formulaire sur mavocation.fr. Conformément au RGPD, tu peux demander la suppression de tes données à <a href="mailto:vilmenmatthieu@gmail.com" style="color:#a78bfa;">vilmenmatthieu@gmail.com</a>.</p>
          </div>
        `,
      }),
    ]);
  } catch (emailErr) {
    console.error("[LEAD] Email error:", emailErr);
  }

  return NextResponse.json({ success: true });
}
