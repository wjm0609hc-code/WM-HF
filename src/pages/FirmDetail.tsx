import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Globe, MapPin, DollarSign, Building2, Plus } from 'lucide-react'
import { Layout } from '../components/layout/Layout'
import { StageBadge, StrategyBadge, FirmTypeBadge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { useApp } from '../context/AppContext'
import { firms, teamMembers } from '../data/mockData'
import { formatAUM, formatCheckSize, formatRelativeDate, FIRM_TYPE_LABELS } from '../utils/format'

export default function FirmDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { contacts, activities } = useApp()

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
  const firmActivities = activities
    .filter(a => firmContacts.some(c => c.id === a.contactId))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 20)

  const totalExpected = firmContacts.reduce((s, c) => s + (c.expectedCommitment ?? 0), 0)

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

      <div className="grid grid-cols-3 gap-5">
        {/* Left: Firm info */}
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

          {firm.notes && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Notes</span>
              <p className="text-sm text-slate-700 leading-relaxed mt-3">{firm.notes}</p>
            </div>
          )}
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

        {/* Right: Activity */}
        <div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Recent Activity</span>
            <div className="mt-4 space-y-3">
              {firmActivities.map(act => {
                const contact = contacts.find(c => c.id === act.contactId)
                return (
                  <div key={act.id} className="flex items-start gap-2.5 text-sm">
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                      act.type === 'email_sent' ? 'bg-blue-500' :
                      act.type === 'email_received' ? 'bg-violet-500' :
                      act.type === 'meeting' ? 'bg-indigo-500' :
                      act.type === 'call' ? 'bg-emerald-500' :
                      act.type === 'stage_change' ? 'bg-amber-500' : 'bg-slate-400'
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
              {firmActivities.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4">No activity yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
