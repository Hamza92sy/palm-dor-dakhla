import { supabaseAdmin } from '@/lib/supabase/server'

const SERVICE_LABELS: Record<string, string> = {
  accommodation: 'Hébergement',
  restaurant:    'Restaurant',
  cafe:          'Café',
  car_rental:    'Location de voiture',
}

const STATUS_LABELS: Record<string, string> = {
  new:       'Nouveau',
  contacted: 'Contacté',
  confirmed: 'Confirmé',
  cancelled: 'Annulé',
  accepted:  'Accepté',
  rejected:  'Refusé',
}

const APARTMENT_LABELS: Record<string, string> = {
  'standard':        'Standard',
  '2-chambres':      '2 Chambres',
  'grande-capacite': 'Grande capacité',
}

function csvCell(val: string | null | undefined): string {
  const s = (val ?? '').replace(/"/g, '""')
  return `"${s}"`
}

function formatDate(d: string | null | undefined): string {
  if (!d) return ''
  return new Date(d).toLocaleDateString('fr-FR', {
    timeZone: 'Africa/Casablanca',
    day:      '2-digit',
    month:    '2-digit',
    year:     'numeric',
  })
}

export async function GET() {
  const { data: leads, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return new Response(`Erreur Supabase: ${error.message}`, { status: 500 })
  }

  const header = [
    'Date', 'Nom', 'Téléphone', 'Email', 'Service', 'Message', 'Statut', 'Langue',
    'Appartement', 'Arrivée', 'Départ', 'Notes', 'Décision', 'Date décision',
  ]

  const rows = (leads ?? []).map(lead => [
    new Date(lead.created_at).toLocaleString('fr-FR', {
      timeZone: 'Africa/Casablanca',
      day:      '2-digit',
      month:    '2-digit',
      year:     'numeric',
      hour:     '2-digit',
      minute:   '2-digit',
    }),
    lead.name,
    lead.phone,
    lead.email ?? '',
    SERVICE_LABELS[lead.service] ?? lead.service,
    lead.message ?? '',
    STATUS_LABELS[lead.status]   ?? lead.status,
    lead.language.toUpperCase(),
    lead.apartment_type ? (APARTMENT_LABELS[lead.apartment_type] ?? lead.apartment_type) : '',
    formatDate(lead.check_in),
    formatDate(lead.check_out),
    lead.notes ?? '',
    lead.decision_note ?? '',
    lead.decision_at ? formatDate(lead.decision_at) : '',
  ]
    .map(csvCell)
    .join(','))

  // BOM UTF-8 ensures Excel opens without encoding issues
  const csv = '﻿' + [header.map(csvCell).join(','), ...rows].join('\r\n')

  const today = new Date().toISOString().split('T')[0]

  return new Response(csv, {
    headers: {
      'Content-Type':        'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="leads-${today}.csv"`,
      'Cache-Control':       'no-store',
    },
  })
}
