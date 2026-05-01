import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, Globe, Linkedin, MapPin, DollarSign, Calendar, ChevronDown, Edit3, StickyNote, Users, PhoneCall, Send } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { Layout } from '../components/layout/Layout'
import { StageBadge, StrategyBadge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { useApp } from '../context/AppContext'
import { firms, teamMembers } from '../data/mockData'
import { formatCheckSize, formatAUM, formatDate, formatRelativeDate, formatDuration, STAGE_LABELS, STAGE_ORDER } from '../utils/format'
import type { Stage, ActivityType } from '../types'

const ACTIVITY_CONFIG: Record<ActivityType, { label: string; icon: typeof Mail; bg: string; text: string }> = {
  email_sent:     { label: 'Email Sent',     icon: Send,      bg: 'bg-blue-50',    text: 'text-blue-600' },
  email_received: { label: 'Email Received', icon: Mail,      bg: 'bg-violet-50',  text: 'text-violet-600' },
  meeting:        { label: 'Meeting',        icon: Users,     bg: 'bg-indigo-50',  text: 'text-indigo-600' },
  call:           { label: 'Call',           icon: PhoneCall, bg: 'bg-emerald-50', text: 'text-emerald-600' },
  note:           { label: 'Note',           icon: StickyNote, bg: 'bg-amber-50',  text: 'text-amber-600' },
  stage_change:   { label: 'Stage Updated',  icon: ChevronDown, bg: 'bg-slate-100', text: 'text-slate-500' },
}

export default function ContactDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { contacts, activities, updateContactStage, updateContactNotes, openCompose, openLogMeeting } = useApp()

  const contact = contacts.find(c => c.id === id)
  const firm = contact ? firms.find(f => f.id === contact.firmId) : null
  const owner = contact ? teamMembers.find(t => t.id === contact.ownerId) : null

  const [editingNotes, setEditingNotes] = useState(false)
  const [notesValue, setNotesValue] = useState(contact?.notes ?? '')
  const [stageDropdown, setStageDropdown] = useState(false)
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null)

  if (!contact) {
    return (
      <Layout title="Contact Not Found">
        <div className="text-center py-20 text-slate-400">Contact not found. <Link to="/contacts" className="text-indigo-600 underline">Back to contacts</Link></div>
      </Layout>
    )
  }

  const contactActivities = activities
    .filter(a => a.contactId === id)
    .sort((a, b) => b.date.localeCompare(a.date))

  function handleStageChange(stage: Stage) {
    updateContactStage(id!, stage)
    setStageDropdown(false)
  }

  function handleSaveNotes() {
    updateContactNotes(id!, notesValue)
    setEditingNotes(false)
  }

  return (
    <Layout title={`${contact.firstName} ${contact.lastName}`}>
      {/* Back */}
      <button onClick={() => navigate('/contacts')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-5 transition-colors">
        <ArrowLeft size={15} /> Back to Contacts
      </button>

      {/* Action bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Avatar initials={`${contact.firstName[0]}${contact.lastName[0]}`} color="#6366f1" size="lg" />
          <div>
            <h2 className="text-xl font-bold text-slate-900">{contact.firstName} {contact.lastName}</h2>
            <div className="flex items-center gap-2 mt-0.5 text-sm text-slate-500">
              <span>{contact.title}</span>
              <span className="text-slate-300">·</span>
              <Link to={`/firms/${firm?.id}`} className="text-indigo-600 hover:underline">{firm?.name}</Link>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openCompose({ contactId: contact.id, toEmail: contact.email, toName: `${contact.firstName} ${contact.lastName}` })}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-700 transition-colors shadow-sm"
          >
            <Mail size={14} /> Send Email
          </button>
          <button
            onClick={() => openLogMeeting(contact.id)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-700 transition-colors shadow-sm"
          >
            <Calendar size={14} /> Log Meeting
          </button>
          <button
            onClick={() => openLogMeeting(contact.id)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-xl text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            <PhoneCall size={14} /> Log Call
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-5">
        {/* Left panel */}
        <div className="col-span-2 space-y-4">
          {/* Stage */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Pipeline Stage</span>
              <div className="relative">
                <button
                  onClick={() => setStageDropdown(s => !s)}
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <StageBadge stage={contact.stage} />
                  <ChevronDown size={13} className="text-slate-400" />
                </button>
                {stageDropdown && (
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-10 w-44">
                    {STAGE_ORDER.map(s => (
                      <button key={s} onClick={() => handleStageChange(s)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 transition-colors text-left ${s === contact.stage ? 'bg-indigo-50' : ''}`}>
                        <StageBadge stage={s} size="xs" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1">
              {STAGE_ORDER.filter(s => s !== 'passed' && s !== 'current_lp').map((s, i, arr) => {
                const currentIdx = arr.indexOf(contact.stage as typeof arr[number])
                const thisIdx = arr.indexOf(s)
                const isPast = thisIdx < currentIdx
                const isCurrent = s === contact.stage
                return (
                  <div key={s} className="flex items-center flex-1 last:flex-none">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isCurrent ? 'bg-indigo-600' : isPast ? 'bg-indigo-300' : 'bg-slate-200'}`} />
                    {i < arr.length - 1 && <div className={`flex-1 h-0.5 mx-0.5 ${isPast ? 'bg-indigo-300' : 'bg-slate-200'}`} />}
                  </div>
                )
              })}
            </div>
            <div className="text-xs text-slate-400 mt-2">{contact.daysInCurrentStage} days in current stage</div>
          </div>

          {/* Contact info */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Contact Info</span>
            <div className="space-y-2.5 mt-2">
              <a href={`mailto:${contact.email}`}
                className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-indigo-700 transition-colors">
                <Mail size={14} className="text-slate-400 flex-shrink-0" />
                <span className="truncate">{contact.email}</span>
              </a>
              {contact.phone && (
                <div className="flex items-center gap-2.5 text-sm text-slate-700">
                  <Phone size={14} className="text-slate-400 flex-shrink-0" />
                  {contact.phone}
                </div>
              )}
              {firm && (
                <div className="flex items-center gap-2.5 text-sm text-slate-700">
                  <MapPin size={14} className="text-slate-400 flex-shrink-0" />
                  {firm.city}, {firm.state} {firm.zip}
                </div>
              )}
              {contact.linkedIn && (
                <a href={`https://linkedin.com/in/${contact.linkedIn}`} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2.5 text-sm text-slate-700 hover:text-indigo-700 transition-colors">
                  <Linkedin size={14} className="text-slate-400 flex-shrink-0" />
                  LinkedIn Profile
                </a>
              )}
            </div>
          </div>

          {/* Firm summary */}
          {firm && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Firm</span>
                <Link to={`/firms/${firm.id}`} className="text-xs text-indigo-600 hover:underline">View firm →</Link>
              </div>
              <div className="font-semibold text-slate-900 mb-1">{firm.name}</div>
              <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-2">
                <Globe size={12} />
                {firm.city}, {firm.state} · {firm.country}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <DollarSign size={12} />
                {formatAUM(firm.aum)} AUM
              </div>
            </div>
          )}

          {/* Deal parameters */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Deal Parameters</span>
            <div className="mt-3 space-y-2.5">
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Check Size</span>
                <span className="text-sm font-semibold text-slate-800">{formatCheckSize(contact.checkSizeMin, contact.checkSizeMax)}</span>
              </div>
              {contact.expectedCommitment && (
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Expected</span>
                  <span className="text-sm font-semibold text-emerald-700">${contact.expectedCommitment}M</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-slate-500">Last Contact</span>
                <span className="text-sm font-medium text-slate-700">{formatDate(contact.lastContactDate)}</span>
              </div>
              {contact.nextFollowUpDate && (
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Follow-up</span>
                  <span className="text-sm font-medium text-indigo-700">{formatDate(contact.nextFollowUpDate)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Strategy tags */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Strategy Interest</span>
            <div className="flex flex-wrap gap-2 mt-3">
              {contact.strategyTags.map(t => <StrategyBadge key={t} tag={t} />)}
            </div>
          </div>

          {/* Owner */}
          {owner && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Relationship Owner</span>
              <div className="flex items-center gap-3 mt-3">
                <Avatar initials={owner.initials} color={owner.color} size="md" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">{owner.name}</div>
                  <div className="text-xs text-slate-500">{owner.title}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right panel — timeline */}
        <div className="col-span-3 space-y-4">
          {/* Bio */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Background</span>
            <p className="text-sm text-slate-700 leading-relaxed mt-3">{contact.bio}</p>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Notes</span>
              {!editingNotes
                ? <button onClick={() => { setNotesValue(contact.notes ?? ''); setEditingNotes(true) }}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-600 transition-colors">
                    <Edit3 size={12} /> Edit
                  </button>
                : <div className="flex gap-2">
                    <button onClick={() => setEditingNotes(false)} className="text-xs text-slate-400 hover:text-slate-600">Cancel</button>
                    <button onClick={handleSaveNotes} className="text-xs text-indigo-600 font-medium hover:text-indigo-800">Save</button>
                  </div>
              }
            </div>
            {editingNotes
              ? <textarea value={notesValue} onChange={e => setNotesValue(e.target.value)} rows={5} autoFocus
                  className="w-full text-sm text-slate-700 leading-relaxed outline-none border border-slate-200 rounded-xl p-3 resize-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-100" />
              : contact.notes
                ? <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{contact.notes}</p>
                : <p className="text-sm text-slate-400 italic">No notes yet. Click Edit to add context.</p>
            }
          </div>

          {/* Activity timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Activity Timeline</h3>
            {contactActivities.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-sm">No activity recorded yet.</div>
            ) : (
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-100" />
                <div className="space-y-1">
                  {contactActivities.map(act => {
                    const cfg = ACTIVITY_CONFIG[act.type]
                    const Icon = cfg.icon
                    const isExpanded = expandedActivity === act.id

                    return (
                      <div key={act.id} className="relative pl-10">
                        <div className={`absolute left-2.5 top-3 w-3 h-3 rounded-full border-2 border-white ${cfg.bg} flex items-center justify-center`}>
                          <Icon size={6} className={cfg.text} />
                        </div>

                        <div className={`rounded-xl p-3 transition-colors cursor-pointer ${isExpanded ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
                          onClick={() => setExpandedActivity(isExpanded ? null : act.id)}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              {act.type === 'stage_change' ? (
                                <div className="text-sm text-slate-700">
                                  Stage changed: <span className="text-slate-400">{act.previousStage && STAGE_LABELS[act.previousStage]}</span>
                                  <span className="mx-1.5 text-slate-300">→</span>
                                  <StageBadge stage={act.newStage!} size="xs" />
                                </div>
                              ) : (
                                <>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-xs font-semibold ${cfg.text} ${cfg.bg} px-1.5 py-0.5 rounded-md`}>{cfg.label}</span>
                                    {act.duration && <span className="text-xs text-slate-400">{formatDuration(act.duration)}</span>}
                                    {act.outcome && (
                                      <span className={`text-xs font-medium ${
                                        act.outcome === 'positive' ? 'text-emerald-600' :
                                        act.outcome === 'neutral' ? 'text-amber-600' : 'text-red-500'
                                      }`}>
                                        {act.outcome === 'positive' ? '↑' : act.outcome === 'neutral' ? '◦' : '↓'}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-sm font-medium text-slate-800 mt-1 truncate">{act.subject}</div>
                                </>
                              )}
                            </div>
                            <div className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0 mt-0.5">
                              {formatRelativeDate(act.date)}
                            </div>
                          </div>

                          {/* Expanded body */}
                          {isExpanded && act.body && (
                            <div className="mt-3 pt-3 border-t border-slate-100 text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                              {act.body}
                            </div>
                          )}
                          {isExpanded && act.location && (
                            <div className="mt-2 text-xs text-slate-400 flex items-center gap-1">
                              <MapPin size={11} /> {act.location}
                            </div>
                          )}
                          {isExpanded && (
                            <div className="mt-1 text-xs text-slate-400">
                              {format(parseISO(act.date), 'MMMM d, yyyy · h:mm a')}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
