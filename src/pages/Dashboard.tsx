import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { AlertTriangle, Mail, Phone, Users, Calendar, TrendingUp, DollarSign, ArrowRight, Clock } from 'lucide-react'
import { Layout } from '../components/layout/Layout'
import { StageBadge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { useApp } from '../context/AppContext'
import { firms, funds, teamMembers, activities as allActivities } from '../data/mockData'
import { formatCurrency, formatRelativeDate, formatDate, formatDuration, STAGE_LABELS, daysSince } from '../utils/format'
import type { Stage } from '../types'

const STAGE_ORDER: Stage[] = ['identified', 'outreach', 'intro_meeting', 'diligence', 'documentation']

const ACTIVITY_ICON: Record<string, { icon: typeof Mail; color: string }> = {
  email_sent:     { icon: Mail,     color: 'text-blue-500 bg-blue-50' },
  email_received: { icon: Mail,     color: 'text-violet-500 bg-violet-50' },
  meeting:        { icon: Users,    color: 'text-indigo-500 bg-indigo-50' },
  call:           { icon: Phone,    color: 'text-emerald-500 bg-emerald-50' },
  note:           { icon: TrendingUp, color: 'text-amber-500 bg-amber-50' },
  stage_change:   { icon: ArrowRight, color: 'text-slate-500 bg-slate-100' },
}

export default function Dashboard() {
  const { contacts, activities, viewMode, currentUserId, openLogMeeting } = useApp()
  const navigate = useNavigate()

  const today = format(new Date(), 'EEEE, MMMM d, yyyy')
  const firstName = teamMembers.find(t => t.id === currentUserId)?.firstName ?? 'there'

  const visibleContacts = viewMode === 'personal'
    ? contacts.filter(c => c.ownerId === currentUserId)
    : contacts

  const visibleActivities = viewMode === 'personal'
    ? activities.filter(a => a.ownerId === currentUserId)
    : activities

  // KPIs
  const pipelineValue = visibleContacts
    .filter(c => !['committed', 'passed', 'current_lp'].includes(c.stage))
    .reduce((s, c) => s + (c.expectedCommitment ?? ((c.checkSizeMin ?? 0) + (c.checkSizeMax ?? 0)) / 2), 0)

  const committedValue = visibleContacts
    .filter(c => c.stage === 'committed')
    .reduce((s, c) => s + (c.expectedCommitment ?? 0), 0)

  const meetingsThisWeek = visibleActivities.filter(a => {
    if (a.type !== 'meeting' && a.type !== 'call') return false
    const d = daysSince(a.date)
    return d >= 0 && d <= 7
  }).length

  const emailsSentThisWeek = visibleActivities.filter(a => {
    if (a.type !== 'email_sent') return false
    const d = daysSince(a.date)
    return d >= 0 && d <= 7
  }).length

  // Needs attention — not contacted in 20+ days, not committed/passed
  const needsAttention = visibleContacts.filter(c => {
    if (['committed', 'passed', 'current_lp'].includes(c.stage)) return false
    return daysSince(c.lastContactDate) >= 20
  }).sort((a, b) => daysSince(b.lastContactDate) - daysSince(a.lastContactDate))

  // Today's meetings
  const todayMeetings = visibleActivities.filter(a => {
    if (a.type !== 'meeting' && a.type !== 'call') return false
    const d = parseISO(a.date)
    return format(d, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  })

  // Upcoming (next 7 days from activities — for demo we show next 3 logged meetings)
  const upcomingMeetings = allActivities.filter(a =>
    (a.type === 'meeting' || a.type === 'call') && daysSince(a.date) === 0
  ).slice(0, 4)

  // Recent activity feed
  const recentActivities = visibleActivities.slice(0, 15)

  // Pipeline snapshot by stage
  const pipelineByStage = STAGE_ORDER.map(stage => {
    const stageContacts = visibleContacts.filter(c => c.stage === stage)
    const value = stageContacts.reduce((s, c) => s + (c.expectedCommitment ?? ((c.checkSizeMin ?? 0) + (c.checkSizeMax ?? 0)) / 2), 0)
    return { stage, count: stageContacts.length, value }
  })
  const maxPipelineCount = Math.max(...pipelineByStage.map(p => p.count), 1)

  return (
    <Layout title="Dashboard">
      {/* Greeting */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">Good morning, {firstName}.</h2>
        <p className="text-slate-500 text-sm mt-0.5">{today}</p>
      </div>

      {/* Alert */}
      {needsAttention.length > 0 && (
        <div className="mb-5 flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <AlertTriangle size={16} className="text-amber-500 flex-shrink-0" />
          <span className="text-sm text-amber-800 font-medium">
            {needsAttention.length} prospect{needsAttention.length > 1 ? 's' : ''} haven't been contacted in 20+ days
          </span>
          <button onClick={() => navigate('/contacts?filter=attention')} className="ml-auto text-xs text-amber-700 underline hover:no-underline">
            View all
          </button>
        </div>
      )}

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Active Pipeline', value: formatCurrency(pipelineValue), sub: `${visibleContacts.filter(c => !['committed', 'passed', 'current_lp'].includes(c.stage)).length} prospects`, icon: TrendingUp, color: 'bg-indigo-50 text-indigo-600' },
          { label: 'Committed YTD', value: formatCurrency(committedValue), sub: `${visibleContacts.filter(c => c.stage === 'committed').length} closes`, icon: DollarSign, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Meetings / Wk', value: meetingsThisWeek.toString(), sub: `${todayMeetings.length} today`, icon: Calendar, color: 'bg-violet-50 text-violet-600' },
          { label: 'Emails Sent / Wk', value: emailsSentThisWeek.toString(), sub: 'this week', icon: Mail, color: 'bg-blue-50 text-blue-600' },
        ].map(card => (
          <div key={card.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{card.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{card.value}</p>
                <p className="text-xs text-slate-400 mt-0.5">{card.sub}</p>
              </div>
              <div className={`p-2.5 rounded-xl ${card.color}`}>
                <card.icon size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-5 gap-5">
        {/* Left 3 cols */}
        <div className="col-span-3 space-y-5">
          {/* Fundraising progress */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Fundraising Progress</h3>
            <div className="space-y-5">
              {funds.map(fund => {
                const pct = (fund.committed / fund.target) * 100
                const remaining = fund.target - fund.committed
                return (
                  <div key={fund.id}>
                    <div className="flex items-baseline justify-between mb-2">
                      <div>
                        <span className="text-sm font-semibold text-slate-900">{fund.name}</span>
                        <span className="ml-2 text-xs text-slate-400">Vintage {fund.vintage}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-slate-900">{Math.round(pct)}%</span>
                        <span className="text-xs text-slate-400 ml-1">of target</span>
                      </div>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5 text-xs text-slate-400">
                      <span className="font-medium text-emerald-600">{formatCurrency(fund.committed)} committed</span>
                      <span>{formatCurrency(remaining)} remaining</span>
                      <span className="text-slate-500">Target: {formatCurrency(fund.target)}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Pipeline snapshot */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-800">Pipeline Snapshot</h3>
              <button onClick={() => navigate('/pipeline')} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                Full pipeline <ArrowRight size={12} />
              </button>
            </div>
            <div className="space-y-2.5">
              {pipelineByStage.map(({ stage, count, value }) => (
                <div key={stage} className="flex items-center gap-3">
                  <div className="w-24 text-xs text-slate-500 font-medium flex-shrink-0">{STAGE_LABELS[stage]}</div>
                  <div className="flex-1 h-5 bg-slate-100 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-lg flex items-center pl-2 transition-all duration-300"
                      style={{ width: `${(count / maxPipelineCount) * 100}%`, minWidth: count > 0 ? '24px' : '0' }}
                    >
                      {count > 0 && <span className="text-2xs text-white font-semibold">{count}</span>}
                    </div>
                  </div>
                  <div className="w-16 text-xs text-slate-400 text-right flex-shrink-0">
                    {value > 0 ? formatCurrency(value) : '—'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's meetings */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-800">Today's Schedule</h3>
              <button onClick={() => navigate('/calendar')} className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                Calendar <ArrowRight size={12} />
              </button>
            </div>
            {upcomingMeetings.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-sm">No meetings scheduled today</div>
            ) : (
              <div className="space-y-3">
                {upcomingMeetings.map(act => {
                  const contact = contacts.find(c => c.id === act.contactId)
                  const firm = contact ? firms.find(f => f.id === contact.firmId) : null
                  return (
                    <div key={act.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => contact && navigate(`/contacts/${contact.id}`)}>
                      <div className="w-12 text-xs text-indigo-600 font-semibold flex-shrink-0 mt-0.5">
                        {format(parseISO(act.date), 'h:mm a')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-800">{act.subject}</div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {contact?.firstName} {contact?.lastName} · {firm?.name}
                          {act.duration && ` · ${formatDuration(act.duration)}`}
                        </div>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); contact && openLogMeeting(contact.id) }}
                        className="text-xs text-slate-400 hover:text-indigo-600 flex-shrink-0">
                        + Log
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right 2 cols */}
        <div className="col-span-2 space-y-5">
          {/* Needs attention */}
          {needsAttention.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Needs Attention</h3>
              <div className="space-y-2">
                {needsAttention.slice(0, 5).map(c => {
                  const firm = firms.find(f => f.id === c.firmId)
                  const days = daysSince(c.lastContactDate)
                  const urgency = days > 35 ? 'bg-red-500' : 'bg-amber-400'
                  return (
                    <div key={c.id}
                      onClick={() => navigate(`/contacts/${c.id}`)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${urgency}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-800 truncate">
                          {c.firstName} {c.lastName}
                        </div>
                        <div className="text-xs text-slate-400 truncate">{firm?.name}</div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
                        <Clock size={11} />
                        {days}d
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Activity feed */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Recent Activity</h3>
            <div className="space-y-1">
              {recentActivities.map((act, i) => {
                const contact = contacts.find(c => c.id === act.contactId)
                const firm = contact ? firms.find(f => f.id === contact.firmId) : null
                const iconInfo = ACTIVITY_ICON[act.type] ?? ACTIVITY_ICON.note
                const Icon = iconInfo.icon

                return (
                  <div key={act.id}>
                    {/* Date separator */}
                    {(i === 0 || formatRelativeDate(recentActivities[i - 1].date) !== formatRelativeDate(act.date)) && (
                      <div className="py-1.5 mt-1">
                        <span className="text-2xs font-semibold text-slate-400 uppercase tracking-wider">
                          {formatRelativeDate(act.date)}
                        </span>
                      </div>
                    )}
                    <div
                      onClick={() => contact && navigate(`/contacts/${contact.id}`)}
                      className="flex items-start gap-3 py-2 px-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${iconInfo.color}`}>
                        <Icon size={11} />
                      </div>
                      <div className="flex-1 min-w-0">
                        {act.type === 'stage_change' ? (
                          <div className="text-sm text-slate-700">
                            <span className="font-medium">{contact?.firstName} {contact?.lastName}</span>
                            <span className="text-slate-400"> moved to </span>
                            <StageBadge stage={act.newStage!} size="xs" />
                          </div>
                        ) : (
                          <>
                            <div className="text-sm text-slate-800 truncate font-medium">{act.subject}</div>
                            <div className="text-xs text-slate-400 truncate">
                              {contact?.firstName} {contact?.lastName} · {firm?.name}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
