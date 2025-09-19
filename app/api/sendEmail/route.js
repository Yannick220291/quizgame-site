// app/api/sendEmail/route.js
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    let name, email, message;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      name = body.name;
      email = body.email || null; // peut être null si c’est une note étoile
      message = body.message;
    } else {
      const formData = await req.formData();
      name = formData.get("name");
      email = formData.get("email") || null;
      message = formData.get("message");
    }

    // ✅ validation : au moins nom + message
    if (!name || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Nom et message sont requis.",
        }),
        { status: 400 }
      );
    }

    // 🚀 Config transporteur Gmail (mot de passe d’application recommandé)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 🎯 Déterminer si c’est une note ou un message normal
    const isStarNote = name.includes("Évaluation utilisateur") || message.includes("étoile");

    const subject = isStarNote
      ? `⭐ Nouvelle note d’un utilisateur`
      : `📩 Nouveau message de ${name}`;

    // 📧 Construire le contenu de l’email
    let html = `<p><strong>Nom:</strong> ${escapeHtml(name)}</p>`;
    if (email) {
      html += `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`;
    }
    html += `<p><strong>Message:</strong><br/>${escapeHtml(message).replace(
      /\n/g,
      "<br/>"
    )}</p>`;

    const mailOptions = {
      from: email || process.env.SMTP_USER, // si étoile => ton adresse
      to: process.env.SMTP_USER,
      subject,
      html,
    };

    // 📤 Envoyer
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Erreur sendEmail route:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Erreur serveur",
      }),
      { status: 500 }
    );
  }
}

// 🔒 Échapper HTML
function escapeHtml(unsafe) {
  return String(unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}




