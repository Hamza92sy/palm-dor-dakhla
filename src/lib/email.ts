export interface LeadNotification {
  name:     string
  phone:    string
  service:  string
  message:  string | null
  language: string
}

const SERVICE_LABELS: Record<string, string> = {
  accommodation: 'Hébergement',
  restaurant:    'Restaurant',
  cafe:          'Café',
  car_rental:    'Location de voiture',
}

// Fire-and-forget — caller must .catch() this.
// No-op if RESEND_API_KEY / RESEND_FROM_EMAIL / ADMIN_EMAIL are absent.
export async function sendLeadNotification(lead: LeadNotification): Promise<void> {
  const apiKey     = process.env.RESEND_API_KEY
  const fromEmail  = process.env.RESEND_FROM_EMAIL
  const adminEmail = process.env.ADMIN_EMAIL

  if (!apiKey || !fromEmail || !adminEmail) return

  const { Resend } = await import('resend')
  const resend = new Resend(apiKey)

  const serviceLabel = SERVICE_LABELS[lead.service] ?? lead.service
  const waPhone = lead.phone.replace(/\D/g, '')
  const waText  = encodeURIComponent(
    `Bonjour ${lead.name}, suite à votre demande Palm d'Or Dakhla, nous vous confirmons...`
  )
  const waUrl = `https://wa.me/${waPhone}?text=${waText}`

  await resend.emails.send({
    from:    fromEmail,
    to:      adminEmail,
    subject: `Nouvelle demande — ${serviceLabel} — ${lead.name}`,
    html: `
      <div style="font-family:sans-serif;font-size:14px;color:#1C3A28;line-height:1.7;max-width:480px;">
        <h2 style="font-size:18px;font-weight:600;margin:0 0 16px;">
          Nouvelle demande — ${serviceLabel}
        </h2>
        <table style="border-collapse:collapse;width:100%;">
          <tr>
            <td style="padding:6px 0;color:#555;width:110px;">Nom</td>
            <td style="padding:6px 0;font-weight:600;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#555;">Téléphone</td>
            <td style="padding:6px 0;font-weight:600;">${lead.phone}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#555;">Service</td>
            <td style="padding:6px 0;">${serviceLabel}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#555;">Langue</td>
            <td style="padding:6px 0;">${lead.language.toUpperCase()}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#555;vertical-align:top;">Message</td>
            <td style="padding:6px 0;">${lead.message ?? '<em style="color:#999;">—</em>'}</td>
          </tr>
        </table>
        <div style="margin-top:24px;">
          <a href="${waUrl}"
            style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;
              padding:10px 22px;border-radius:4px;font-size:13px;font-weight:600;">
            Contacter via WhatsApp
          </a>
        </div>
        <p style="margin-top:32px;font-size:11px;color:#aaa;">
          Palm d&rsquo;Or Dakhla &mdash; AV Al Walaa, Dakhla 73000
        </p>
      </div>
    `,
  })
}
