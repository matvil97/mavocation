import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface CareerSummary {
  title: string;
  hollandCode: string;
  sector: string;
  description: string;
  avgSalary: string;
}

interface LeadPayload {
  prenom: string;
  email: string;
  telephone?: string;
  profileCode: string;
  topCareer: string;
  dominants?: string[];
  normalizedScores?: Record<string, number>;
  careers?: CareerSummary[];
}

const DIM_LABELS: Record<string, string> = {
  R: "Réaliste", I: "Investigateur", A: "Artistique",
  S: "Social", E: "Entreprenant", C: "Conventionnel",
};

const DIM_DESCRIPTIONS: Record<string, string> = {
  R: "Tu aimes travailler avec tes mains, les outils, la technique concrète. Tu préfères les résultats tangibles aux théories abstraites.",
  I: "Tu aimes analyser, comprendre, résoudre des problèmes complexes. La curiosité intellectuelle est ton moteur.",
  A: "Tu as besoin de créer, d'exprimer, d'innover. La routine t'étouffe — tu cherches l'originalité.",
  S: "Tu t'épanouis en aidant, enseignant, accompagnant les autres. Les relations humaines sont au cœur de ton travail idéal.",
  E: "Tu aimes diriger, convaincre, prendre des initiatives. Tu es à l'aise pour vendre des idées et mener des projets.",
  C: "Tu aimes organiser, structurer, gérer avec précision. L'ordre et la méthode te rassurent et t'efficacent.",
};

const DIM_COLORS: Record<string, string> = {
  R: "#f97316", I: "#3b82f6", A: "#a855f7",
  S: "#10b981", E: "#ef4444", C: "#f59e0b",
};

