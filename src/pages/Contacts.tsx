import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Download, Filter, ChevronUp, ChevronDown, Search, X } from 'lucide-react'
import { Layout } from '../components/layout/Layout'
import { StageBadge, StrategyBadge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { useApp } from '../context/AppContext'
import { firms, teamMembers } from '../data/mockData'
import { formatCheckSize, formatAUM, formatDate, formatRelativeDate, STAGE_LABELS, STAGE_ORDER, exportContactsToCSV } from '../utils/format'
import type { Stage, StrategyTag } from '../types'

type SortKey = 'name' | 'firm' | 'aum' | 'stage' | 'lastContact' | 'checkSize'

const STRATEGIES: StrategyTag[] = ['Power Fund III', 'Credit Opportunities II', 'Real Assets', 'Core Private Equity', 'Venture Growth']

export default function Contacts() {
  const { contacts, viewMode, currentUserId } = useApp()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [stageFilter, setStageFilter] = useState<Stage | 'all'>('all')
  const [strategyFilter, setStrategyFilter] = useState<StrategyTag | 'all'>('all')
  const [ownerFilter, setOwnerFilter] = useState<string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('lastContact')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [showFilters, setShowFilters] = useState(false)

  const baseContacts = viewMode === 'personal'
    ? contacts.filter(c => c.ownerId === currentUserId)
    : contacts

  const filtered = useMemo(() => {
    let list = baseContacts
    if (search) {
      const q = search.toLowerCase()
      const firmNames = Object.fromEntries(firms.map(f => [f.id, f.name.toLowerCase()]))
      list = list.filter(c =>
        `${c.firstName} ${c.lastName} ${c.email} ${c.title} ${firmNames[c.firmId] ?? ''}`.toLowerCase().includes(q)
      )
    }
    if (stageFilter !== 'all') list = list.filter(c => c.stage === stageFilter)
    if (strategyFilter !== 'all') list = list.filter(c => c.strategyTags.includes(strategyFilter))
    if (ownerFilter !== 'all') list = list.filter(c => c.ownerId === ownerFilter)

    return [...list].sort((a, b) => {
      let cmp = 0
      const firmA = firms.find(f => f.id === a.firmId)
      const firmB = firms.find(f => f.id === b.firmId)
      switch (sortKey) {
        case 'name': cmp = `${a.lastName}${a.firstName}`.localeCompare(`${b.lastName}${b.firstName}`); break
        case 'firm': cmp = (firmA?.name ?? '').localeCompare(firmB?.name ?? ''); break
        case 'aum': cmp = (firmA?.aum ?? 0) - (firmB?.aum ?? 0); break
        case 'stage': cmp = STAGE_ORDER.indexOf(a.stage) - STAGE_ORDER.indexOf(b.stage); break
        case 'lastContact': cmp = a.lastContactDate.localeCompare(b.lastContactDate); break
        case 'checkSize': cmp = (a.checkSizeMax ?? 0) - (b.checkSizeMax ?? 0); break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [baseContacts, search, stageFilter, strategyFilter, ownerFilter, sortKey, sortDir])

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('desc') }
  }

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <ChevronUp size={12} className="text-slate-300" />
    return sortDir === 'asc' ? <ChevronUp size={12} className="text-slate-600" /> : <ChevronDown size={12} className="text-slate-600" />
  }

  function handleExport() {
    const rows = filtered.map(c => {
      const firm = firms.find(f => f.id === c.firmId)
      const owner = teamMembers.find(t => t.id === c.ownerId)
      return {
        'First Name': c.firstName, 'Last Name': c.lastName, 'Email': c.email, 'Phone': c.phone ?? '',
        'Title': c.title, 'Firm': firm?.name ?? '', 'City': firm?.city ?? '', 'State': firm?.state ?? '',
        'AUM ($M)': firm?.aum.toString() ?? '', 'Stage': STAGE_LABELS[c.stage],
        'Strategy Tags': c.strategyTags.join('; '),
        'Check Size Min ($M)': c.checkSizeMin?.toString() ?? '',
        'Check Size Max ($M)': c.checkSizeMax?.toString() ?? '',
        'Expected ($M)': c.expectedCommitment?.toString() ?? '',
        'Last Contact': c.lastContactDate, 'Owner': owner?.name ?? '',
      }
    })
    exportContactsToCSV(rows)
  }

  const activeFilters = [stageFilter !== 'all', strategyFilter !== 'all', ownerFilter !== 'all'].filter(Boolean).length

  return (
    <Layout title="Contacts">
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search contacts..."
            className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100 transition-all"
          />
          {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X size={14} /></button>}
        </div>

        <button
          onClick={() => setShowFilters(s => !s)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
            showFilters || activeFilters > 0
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Filter size={14} />
          Filters
          {activeFilters > 0 && (
            <span className="bg-indigo-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">{activeFilters}</span>
          )}
        </button>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-slate-400">{filtered.length} contacts</span>
          <button onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white border border-slate-200 text-slate-600 hover:border-slate-300 transition-colors">
            <Download size={14} /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
            <Plus size={14} /> Add Contact
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex items-center gap-3 mb-4 p-4 bg-white rounded-xl border border-slate-200 flex-wrap">
          <div>
            <label className="text-xs text-slate-500 font-medium block mb-1">Stage</label>
            <select value={stageFilter} onChange={e => setStageFilter(e.target.value as Stage | 'all')}
              className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 outline-none focus:border-indigo-300 bg-white">
              <option value="all">All Stages</option>
              {STAGE_ORDER.map(s => <option key={s} value={s}>{STAGE_LABELS[s]}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500 font-medium block mb-1">Strategy</label>
            <select value={strategyFilter} onChange={e => setStrategyFilter(e.target.value as StrategyTag | 'all')}
              className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 outline-none focus:border-indigo-300 bg-white">
              <option value="all">All Strategies</option>
              {STRATEGIES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {viewMode === 'team' && (
            <div>
              <label className="text-xs text-slate-500 font-medium block mb-1">Owner</label>
              <select value={ownerFilter} onChange={e => setOwnerFilter(e.target.value)}
                className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 outline-none focus:border-indigo-300 bg-white">
                <option value="all">All Owners</option>
                {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
          )}
          {activeFilters > 0 && (
            <button onClick={() => { setStageFilter('all'); setStrategyFilter('all'); setOwnerFilter('all') }}
              className="text-xs text-slate-500 hover:text-red-500 underline mt-4">
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              {[
                { key: 'name' as SortKey, label: 'Name' },
                { key: 'firm' as SortKey, label: 'Firm' },
                { key: 'aum' as SortKey, label: 'AUM' },
                { key: 'stage' as SortKey, label: 'Stage' },
                { key: null, label: 'Strategy' },
                { key: 'checkSize' as SortKey, label: 'Check Size' },
                { key: 'lastContact' as SortKey, label: 'Last Contact' },
                ...(viewMode === 'team' ? [{ key: null, label: 'Owner' }] : []),
              ].map(col => (
                <th key={col.label}
                  onClick={() => col.key && toggleSort(col.key)}
                  className={`px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide ${col.key ? 'cursor-pointer hover:text-slate-700 select-none' : ''}`}>
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.key && <SortIcon k={col.key} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map(contact => {
              const firm = firms.find(f => f.id === contact.firmId)
              const owner = teamMembers.find(t => t.id === contact.ownerId)
              return (
                <tr key={contact.id}
                  onClick={() => navigate(`/contacts/${contact.id}`)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar initials={`${contact.firstName[0]}${contact.lastName[0]}`} color="#6366f1" size="sm" />
                      <div>
                        <div className="font-medium text-slate-900 group-hover:text-indigo-700 transition-colors">
                          {contact.firstName} {contact.lastName}
                        </div>
                        <div className="text-xs text-slate-400">{contact.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-700">{firm?.name}</div>
                    <div className="text-xs text-slate-400">{firm?.city}, {firm?.state}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-medium">{firm ? formatAUM(firm.aum) : '—'}</td>
                  <td className="px-4 py-3"><StageBadge stage={contact.stage} /></td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {contact.strategyTags.map(t => <StrategyBadge key={t} tag={t} />)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                    {formatCheckSize(contact.checkSizeMin, contact.checkSizeMax)}
                  </td>
                  <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                    {formatRelativeDate(contact.lastContactDate)}
                  </td>
                  {viewMode === 'team' && (
                    <td className="px-4 py-3">
                      {owner && <Avatar initials={owner.initials} color={owner.color} size="xs" name={owner.name} />}
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-sm">No contacts match your filters.</div>
        )}
      </div>
    </Layout>
  )
}
