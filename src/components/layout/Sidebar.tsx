import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Building2, GitBranch, Calendar, Mail, BarChart3, Settings, LogOut, TrendingUp } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { teamMembers, funds } from '../../data/mockData'
import { formatCurrency } from '../../utils/format'

const NAV = [
  { to: '/',          icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/contacts',  icon: Users,           label: 'Contacts' },
  { to: '/firms',     icon: Building2,       label: 'Firms' },
  { to: '/pipeline',  icon: GitBranch,       label: 'Pipeline' },
  { to: '/calendar',  icon: Calendar,        label: 'Calendar' },
  { to: '/email',     icon: Mail,            label: 'Email Activity' },
]

export function Sidebar() {
  const { currentUserId } = useApp()
  const location = useLocation()
  const user = teamMembers.find(t => t.id === currentUserId)!

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-slate-900 flex flex-col z-40 select-none">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center flex-shrink-0">
            <TrendingUp size={14} className="text-white" />
          </div>
          <div>
            <div className="text-white font-semibold text-sm leading-tight">WM Capital</div>
            <div className="text-slate-500 text-2xs leading-tight">Investor Relations</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 pt-4 pb-2 space-y-0.5 overflow-y-auto scrollbar-none">
        <div className="mb-1 px-2">
          <span className="text-2xs font-semibold text-slate-600 uppercase tracking-wider">Workspace</span>
        </div>
        {NAV.map(({ to, icon: Icon, label }) => {
          const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)
          return (
            <NavLink key={to} to={to}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}>
              <Icon size={16} />
              {label}
            </NavLink>
          )
        })}

        <div className="mt-5 mb-1 px-2">
          <span className="text-2xs font-semibold text-slate-600 uppercase tracking-wider">More</span>
        </div>
        <NavLink to="/reports"
          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
            location.pathname === '/reports' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}>
          <BarChart3 size={16} />
          Reports
        </NavLink>
        <NavLink to="/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
            location.pathname === '/settings' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}>
          <Settings size={16} />
          Settings
        </NavLink>
      </nav>

      {/* Fund progress */}
      <div className="mx-3 mb-3 p-3 bg-slate-800 rounded-xl border border-slate-700">
        <div className="text-2xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Fundraising</div>
        {funds.map(fund => {
          const pct = Math.round((fund.committed / fund.target) * 100)
          return (
            <div key={fund.id} className="mb-2.5 last:mb-0">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs text-slate-300 font-medium">{fund.shortName}</span>
                <span className="text-2xs text-slate-500">{pct}%</span>
              </div>
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="text-2xs text-slate-600 mt-0.5">
                {formatCurrency(fund.committed)} of {formatCurrency(fund.target)}
              </div>
            </div>
          )
        })}
      </div>

      {/* User */}
      <div className="border-t border-slate-800 px-4 py-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
          style={{ backgroundColor: user.color }}>
          {user.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-slate-200 truncate">{user.name}</div>
          <div className="text-2xs text-slate-500 truncate">{user.title}</div>
        </div>
        <button className="p-1 text-slate-600 hover:text-slate-400 transition-colors">
          <LogOut size={14} />
        </button>
      </div>
    </aside>
  )
}
