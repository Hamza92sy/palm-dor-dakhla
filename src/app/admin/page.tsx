import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/server'
import StatusSelect from './components/StatusSelect'
import AdminFilters from './components/AdminFilters'

const SERVICE_LABELS: Record<string, string> = {
  accommodation: 'Hébergement',
  restaurant:    'Restaurant',
  cafe:          'Café',
  car_rental:    'Location',
}

type Lead = {
  id:         string
  created_at: string
  name:       string
  phone:      string
  service:    string
  message:    string | null
  status:     string
  language:   string
}

async function logout() {
  'use server'
  const cookieStore = await cookies()
  cookieStore.delete('admin_token')
  redirect('/admin/login')
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; status?: string; q?: string }>
}) {
  const { service, status, q } = await searchParams

  let query = supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (service) query = query.eq('service', service)
  if (status)  query = query.eq('status',  status)
  if (q)       query = query.or(`name.ilike.%${q}%,phone.ilike.%${q}%`)

  const { data, error } = await query
  const leads = (data ?? []) as Lead[]

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-palm-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-8 md:py-12">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-light italic text-2xl md:text-3xl text-palm-blue">
              Réservations
            </h1>
            <p className="text-[9px] tracking-[0.4em] uppercase text-palm-gold mt-1 font-medium">
              Palm d&apos;Or Dakhla
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={`/api/admin/export`}
              download={`leads-${today}.csv`}
              className="text-[11px] tracking-[0.14em] uppercase font-medium
                border border-palm-blue/20 text-palm-blue/70
                hover:border-palm-gold hover:text-palm-blue
                px-4 py-2 rounded-sm transition-all duration-200 whitespace-nowrap"
            >
              Exporter CSV
            </a>
            <form action={logout}>
              <button
                type="submit"
                className="text-[11px] tracking-[0.14em] uppercase font-medium
                  border border-palm-blue/15 text-palm-blue/40
                  hover:border-red-300 hover:text-red-600
                  px-4 py-2 rounded-sm transition-all duration-200"
              >
                Déconnexion
              </button>
            </form>
          </div>
        </div>

        {/* ── Filters ────────────────────────────────────────────────── */}
        <Suspense>
          <AdminFilters />
        </Suspense>

        {/* ── Table ──────────────────────────────────────────────────── */}
        {error ? (
          <div className="py-16 text-center">
            <p className="text-sm text-red-600">Erreur Supabase : {error.message}</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-palm-blue/35">Aucun lead trouvé.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-sm border border-palm-gold/15 shadow-sm">
              <table className="w-full text-sm min-w-[720px]">
                <thead>
                  <tr className="bg-palm-blue text-white">
                    <th className="text-left px-4 py-3 text-[10px] tracking-[0.18em] uppercase font-medium whitespace-nowrap">
                      Date
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] tracking-[0.18em] uppercase font-medium">
                      Nom
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] tracking-[0.18em] uppercase font-medium">
                      Téléphone
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] tracking-[0.18em] uppercase font-medium">
                      Service
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] tracking-[0.18em] uppercase font-medium max-w-[180px]">
                      Message
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] tracking-[0.18em] uppercase font-medium">
                      Statut
                    </th>
                    <th className="text-left px-4 py-3 text-[10px] tracking-[0.18em] uppercase font-medium">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, i) => {
                    const waPhone = lead.phone.replace(/\D/g, '')
                    const waText  = encodeURIComponent(
                      `Bonjour ${lead.name}, suite à votre demande Palm d'Or Dakhla, nous vous confirmons...`
                    )
                    return (
                      <tr
                        key={lead.id}
                        className={`border-t border-palm-gold/10 transition-colors hover:bg-palm-gold/5
                          ${i % 2 === 0 ? 'bg-white/50' : 'bg-white/25'}`}
                      >
                        {/* Date */}
                        <td className="px-4 py-3 text-palm-blue/50 text-[11px] whitespace-nowrap">
                          {new Date(lead.created_at).toLocaleDateString('fr-FR', {
                            day:    '2-digit',
                            month:  '2-digit',
                            year:   '2-digit',
                          })}
                          <br />
                          <span className="text-palm-blue/30">
                            {new Date(lead.created_at).toLocaleTimeString('fr-FR', {
                              hour:   '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </td>

                        {/* Nom */}
                        <td className="px-4 py-3 text-palm-blue font-medium">
                          {lead.name}
                        </td>

                        {/* Téléphone */}
                        <td className="px-4 py-3 text-palm-blue/65 whitespace-nowrap text-[12px]">
                          {lead.phone}
                        </td>

                        {/* Service */}
                        <td className="px-4 py-3">
                          <span className="text-[10px] tracking-[0.1em] uppercase text-palm-gold font-medium">
                            {SERVICE_LABELS[lead.service] ?? lead.service}
                          </span>
                        </td>

                        {/* Message */}
                        <td className="px-4 py-3 max-w-[180px]">
                          {lead.message ? (
                            <span
                              className="text-[12px] text-palm-blue/55 block truncate"
                              title={lead.message}
                            >
                              {lead.message}
                            </span>
                          ) : (
                            <span className="text-[11px] text-palm-blue/20 italic">—</span>
                          )}
                        </td>

                        {/* Statut */}
                        <td className="px-4 py-3">
                          <StatusSelect id={lead.id} currentStatus={lead.status} />
                        </td>

                        {/* Action WhatsApp */}
                        <td className="px-4 py-3">
                          <a
                            href={`https://wa.me/${waPhone}?text=${waText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] tracking-[0.08em] uppercase font-medium
                              text-[#1a9e51] hover:text-[#25D366]
                              transition-colors whitespace-nowrap"
                          >
                            Contacter
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <p className="text-[10px] text-palm-blue/30 mt-3 tracking-[0.1em]">
              {leads.length} résultat{leads.length > 1 ? 's' : ''}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
