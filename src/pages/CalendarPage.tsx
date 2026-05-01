import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Plus, Video, Phone, MapPin, ExternalLink, Clock } from 'lucide-react'
import {
  format, parseISO, startOfWeek, endOfWeek, addDays, addMonths,
  isSameDay, isSameMonth, startOfMonth, endOfMonth, eachDayOfInterval,
} from 'date-fns'
import { Layout } from '../components/layout/Layout'
import { StageBadge } from '../components/ui/Badge'
import { useApp } from '../context/AppContext'
import { firms, teamMembers } from '../data/mockData'
import { formatDuration } from '../utils/format'

type CalView = 'week' | 'month'

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function CalendarPage() {
  const { contacts, activities, viewMode, currentUserId, openLogMeeting } = useApp()
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [calView, setCalView] = useState<CalView>('week')

  const baseActivities = viewMode === 'personal'
    ? activities.filter(a => a.ownerId === currentUserId)
    : activities

  const meetings = baseActivities
    .filter(a => a.type === 'meeting' || a.type === 'call')
    .sort((a, b) => b.date.localeCompare(a.date))

  // Week helpers
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 })
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  // Month helpers
  const monthStart = startOfMonth(selectedDate)
  const monthEnd = endOfMonth(selectedDate)
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 })
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })
  const calDays = eachDayOfInterval({ start: gridStart, end: gridEnd })

  function prevPeriod() {
    setSelectedDate(d => calView === 'week' ? addDays(d, -7) : addMonths(d, -1))
  }
  function nextPeriod() {
    setSelectedDate(d => calView === 'week' ? addDays(d, 7) : addMonths(d, 1))
  }

  const dayMeetings = meetings.filter(m => isSameDay(parseISO(m.date), selectedDate))
  const upcoming = meetings.slice(0, 10)

  function DayDetail() {
    if (dayMeetings.length === 0) {
      return (
        <div className="text-center py-10 text-slate-400">
          <Calendar size={28} className="mx-auto mb-2 opacity-30" />
          <div className="text-sm">No meetings on {isSameDay(selectedDate, new Date()) ? 'today' : format(selectedDate, 'MMM d')}</div>
        </div>
      )
    }
    return (
      <div className="space-y-3">
        {dayMeetings.map(act => {
          const contact = contacts.find(c => c.id === act.contactId)
          const firm = contact ? firms.find(f => f.id === contact.firmId) : null
          const loc = (act.location ?? '').toLowerCase()
          const isVideo = loc.includes('zoom') || loc.includes('teams') || loc.includes('video')
          const isPhone = act.type === 'call' || loc.includes('phone')
          return (
            <div key={act.id}
              className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all cursor-pointer"
              onClick={() => contact && navigate(`/contacts/${contact.id}`)}>
              <div className="text-center w-14 flex-shrink-0">
                <div className="text-sm font-bold text-indigo-600">{format(parseISO(act.date), 'h:mm')}</div>
                <div className="text-xs text-slate-400">{format(parseISO(act.date), 'a')}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-slate-900">{act.subject}</div>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                  {contact && <span>{contact.firstName} {contact.lastName}</span>}
                  {firm && <span className="text-slate-400">{firm.name}</span>}
                  {act.duration && <span className="flex items-center gap-1"><Clock size={10} />{formatDuration(act.duration)}</span>}
                </div>
                {act.location && (
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                    {isPhone ? <Phone size={10} /> : isVideo ? <Video size={10} /> : <MapPin size={10} />}
                    {act.location}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {contact && <StageBadge stage={contact.stage} size="xs" />}
                <button
                  onClick={e => { e.stopPropagation(); contact && openLogMeeting(contact.id) }}
                  className="text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-2 py-1 rounded-lg font-medium transition-colors">
                  Log
                </button>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Layout title="Calendar">
      {/* Outlook banner */}
      <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-2xl mb-6">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">O</span>
        </div>
        <div>
          <div className="text-sm font-semibold text-blue-900">Connect Outlook Calendar</div>
          <div className="text-xs text-blue-600">Sync your meetings and automatically log them as CRM activities</div>
        </div>
        <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors">
          <ExternalLink size={14} /> Connect Outlook
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Left 2/3: calendar */}
        <div className="col-span-2 space-y-4">

          {/* Header bar: nav + view toggle */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              {/* Month/Week label + nav */}
              <div className="flex items-center gap-2">
                <button onClick={prevPeriod}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-sm leading-none">←</button>
                <h3 className="text-sm font-semibold text-slate-800 min-w-[140px] text-center">
                  {calView === 'week'
                    ? `${format(weekStart, 'MMM d')} – ${format(addDays(weekStart, 6), 'MMM d, yyyy')}`
                    : format(selectedDate, 'MMMM yyyy')}
                </h3>
                <button onClick={nextPeriod}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors text-sm leading-none">→</button>
                <button onClick={() => setSelectedDate(new Date())}
                  className="ml-1 px-2.5 py-1 rounded-lg text-xs text-indigo-600 hover:bg-indigo-50 transition-colors font-medium">
                  Today
                </button>
              </div>

              {/* View toggle */}
              <div className="flex rounded-xl border border-slate-200 overflow-hidden bg-slate-50 p-0.5 gap-0.5">
                {(['week', 'month'] as CalView[]).map(v => (
                  <button key={v} onClick={() => setCalView(v)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                      calView === v ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'
                    }`}>
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* ── WEEK VIEW ── */}
            {calView === 'week' && (
              <div className="grid grid-cols-7 gap-1 mt-4">
                {weekDays.map(day => {
                  const dayMtgs = meetings.filter(m => isSameDay(parseISO(m.date), day))
                  const isToday = isSameDay(day, new Date())
                  const isSelected = isSameDay(day, selectedDate)
                  return (
                    <button key={day.toISOString()} onClick={() => setSelectedDate(day)}
                      className={`flex flex-col items-center py-2.5 rounded-xl transition-colors ${
                        isSelected ? 'bg-indigo-600 text-white' :
                        isToday ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-600'
                      }`}>
                      <span className="text-2xs font-semibold uppercase tracking-wide opacity-60">{format(day, 'EEE')}</span>
                      <span className={`text-base font-bold mt-0.5`}>{format(day, 'd')}</span>
                      {dayMtgs.length > 0 && (
                        <div className={`w-1 h-1 rounded-full mt-1 ${isSelected ? 'bg-white' : 'bg-indigo-500'}`} />
                      )}
                    </button>
                  )
                })}
              </div>
            )}

            {/* ── MONTH VIEW ── */}
            {calView === 'month' && (
              <div className="mt-4">
                {/* Day-of-week headers */}
                <div className="grid grid-cols-7 mb-1">
                  {WEEK_DAYS.map(d => (
                    <div key={d} className="text-center text-2xs font-semibold text-slate-400 uppercase tracking-wide py-1">{d}</div>
                  ))}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7 gap-px bg-slate-100 rounded-xl overflow-hidden border border-slate-100">
                  {calDays.map(day => {
                    const dayMtgs = meetings.filter(m => isSameDay(parseISO(m.date), day))
                    const inMonth = isSameMonth(day, selectedDate)
                    const isToday = isSameDay(day, new Date())
                    const isSelected = isSameDay(day, selectedDate)
                    const visible = dayMtgs.slice(0, 3)
                    const overflow = dayMtgs.length - visible.length

                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => setSelectedDate(day)}
                        className={`bg-white min-h-[80px] p-2 text-left flex flex-col transition-colors hover:bg-indigo-50/40 ${
                          isSelected ? 'bg-indigo-50' : ''
                        } ${!inMonth ? 'opacity-40' : ''}`}
                      >
                        {/* Day number */}
                        <span className={`text-xs font-semibold self-start w-6 h-6 flex items-center justify-center rounded-full mb-1 ${
                          isToday ? 'bg-indigo-600 text-white' :
                          isSelected ? 'bg-indigo-100 text-indigo-700' :
                          'text-slate-600'
                        }`}>
                          {format(day, 'd')}
                        </span>

                        {/* Meeting pills */}
                        <div className="space-y-0.5 w-full">
                          {visible.map(act => {
                            const contact = contacts.find(c => c.id === act.contactId)
                            const isCall = act.type === 'call'
                            return (
                              <div key={act.id}
                                className={`text-2xs px-1.5 py-0.5 rounded-md font-medium truncate ${
                                  isCall
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-indigo-50 text-indigo-700'
                                }`}>
                                {contact ? `${contact.firstName} ${contact.lastName[0]}.` : 'Meeting'}
                              </div>
                            )
                          })}
                          {overflow > 0 && (
                            <div className="text-2xs text-slate-400 pl-1">+{overflow} more</div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Selected day detail */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-slate-800">
                {isSameDay(selectedDate, new Date()) ? 'Today' : format(selectedDate, 'EEEE, MMMM d')}
                {dayMeetings.length > 0 && (
                  <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 rounded-full px-2 py-0.5 font-medium">
                    {dayMeetings.length} {dayMeetings.length === 1 ? 'meeting' : 'meetings'}
                  </span>
                )}
              </h3>
              <button className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                <Plus size={12} /> Schedule
              </button>
            </div>
            <DayDetail />
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Recent Meetings</h3>
            <div className="space-y-3">
              {upcoming.map(act => {
                const contact = contacts.find(c => c.id === act.contactId)
                const firm = contact ? firms.find(f => f.id === contact.firmId) : null
                const outcomeColor = act.outcome === 'positive' ? 'bg-emerald-500' : act.outcome === 'negative' ? 'bg-red-400' : 'bg-amber-400'
                return (
                  <div key={act.id}
                    onClick={() => contact && navigate(`/contacts/${contact.id}`)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${outcomeColor}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-800 truncate">{act.subject}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {contact?.firstName} {contact?.lastName}
                        {firm && <span className="text-slate-400"> · {firm.name}</span>}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {format(parseISO(act.date), 'MMM d')}
                        {act.duration && ` · ${formatDuration(act.duration)}`}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 mb-4">Meeting Stats</h3>
            {['This Week', 'This Month', 'YTD'].map((label, i) => {
              const counts = [
                meetings.filter(m => { const d = new Date(m.date); return d >= addDays(new Date(), -7) }).length,
                meetings.filter(m => { const d = new Date(m.date); return d >= addDays(new Date(), -30) }).length,
                meetings.length,
              ]
              return (
                <div key={label} className="flex justify-between items-center py-1.5">
                  <span className="text-sm text-slate-500">{label}</span>
                  <span className="text-sm font-bold text-slate-800">{counts[i]}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}