function buildUserEmail(body: LeadPayload): string {
  const { prenom, profileCode, dominants = [], normalizedScores = {}, careers = [] } = body;

  const sortedDims = Object.entries(normalizedScores).sort(([, a], [, b]) => b - a);

  const traitsHtml = dominants.map((dim, i) => `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
      <tr>
        <td style="width:36px;vertical-align:top;padding-right:12px;">
          <div style="width:28px;height:28px;border-radius:8px;background:${DIM_COLORS[dim] ?? "#7c3aed"};text-align:center;line-height:28px;font-size:13px;font-weight:900;color:#fff;font-family:monospace;">${dim}</div>
        </td>
        <td style="vertical-align:top;">
          <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#f0f0ff;">${DIM_LABELS[dim] ?? dim}${i === 0 ? "&nbsp;<span style=\"font-size:10px;font-weight:700;color:#7c3aed;background:rgba(124,58,237,0.15);padding:2px 8px;border-radius:10px;\">DOMINANT</span>" : ""}</p>
          <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;">${DIM_DESCRIPTIONS[dim] ?? ""}</p>
        </td>
      </tr>
    </table>
  `).join("");

  const barsHtml = sortedDims.map(([dim, pct]) => {
    const filled = Math.round(pct * 2); // 200px total
    const empty = 200 - filled;
    return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
      <tr>
        <td style="width:20px;font-family:monospace;font-size:12px;font-weight:700;color:#64748b;padding-right:10px;vertical-align:middle;">${dim}</td>
        <td style="vertical-align:middle;">
          <table cellpadding="0" cellspacing="0" style="border-radius:4px;overflow:hidden;background:rgba(255,255,255,0.06);">
            <tr>
              <td style="background:${DIM_COLORS[dim] ?? "#7c3aed"};height:8px;width:${filled}px;${filled > 0 ? "" : "display:none;"}"></td>
              <td style="height:8px;width:${empty}px;${empty > 0 ? "" : "display:none;"}"></td>
            </tr>
          </table>
        </td>
        <td style="width:36px;text-align:right;font-family:monospace;font-size:12px;color:#64748b;padding-left:10px;vertical-align:middle;">${pct}%</td>
      </tr>
    </table>
  `;}).join("");

  const careersHtml = careers.map((career, i) => `
    <div style="background:${i === 0 ? "rgba(124,58,237,0.07)" : "rgba(255,255,255,0.03)"};border:1px solid ${i === 0 ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.06)"};border-radius:12px;padding:16px;margin-bottom:12px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
        <tr>
          <td style="vertical-align:top;">
            ${i === 0 ? `<p style="margin:0 0 2px;font-size:10px;font-weight:700;color:#7c3aed;letter-spacing:0.1em;text-transform:uppercase;">Meilleure correspondance</p>` : ""}
            <p style="margin:0;font-size:15px;font-weight:700;color:#f0f0ff;">${career.title}</p>
            <p style="margin:2px 0 0;font-size:12px;color:#64748b;">${career.sector}</p>
          </td>
          <td style="width:64px;text-align:right;vertical-align:top;">
            <span style="font-family:monospace;font-size:11px;font-weight:700;color:#7c3aed;background:rgba(124,58,237,0.1);border:1px solid rgba(124,58,237,0.25);padding:3px 8px;border-radius:6px;display:inline-block;">${career.hollandCode}</span>
          </td>
        </tr>
      </table>
      <p style="margin:0 0 10px;font-size:13px;color:#94a3b8;line-height:1.6;">${career.description}</p>
      <span style="font-size:12px;font-weight:600;color:#10b981;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);padding:4px 10px;border-radius:8px;display:inline-block;">${career.avgSalary}</span>
    </div>
  `).join("");

  return `
<div style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#07070f;color:#f0f0ff;max-width:560px;margin:0 auto;border-radius:16px;overflow:hidden;">

  <div style="padding:20px 28px;border-bottom:1px solid rgba(255,255,255,0.06);">
    <span style="font-size:18px;font-weight:900;color:#a78bfa;">ma</span><span style="font-size:18px;font-weight:900;color:#f0f0ff;">vocation</span>
  </div>

  <div style="padding:32px 28px;text-align:center;background:linear-gradient(135deg,rgba(124,58,237,0.1) 0%,rgba(8,145,178,0.05) 100%);border-bottom:1px solid rgba(255,255,255,0.06);">
    <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#7c3aed;letter-spacing:0.15em;text-transform:uppercase;">Ton code Holland</p>
    <div style="font-size:60px;font-weight:900;letter-spacing:0.15em;color:#a78bfa;margin:4px 0;font-family:monospace;">${profileCode}</div>
    <p style="margin:0 0 16px;font-size:13px;color:#64748b;">${dominants.map(d => DIM_LABELS[d] ?? d).join(" · ")}</p>
    <p style="margin:0;font-size:15px;color:#94a3b8;">Salut <strong style="color:#f0f0ff;">${prenom}</strong> ! Voici ton analyse complète.</p>
  </div>

  <div style="padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.06);">
    <p style="margin:0 0 16px;font-size:11px;font-weight:700;color:#475569;letter-spacing:0.15em;text-transform:uppercase;">Tes traits dominants</p>
    ${traitsHtml}
  </div>

  <div style="padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.06);">
    <p style="margin:0 0 16px;font-size:11px;font-weight:700;color:#475569;letter-spacing:0.15em;text-transform:uppercase;">Spectre des 6 dimensions</p>
    ${barsHtml}
  </div>

  <div style="padding:24px 28px;border-bottom:1px solid rgba(255,255,255,0.06);">
    <p style="margin:0 0 16px;font-size:11px;font-weight:700;color:#475569;letter-spacing:0.15em;text-transform:uppercase;">Métiers compatibles avec ton profil</p>
    ${careersHtml}
  </div>

  <div style="padding:24px 28px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06);">
    <p style="margin:0 0 16px;font-size:14px;color:#94a3b8;line-height:1.6;">Un conseiller va prendre contact avec toi prochainement pour t&apos;accompagner dans ton orientation.</p>
    <a href="https://mavocation.vercel.app/quiz" style="display:inline-block;padding:12px 28px;background:linear-gradient(to right,#7c3aed,#0891b2);color:#fff;font-weight:700;font-size:14px;text-decoration:none;border-radius:12px;">Refaire le quiz →</a>
  </div>

  <div style="padding:20px 28px;">
    <p style="margin:0;font-size:11px;color:#334155;line-height:1.6;">Tu reçois cet email car tu as rempli le formulaire sur mavocation. Conformément au RGPD, tu peux demander la suppression de tes données à <a href="mailto:vilmenmatthieu@gmail.com" style="color:#7c3aed;">vilmenmatthieu@gmail.com</a>.</p>
  </div>

</div>`;
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

  try {
    const sortedDims = Object.entries(body.normalizedScores ?? {})
      .sort(([, a], [, b]) => b - a)
      .map(([dim, pct]) => `${dim} ${pct}%`)
      .join(" · ");

    await Promise.all([
      resend.emails.send({
        from: "Mavocation <onboarding@resend.dev>",
        to: "vilmenmatthieu@gmail.com",
        subject: `Nouveau lead – ${body.prenom} (${body.profileCode})`,
        html: `
          <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;">
            <h2 style="margin:0 0 16px;color:#111;">Nouveau lead Mavocation</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:6px 0;color:#666;width:120px;">Prénom</td><td style="padding:6px 0;font-weight:600;">${body.prenom}</td></tr>
              <tr><td style="padding:6px 0;color:#666;">Email</td><td style="padding:6px 0;"><a href="mailto:${body.email}">${body.email}</a></td></tr>
              <tr><td style="padding:6px 0;color:#666;">Téléphone</td><td style="padding:6px 0;">${body.telephone || "—"}</td></tr>
              <tr><td style="padding:6px 0;color:#666;">Code RIASEC</td><td style="padding:6px 0;font-weight:700;color:#7c3aed;">${body.profileCode}</td></tr>
              <tr><td style="padding:6px 0;color:#666;">Scores</td><td style="padding:6px 0;font-size:13px;">${sortedDims}</td></tr>
              <tr><td style="padding:6px 0;color:#666;">Métier principal</td><td style="padding:6px 0;">${body.topCareer}</td></tr>
            </table>
          </div>
        `,
      }),

      resend.emails.send({
        from: "Mavocation <onboarding@resend.dev>",
        to: body.email,
        subject: `Ton profil RIASEC ${body.profileCode} – Mavocation`,
        html: buildUserEmail(body),
      }),
    ]);
  } catch (emailErr) {
    console.error("[LEAD] Email error:", emailErr);
  }

  return NextResponse.json({ success: true });
}
