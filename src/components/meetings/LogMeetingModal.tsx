import { useState } from 'react'
import { Modal } from '../ui/Modal'
import { useApp } from '../../context/AppContext'
import type { Activity, Stage } from '../../types'
import { STAGE_LABELS, STAGE_ORDER } from '../../utils/format'

export function LogMeetingModal() {
  const { logMeetingContactId, closeLogMeeting, addActivity, updateContactStage, currentUserId, contacts } = useApp()

  const contact = contacts.find(c => c.id === logMeetingContactId)

  const [type, setType] = useState<'meeting' | 'call'>('meeting')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [time, setTime] = useState('10:00')
  const [duration, setDuration] = useState('60')
  const [location, setLocation] = useState('')
  const [subject, setSubject] = useState('')
  const [notes, setNotes] = useState('')
  const [outcome, setOutcome] = useState<'positive' | 'neutral' | 'negative'>('positive')
  const [updateStage, setUpdateStage] = useState(false)
  const [newStage, setNewStage] = useState<Stage>(contact?.stage ?? 'outreach')
  const [saved, setSaved] = useState(false)

  function handleSave() {
    if (!logMeetingContactId || !contact) return
    const activity: Activity = {
      id: `act-${Date.now()}`,
      type,
      contactId: logMeetingContactId,
      ownerId: currentUserId,
      date: new Date(`${date}T${time}:00`).toISOString(),
      subject: subject || (type === 'meeting' ? 'Meeting' : 'Call'),
      body: notes,
      duration: parseInt(duration),
      location,
      outcome,
      ...(updateStage ? { previousStage: contact.stage, newStage } : {}),
    }
    addActivity(activity)
    if (updateStage && newStage !== contact.stage) {
      updateContactStage(logMeetingContactId, newStage)
      const stageActivity: Activity = {
        id: `act-${Date.now() + 1}`,
        type: 'stage_change',
        contactId: logMeetingContactId,
        ownerId: currentUserId,
        date: new Date().toISOString(),
        previousStage: contact.stage,
        newStage,
      }
      addActivity(stageActivity)
    }
    setSaved(true)
    setTimeout(() => {
      closeLogMeeting()
      setSaved(false)
      setSubject('')
      setNotes('')
      setUpdateStage(false)
    }, 800)
  }

  return (
    <Modal open={!!logMeetingContactId} onClose={closeLogMeeting} title={`Log ${type === 'meeting' ? 'Meeting' : 'Call'}`} width="max-w-xl">
      <div className="p-6 space-y-5">
        {/* Type toggle */}
        <div className="flex rounded-xl border border-slate-200 overflow-hidden w-fit">
          {(['meeting', 'call'] as const).map(t => (
            <button key={t} onClick={() => setType(t)}
              className={`px-5 py-2 text-sm font-medium transition-colors ${type === t ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
              {t === 'meeting' ? 'Meeting' : 'Phone / Video Call'}
            </button>
          ))}
        </div>

        {/* Contact */}
        {contact && (
          <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-lg">
            <span className="font-medium text-slate-900">{contact.firstName} {contact.lastName}</span>
            <span className="text-slate-400">—</span>
            <span className="text-slate-500">{contact.title}</span>
          </div>
        )}

        {/* Date / Time / Duration */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Time</label>
            <input type="time" value={time} onChange={e => setTime(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Duration</label>
            <select value={duration} onChange={e => setDuration(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 bg-white">
              {[15, 30, 45, 60, 90, 120].map(d => (
                <option key={d} value={d}>{d < 60 ? `${d} min` : `${d / 60}h`}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Location */}
        {type === 'meeting' && (
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Location</label>
            <input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Video Call (Teams), New York (their offices)..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100" />
          </div>
        )}

        {/* Subject */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Subject / Purpose</label>
          <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="e.g. Power Fund III Due Diligence Call"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100" />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Notes & Key Takeaways</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={4} placeholder="What was discussed? What are the next steps?"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 resize-none" />
        </div>

        {/* Outcome */}
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-2">Outcome</label>
          <div className="flex gap-2">
            {(['positive', 'neutral', 'negative'] as const).map(o => (
              <button key={o} onClick={() => setOutcome(o)}
                className={`flex-1 py-1.5 text-sm rounded-lg border font-medium transition-colors capitalize ${
                  outcome === o
                    ? o === 'positive' ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    : o === 'neutral' ? 'bg-amber-50 border-amber-300 text-amber-700'
                    : 'bg-red-50 border-red-300 text-red-600'
                    : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}>
                {o === 'positive' ? '✓ Positive' : o === 'neutral' ? '◦ Neutral' : '✗ Negative'}
              </button>
            ))}
          </div>
        </div>

        {/* Stage update */}
        <div className="border border-slate-200 rounded-xl p-4 space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={updateStage} onChange={e => setUpdateStage(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600" />
            <span className="text-sm font-medium text-slate-700">Update pipeline stage</span>
          </label>
          {updateStage && (
            <select value={newStage} onChange={e => setNewStage(e.target.value as Stage)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 bg-white">
              {STAGE_ORDER.map(s => (
                <option key={s} value={s}>{STAGE_LABELS[s]}</option>
              ))}
            </select>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-1">
          <button onClick={closeLogMeeting} className="px-4 py-2 text-sm text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} disabled={saved}
            className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-60">
            {saved ? 'Saved ✓' : 'Save Activity'}
          </button>
        </div>
      </div>
    </Modal>
  )
}
