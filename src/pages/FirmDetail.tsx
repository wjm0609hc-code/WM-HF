import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Globe, MapPin, DollarSign, Building2, Plus, Users, Phone, Video, Sparkles, RefreshCw, Clock } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { Layout } from '../components/layout/Layout'
import { StageBadge, StrategyBadge, FirmTypeBadge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { useApp } from '../context/AppContext'
import { firms, teamMembers } from '../data/mockData'
import { formatAUM, formatCheckSize, formatRelativeDate, formatDuration, FIRM_TYPE_LABELS } from '../utils/format'

function meetingTypeInfo(act: { type: string; location?: string }) {
  const loc = (act.location ?? '').toLowerCase()
  if (loc.includes('zoom') || loc.includes('teams') || loc.includes('video') || loc.includes('google meet')) {
    return { label: 'Video Call', icon: Video, color: 'bg-violet-50 text-violet-600' }
  }
  if (act.type === 'call' || loc.includes('phone')) {
    return { label: 'Phone Call', icon: Phone, color: 'bg-emerald-50 text-emerald-600' }
  }
  return { label: 'Meeting', icon: Users, color: 'bg-indigo-50 text-indigo-600' }
}

const OUTCOME_STYLES = {
  positive: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  neutral:  'text-amber-600 bg-amber-50 border-amber-200',
  negative: 'text-red-500 bg-red-50 border-red-200',
}
const OUTCOME_LABELS = { positive: '↑ Positive', neutral: '◦ Neutral', negative: '↓ Negative' }

export default function FirmDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { contacts, activities } = useApp()

  const [aiSummary, setAiSummary] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)
  const [aiGeneratedAt, setAiGeneratedAt] = useState<string | null>(null)

  const firm = firms.find(f => f.id === id)
  if (!firm) {
    return (
      <Layout title="Firm Not Found">
        <div className="text-center py-20 text-slate-400">
          Firm not found. <Link to="/firms" className="text-indigo-600 underline">Back to firms</Link>
        </div>
      </Layout>
    )
  }

  const firmContacts = contacts.filter(c => c.firmId === id)
  const allFirmActivities = activities
    .filter(a => firmContacts.some(c => c.id === a.contactId))
    .sort((a, b) => b.date.localeCompare(a.date))

  const generalActivities = allFirmActivities
    .filter(a => a.type !== 'meeting' && a.type !== 'call')
    .slice(0, 20)

  const meetingActivities = allFirmActivities
    .filter(a => a.type === 'meeting' || a.type === 'call')

  const totalExpected = firmContacts.reduce((s, c) => s + (c.expectedCommitment ?? 0), 0)

  async function generateAISummary() {
    setAiLoading(true)
    setAiError(null)
    try {
      const res = await fetch('/api/ai-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firmName: firm!.name,
          firmType: FIRM_TYPE_LABELS[firm!.type],
          aum: formatAUM(firm!.aum),
          city: firm!.city,
          state: firm!.state,
          country: firm!.country,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Unknown error')
      setAiSummary(data.summary)
      setAiGeneratedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    } catch (err: any) {
      setAiError(err.message)
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <Layout title={firm.name}>
      <button onClick={() => navigate('/firms')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-5 transition-colors">
        <ArrowLeft size={15} /> Back to Firms
      </button>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
            <Building2 size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{firm.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <FirmTypeBadge type={firm.type} />
              <span className="text-sm text-slate-400">{firm.city}, {firm.state}</span>
            </div>
          </div>
        </div>
        {totalExpected > 0 && (
          <div className="text-right bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
            <div className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">Expected Commitment</div>
            <div className="text-xl font-bold text-emerald-700 mt-0.5">${totalExpected}M</div>
          </div>
        )}
      </div>

      {/* Top 3-col grid */}
      <div className="grid grid-cols-3 gap-5 mb-5">
        {/* Left: Firm info + Notes + AI Notes */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Overview</span>
            <div className="mt-3 space-y-2.5">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <DollarSign size={13} className="text-slate-400" />
                <span className="font-semibold">{formatAUM(firm.aum)}</span>
                <span className="text-slate-400">AUM</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <MapPin size={13} className="text-slate-400" />
                {firm.city}, {firm.state} {firm.zip} · {firm.country}
              </div>
              {firm.website && (
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <Globe size={13} className="text-slate-400" />
                  <a href={`https://${firm.website}`} target="_blank" rel="noreferrer"
                    className="text-indigo-600 hover:underline">{firm.website}</a>
                </div>
              )}
            </div>
            <div className="mt-4">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Strategy Interest</div>
              <div className="flex flex-wrap gap-1.5">
                {firm.strategyTags.map(t => <StrategyBadge key={t} tag={t} />)}
              </div>
            </div>
          </div>

          {/* Notes */}
          {firm.notes && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Notes</span>
              <p className="text-sm text-slate-700 leading-relaxed mt-3">{firm.notes}</p>
            </div>
          )}

          {/* AI Notes */}
          <div className="bg-white rounded-2xl border border-violet-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="text-violet-500" />
                <span className="text-xs font-semibold text-violet-700 uppercase tracking-wide">AI Notes</span>
                <span className="text-2xs bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded-md font-medium">Claude</span>
              </div>
              {aiSummary && (
                <button
                  onClick={generateAISummary}
                  disabled={aiLoading}
                  className="flex items-center gap-1 text-xs text-violet-500 hover:text-violet-700 transition-colors disabled:opacity-40"
                  title="Regenerate"
                >
                  <RefreshCw size={11} className={aiLoading ? 'animate-spin' : ''} />
                </button>
              )}
            </div>

            {!aiSummary && !aiLoading && !aiError && (
              <div className="text-center py-4">
                <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                  Generate a 3–5 sentence AI summary of what this firm does and how they invest — useful when the notes section is blank.
                </p>
                <button
                  onClick={generateAISummary}
                  className="flex items-center gap-2 mx-auto px-4 py-2 bg-violet-600 text-white text-xs font-medium rounded-xl hover:bg-violet-700 transition-colors"
                >
                  <Sparkles size={12} /> Generate Summary
                </button>
              </div>
            )}

            {aiLoading && (
              <div className="flex items-center gap-3 py-4 justify-center">
                <RefreshCw size={14} className="animate-spin text-violet-400" />
                <span className="text-sm text-slate-400">Scanning firm data…</span>
              </div>
            )}

            {aiError && (
              <div className="space-y-3">
                <p className="text-xs text-red-500 leading-relaxed">{aiError}</p>
                <button
                  onClick={generateAISummary}
                  className="text-xs text-violet-600 hover:text-violet-800 underline"
                >
                  Try again
                </button>
              </div>
            )}

            {aiSummary && !aiLoading && (
              <div>
                <p className="text-sm text-slate-700 leading-relaxed">{aiSummary}</p>
                {aiGeneratedAt && (
                  <div className="flex items-center gap-1 mt-3 text-2xs text-slate-400">
                    <Clock size={10} /> Generated at {aiGeneratedAt}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Center: Contacts */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Key Personnel</span>
              <button className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                <Plus size={12} /> Add
              </button>
            </div>
            <div className="space-y-3">
              {firmContacts.map(contact => {
                const owner = teamMembers.find(t => t.id === contact.ownerId)
                return (
                  <div key={contact.id}
                    onClick={() => navigate(`/contacts/${contact.id}`)}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
                    <Avatar initials={`${contact.firstName[0]}${contact.lastName[0]}`} color="#6366f1" size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-sm text-slate-900 group-hover:text-indigo-700 transition-colors truncate">
                          {contact.firstName} {contact.lastName}
                        </span>
                        <StageBadge stage={contact.stage} size="xs" />
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 truncate">{contact.title}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-400">{formatCheckSize(contact.checkSizeMin, contact.checkSizeMax)}</span>
                        {owner && <Avatar initials={owner.initials} color={owner.color} size="xs" name={owner.name} />}
                      </div>
                    </div>
                  </div>
                )
              })}
              {firmContacts.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4">No contacts yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Right: General activity (emails, notes, stage changes) */}
        <div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Activity Feed</span>
            <div className="mt-4 space-y-3">
              {generalActivities.map(act => {
                const contact = contacts.find(c => c.id === act.contactId)
                return (
                  <div key={act.id} className="flex items-start gap-2.5 text-sm">
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                      act.type === 'email_sent'     ? 'bg-blue-500' :
                      act.type === 'email_received' ? 'bg-violet-500' :
                      act.type === 'stage_change'   ? 'bg-amber-500' : 'bg-slate-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-slate-700 truncate">{act.subject || act.type.replace('_', ' ')}</div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {contact?.firstName} {contact?.lastName} · {formatRelativeDate(act.date)}
                      </div>
                    </div>
                  </div>
                )
              })}
              {generalActivities.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4">No activity yet</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Meetings & Calls — full width */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Users size={15} className="text-indigo-500" />
            <span className="text-sm font-semibold text-slate-800">Meetings & Calls</span>
            <span className="ml-1 text-xs bg-slate-100 text-slate-500 border border-slate-200 rounded-full px-2 py-0.5 font-medium">
              {meetingActivities.length}
            </span>
          </div>
        </div>

        {meetingActivities.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">No meetings or calls recorded yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['Date', 'Type', 'Contact', 'Subject / Notes', 'Duration', 'Outcome'].map(h => (
                  <th key={h} className="px-5 py-2.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {meetingActivities.map(act => {
                const contact = contacts.find(c => c.id === act.contactId)
                const typeInfo = meetingTypeInfo(act)
                const Icon = typeInfo.icon
                return (
                  <tr key={act.id}
                    onClick={() => contact && navigate(`/contacts/${contact.id}`)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors group">
                    <td className="px-5 py-3 whitespace-nowrap text-slate-500 text-xs">
                      <div className="font-medium text-slate-700">{format(parseISO(act.date), 'MMM d, yyyy')}</div>
                      <div className="text-slate-400">{format(parseISO(act.date), 'h:mm a')}</div>
                    </td>
                    <td className="px-5 py-3">
                      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium ${typeInfo.color}`}>
                        <Icon size={11} />
                        {typeInfo.label}
                      </div>
                      {act.location && (
                        <div className="text-2xs text-slate-400 mt-0.5 truncate max-w-[120px]">{act.location}</div>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      {contact ? (
                        <div>
                          <div className="font-medium text-slate-800 group-hover:text-indigo-700 transition-colors">
                            {contact.firstName} {contact.lastName}
                          </div>
                          <div className="text-xs text-slate-400">{contact.title}</div>
                        </div>
                      ) : <span className="text-slate-400">—</span>}
                    </td>
                    <td className="px-5 py-3 max-w-xs">
                      <div className="font-medium text-slate-700 truncate">{act.subject}</div>
                      {act.body && (
                        <div className="text-xs text-slate-400 truncate mt-0.5">{act.body.substring(0, 80)}…</div>
                      )}
                    </td>
                    <td className="px-5 py-3 text-slate-500 whitespace-nowrap">
                      {act.duration ? formatDuration(act.duration) : '—'}
                    </td>
                    <td className="px-5 py-3">
                      {act.outcome ? (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium border ${OUTCOME_STYLES[act.outcome]}`}>
                          {OUTCOME_LABELS[act.outcome]}
                        </span>
                      ) : <span className="text-slate-300">—</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  )
}
