export interface LeadNotification {
  name:            string
  phone:           string
  service:         string
  message:         string | null
  language:        string
  check_in?:       string | null
  check_out?:      string | null
  apartment_type?: string | null
}

const SERVICE_LABELS: Record<string, string> = {
  accommodation: 'Hébergement',
  restaurant:    'Restaurant',
  cafe:          'Café',
  car_rental:    'Location de voiture',
}

const APARTMENT_LABELS: Record<string, string> = {
  'standard':        'Standard (500 DH/nuit)',
  '2-chambres':      '2 Chambres (650 DH/nuit)',
  'grande-capacite': 'Grande capacité (750 DH/nuit)',
}

// Fire-and-forget — caller must .catch() this.
// No-op if RESEND_API_KEY / RESEND_FROM_EMAIL / ADMIN_EMAIL are absent.
export async function sendLeadNotification(lead: LeadNotification): Promise<void> {
  const apiKey     = process.env.RESEND_API_KEY
  const fromEmail  = process.env.RESEND_FROM_EMAIL
  const adminEmail = process.env.ADMIN_EMAIL

  if (!apiKey || !fromEmail || !adminEmail) {
    console.warn('[email] sendLeadNotification skipped — missing env vars:', {
      RESEND_API_KEY:    !!apiKey,
      RESEND_FROM_EMAIL: !!fromEmail,
      ADMIN_EMAIL:       !!adminEmail,
    })
    return
  }

  console.log('[email] Resend configured: true — sending lead notification…')

  const { Resend } = await import('resend')
  const resend = new Resend(apiKey)

  const serviceLabel = SERVICE_LABELS[lead.service] ?? lead.service
  const waPhone = lead.phone.replace(/\D/g, '')
  const waText  = encodeURIComponent(
    `Bonjour ${lead.name}, suite à votre demande Palm d'Or Dakhla, nous vous confirmons...`
  )
  const waUrl = `https://wa.me/${waPhone}?text=${waText}`

  const hasBookingDetails = lead.check_in || lead.check_out || lead.apartment_type

  try {
  const { data, error } = await resend.emails.send({
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
            <td style="padding:6px 0;color:#555;width:130px;">Nom</td>
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
          ${hasBookingDetails ? `
          <tr><td colspan="2" style="padding:10px 0 4px;"><hr style="border:none;border-top:1px solid #e5dcc3;margin:0;"/></td></tr>
          ${lead.apartment_type ? `
          <tr>
            <td style="padding:6px 0;color:#555;">Appartement</td>
            <td style="padding:6px 0;">${APARTMENT_LABELS[lead.apartment_type] ?? lead.apartment_type}</td>
          </tr>` : ''}
          ${lead.check_in ? `
          <tr>
            <td style="padding:6px 0;color:#555;">Arrivée</td>
            <td style="padding:6px 0;font-weight:600;">${lead.check_in}</td>
          </tr>` : ''}
          ${lead.check_out ? `
          <tr>
            <td style="padding:6px 0;color:#555;">Départ</td>
            <td style="padding:6px 0;font-weight:600;">${lead.check_out}</td>
          </tr>` : ''}
          <tr><td colspan="2" style="padding:4px 0 10px;"><hr style="border:none;border-top:1px solid #e5dcc3;margin:0;"/></td></tr>
          ` : ''}
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
  if (error) {
    throw new Error(`[Resend] ${error.message}`)
  }
  console.log('[email] Lead notification sent:', data.id)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[email] Lead notification failed:', msg)
    throw err
  }
}

// ─── Decision email — sent to client after admin accepts/rejects ──────────────

export interface LeadDecisionNotification {
  name:            string
  email:           string
  phone:           string
  service:         string
  check_in?:       string | null
  check_out?:      string | null
  apartment_type?: string | null
}

export async function sendLeadDecisionEmail(
  lead:     LeadDecisionNotification,
  decision: 'accepted' | 'rejected',
  note?:    string | null,
): Promise<void> {
  const apiKey    = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL

  if (!apiKey || !fromEmail) {
    console.warn('[email] sendLeadDecisionEmail skipped — missing env vars:', {
      RESEND_API_KEY:    !!apiKey,
      RESEND_FROM_EMAIL: !!fromEmail,
    })
    return
  }

  console.log(`[email] Sending ${decision} email to ${lead.name}…`)

  const { Resend } = await import('resend')
  const resend = new Resend(apiKey)

  const serviceLabel   = SERVICE_LABELS[lead.service] ?? lead.service
  const waPhone        = lead.phone.replace(/\D/g, '')
  const waText         = encodeURIComponent(`Bonjour ${lead.name}, suite à votre demande Palm d'Or Dakhla…`)
  const waUrl          = `https://wa.me/${waPhone}?text=${waText}`
  const isAccepted     = decision === 'accepted'
  const hasBookingInfo = lead.check_in || lead.check_out || lead.apartment_type

  const subject = isAccepted
    ? `Votre réservation Palm d'Or Dakhla — Confirmée ✓`
    : `Votre demande Palm d'Or Dakhla`

  const html = `
    <div style="font-family:sans-serif;font-size:14px;color:#1C3A28;line-height:1.7;max-width:480px;margin:0 auto;">
      <div style="background:#F9F5EC;padding:28px 32px;border-radius:4px;">

        <div style="text-align:center;margin-bottom:28px;">
          <p style="font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#C4A96F;margin:0 0 10px;">
            Palm d&rsquo;Or Dakhla
          </p>
          <h1 style="font-size:22px;font-weight:300;color:#1C3A28;margin:0;font-style:italic;">
            ${isAccepted ? 'Réservation confirmée' : 'Réponse à votre demande'}
          </h1>
          <div style="width:40px;height:1px;background:#C4A96F;margin:12px auto 0;"></div>
        </div>

        <p style="margin:0 0 14px;">Bonjour <strong>${lead.name}</strong>,</p>

        ${isAccepted ? `
          <p style="margin:0 0 20px;">
            Votre demande de réservation pour <strong>${serviceLabel}</strong>
            a été <strong>acceptée</strong> par notre équipe.
          </p>
        ` : `
          <p style="margin:0 0 14px;">
            Nous vous remercions de l&rsquo;intérêt que vous portez à la résidence Palm d&rsquo;Or Dakhla.
          </p>
          <p style="margin:0 0 20px;">
            Malheureusement, nous ne sommes pas en mesure d&rsquo;honorer votre demande
            pour <strong>${serviceLabel}</strong> en ce moment.
          </p>
        `}

        ${isAccepted && hasBookingInfo ? `
          <table style="border-collapse:collapse;width:100%;margin-bottom:20px;background:white;border-radius:4px;">
            ${lead.apartment_type ? `
            <tr>
              <td style="padding:8px 14px;color:#888;font-size:12px;width:130px;">Appartement</td>
              <td style="padding:8px 14px;font-size:12px;font-weight:600;">
                ${APARTMENT_LABELS[lead.apartment_type] ?? lead.apartment_type}
              </td>
            </tr>` : ''}
            ${lead.check_in ? `
            <tr>
              <td style="padding:8px 14px;color:#888;font-size:12px;">Arrivée</td>
              <td style="padding:8px 14px;font-size:12px;font-weight:600;">${lead.check_in}</td>
            </tr>` : ''}
            ${lead.check_out ? `
            <tr>
              <td style="padding:8px 14px;color:#888;font-size:12px;">Départ</td>
              <td style="padding:8px 14px;font-size:12px;font-weight:600;">${lead.check_out}</td>
            </tr>` : ''}
          </table>
        ` : ''}

        ${note ? `
          <div style="background:white;border-left:3px solid #C4A96F;padding:10px 14px;
            margin-bottom:20px;border-radius:0 4px 4px 0;">
            <p style="margin:0;font-size:13px;color:#555;">${note}</p>
          </div>
        ` : ''}

        ${isAccepted
          ? `<p style="margin:0 0 24px;">Notre équipe vous contactera rapidement pour confirmer les détails finaux.</p>`
          : `<p style="margin:0 0 24px;">N&rsquo;hésitez pas à nous contacter pour d&rsquo;autres dates ou pour toute question.</p>`
        }

        <div style="text-align:center;margin-bottom:28px;">
          <a href="${waUrl}"
            style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;
              padding:12px 28px;border-radius:30px;font-size:13px;font-weight:600;letter-spacing:0.03em;">
            Contacter via WhatsApp
          </a>
        </div>

        <p style="margin:0;font-size:11px;color:#aaa;text-align:center;
          border-top:1px solid #e5dcc3;padding-top:16px;">
          Palm d&rsquo;Or Dakhla &mdash; AV Al Walaa, Dakhla 73000
        </p>
      </div>
    </div>
  `

  try {
    const { data, error } = await resend.emails.send({
      from:    fromEmail,
      to:      lead.email,
      subject,
      html,
    })
    if (error) throw new Error(`[Resend] ${error.message}`)
    console.log(`[email] Decision email sent: ${data.id}`)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[email] Decision email failed:', msg)
    throw err
  }
}
