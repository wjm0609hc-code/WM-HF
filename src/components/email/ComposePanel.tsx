import { useState } from 'react'
import { X, Minimize2, Send, Paperclip, ChevronDown } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import type { Activity } from '../../types'

export function ComposePanel() {
  const { composeState, closeCompose, addActivity, currentUserId } = useApp()
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [cc, setCc] = useState('')
  const [minimized, setMinimized] = useState(false)
  const [sent, setSent] = useState(false)

  if (!composeState) return null

  function handleSend() {
    if (!composeState) return
    const activity: Activity = {
      id: `act-${Date.now()}`,
      type: 'email_sent',
      contactId: composeState.contactId,
      ownerId: currentUserId,
      date: new Date().toISOString(),
      subject: subject || '(no subject)',
      body,
    }
    addActivity(activity)
    setSent(true)
    setTimeout(() => {
      closeCompose()
      setSent(false)
      setSubject('')
      setBody('')
      setCc('')
    }, 1200)
  }

  return (
    <div className={`fixed bottom-0 right-6 z-50 w-[540px] bg-white rounded-t-2xl shadow-2xl border border-slate-200 flex flex-col transition-all duration-200 ${minimized ? 'h-12' : 'h-[480px]'}`}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 bg-slate-900 rounded-t-2xl cursor-pointer"
        onClick={() => setMinimized(m => !m)}
      >
        <span className="text-sm font-medium text-white">
          {subject || `New Message to ${composeState.toName}`}
        </span>
        <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
          <button onClick={() => setMinimized(m => !m)} className="p-1 text-slate-300 hover:text-white">
            <Minimize2 size={14} />
          </button>
          <button onClick={closeCompose} className="p-1 text-slate-300 hover:text-white">
            <X size={14} />
          </button>
        </div>
      </div>

      {!minimized && (
        <>
          {/* Fields */}
          <div className="border-b border-slate-100 px-4 py-2 flex items-center gap-2">
            <span className="text-xs text-slate-400 w-6">To</span>
            <input
              readOnly
              value={`${composeState.toName} <${composeState.toEmail}>`}
              className="flex-1 text-sm text-slate-700 bg-transparent outline-none"
            />
          </div>
          <div className="border-b border-slate-100 px-4 py-2 flex items-center gap-2">
            <span className="text-xs text-slate-400 w-6">Cc</span>
            <input
              value={cc}
              onChange={e => setCc(e.target.value)}
              placeholder="Add recipients..."
              className="flex-1 text-sm text-slate-700 bg-transparent outline-none placeholder-slate-300"
            />
          </div>
          <div className="border-b border-slate-100 px-4 py-2 flex items-center gap-2">
            <span className="text-xs text-slate-400 w-6 flex-shrink-0">Sub</span>
            <input
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Subject"
              className="flex-1 text-sm text-slate-700 bg-transparent outline-none placeholder-slate-300 font-medium"
            />
          </div>

          {/* Body */}
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder={`Dear ${composeState.toName.split(' ')[0]},\n\n`}
            className="flex-1 px-4 py-3 text-sm text-slate-700 resize-none outline-none placeholder-slate-300 leading-relaxed"
            autoFocus
          />

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                <Paperclip size={15} />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={closeCompose} className="px-3 py-1.5 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                Discard
              </button>
              <button
                onClick={handleSend}
                disabled={sent}
                className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-60"
              >
                {sent ? 'Sent ✓' : <><Send size={14} /> Send</>}
              </button>
            </div>
          </div>

          {/* Outlook badge */}
          <div className="px-4 pb-2 flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold" style={{ fontSize: '7px' }}>O</span>
            </div>
            <span className="text-2xs text-slate-400">Will sync to Outlook on send</span>
            <ChevronDown size={10} className="text-slate-300" />
          </div>
        </>
      )}
    </div>
  )
}
