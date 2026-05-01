import { Search, Bell, Users, User } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { contacts as allContacts } from '../../data/mockData'
import { firms } from '../../data/mockData'

export function Header({ title }: { title: string }) {
  const { viewMode, setViewMode } = useApp()
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const navigate = useNavigate()

  const results = query.length > 1
    ? [
        ...allContacts.filter(c =>
          `${c.firstName} ${c.lastName} ${c.email}`.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 5).map(c => ({ type: 'contact' as const, id: c.id, label: `${c.firstName} ${c.lastName}`, sub: c.title })),
        ...firms.filter(f =>
          f.name.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 3).map(f => ({ type: 'firm' as const, id: f.id, label: f.name, sub: `${f.city}, ${f.state}` })),
      ]
    : []

  function handleSelect(r: { type: 'contact' | 'firm'; id: string }) {
    setQuery('')
    setShowResults(false)
    navigate(r.type === 'contact' ? `/contacts/${r.id}` : `/firms/${r.id}`)
  }

  return (
    <header className="fixed top-0 left-60 right-0 h-14 bg-white border-b border-slate-200 flex items-center gap-4 px-6 z-30">
      <h1 className="text-base font-semibold text-slate-900 min-w-0 truncate flex-shrink-0">{title}</h1>

      {/* Search */}
      <div className="relative flex-1 max-w-sm ml-2">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); setShowResults(true) }}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 150)}
          placeholder="Search contacts, firms..."
          className="w-full pl-8 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100 transition-all"
        />
        {showResults && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
            {results.map(r => (
              <button key={`${r.type}-${r.id}`} onMouseDown={() => handleSelect(r)}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors text-left">
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${r.type === 'contact' ? 'bg-indigo-500' : 'bg-amber-500'}`} />
                <div>
                  <div className="text-sm font-medium text-slate-800">{r.label}</div>
                  <div className="text-xs text-slate-400">{r.sub}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Personal / Team toggle */}
        <div className="flex rounded-xl border border-slate-200 overflow-hidden bg-slate-50 p-0.5 gap-0.5">
          <button
            onClick={() => setViewMode('personal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'personal' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <User size={12} />
            My View
          </button>
          <button
            onClick={() => setViewMode('team')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'team' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Users size={12} />
            Team
          </button>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
        </button>
      </div>
    </header>
  )
}
