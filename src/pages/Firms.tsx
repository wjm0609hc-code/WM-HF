import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, X, Building2, MapPin, DollarSign } from 'lucide-react'
import { Layout } from '../components/layout/Layout'
import { FirmTypeBadge, StrategyBadge } from '../components/ui/Badge'
import { useApp } from '../context/AppContext'
import { firms as allFirms } from '../data/mockData'
import { formatAUM, FIRM_TYPE_LABELS } from '../utils/format'
import type { FirmType } from '../types'

export default function Firms() {
  const { contacts } = useApp()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<FirmType | 'all'>('all')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const filtered = useMemo(() => {
    let list = allFirms
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(f => `${f.name} ${f.city} ${f.state}`.toLowerCase().includes(q))
    }
    if (typeFilter !== 'all') list = list.filter(f => f.type === typeFilter)
    return list.sort((a, b) => b.aum - a.aum)
  }, [search, typeFilter])

  return (
    <Layout title="Firms">
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search firms..."
            className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100 transition-all" />
          {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X size={14} /></button>}
        </div>

        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as FirmType | 'all')}
          className="text-sm border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-indigo-300 bg-white">
          <option value="all">All Types</option>
          {(Object.keys(FIRM_TYPE_LABELS) as FirmType[]).map(t => <option key={t} value={t}>{FIRM_TYPE_LABELS[t]}</option>)}
        </select>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-slate-400">{filtered.length} firms</span>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
            <Plus size={14} /> Add Firm
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map(firm => {
          const firmContacts = contacts.filter(c => c.firmId === firm.id)
          const stages = [...new Set(firmContacts.map(c => c.stage))]

          return (
            <div key={firm.id}
              onClick={() => navigate(`/firms/${firm.id}`)}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-indigo-200 cursor-pointer transition-all group">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <Building2 size={18} />
                </div>
                <FirmTypeBadge type={firm.type} />
              </div>

              <h3 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors mb-1">{firm.name}</h3>

              <div className="flex items-center gap-1 text-xs text-slate-400 mb-3">
                <MapPin size={11} />
                {firm.city}, {firm.state}
              </div>

              {/* AUM */}
              <div className="flex items-center gap-1.5 mb-3">
                <div className="flex items-center gap-1 text-sm font-bold text-slate-800">
                  <DollarSign size={13} className="text-slate-400" />
                  {formatAUM(firm.aum)} AUM
                </div>
              </div>

              {/* Strategy tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {firm.strategyTags.map(t => <StrategyBadge key={t} tag={t} />)}
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {firmContacts.length} contact{firmContacts.length !== 1 ? 's' : ''}
                </span>
                {firmContacts.length > 0 && (
                  <div className="flex -space-x-1">
                    {firmContacts.slice(0, 3).map(c => (
                      <div key={c.id}
                        className="w-6 h-6 rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center text-2xs text-white font-semibold"
                        title={`${c.firstName} ${c.lastName}`}>
                        {c.firstName[0]}{c.lastName[0]}
                      </div>
                    ))}
                    {firmContacts.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-2xs text-slate-500 font-semibold">
                        +{firmContacts.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-400 text-sm">No firms match your filters.</div>
      )}
    </Layout>
  )
}
