import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Send, Inbox, ExternalLink } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { Layout } from '../components/layout/Layout'
import { StageBadge } from '../components/ui/Badge'
import { useApp } from '../context/AppContext'
import { firms } from '../data/mockData'

export default function EmailActivity() {
  const { contacts, activities, viewMode, currentUserId, openCompose } = useApp()
  const navigate = useNavigate()
  const [tab, setTab] = useState<'sent' | 'received' | 'all'>('all')

  const base = viewMode === 'personal'
    ? activities.filter(a => a.ownerId === currentUserId)
    : activities

  const emails = base
    .filter(a => {
      if (tab === 'sent') return a.type === 'email_sent'
      if (tab === 'received') return a.type === 'email_received'
      return a.type === 'email_sent' || a.type === 'email_received'
    })
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <Layout title="Email Activity">
      {/* Outlook banner */}
      <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-2xl mb-6">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">O</span>
        </div>
        <div>
          <div className="text-sm font-semibold text-blue-900">Outlook Integration Active</div>
          <div className="text-xs text-blue-600">Emails to tracked contacts auto-log here. Last synced: just now</div>
        </div>
        <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-700 text-sm font-medium rounded-xl hover:bg-blue-50 transition-colors">
          <ExternalLink size={14} /> Open Outlook
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-white border border-slate-200 rounded-xl p-1 w-fit">
        {(['all', 'sent', 'received'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg capitalize transition-colors ${
              tab === t ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-700'
            }`}>
            {t === 'all' ? 'All Emails' : t === 'sent' ? 'Sent' : 'Received'}
          </button>
        ))}
      </div>

      {/* Email list */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {emails.map((email, i) => {
          const contact = contacts.find(c => c.id === email.contactId)
          const firm = contact ? firms.find(f => f.id === contact.firmId) : null
          const isSent = email.type === 'email_sent'

          return (
            <div key={email.id}
              className={`flex items-start gap-4 px-5 py-4 hover:bg-slate-50 cursor-pointer transition-colors ${i > 0 ? 'border-t border-slate-100' : ''}`}
              onClick={() => contact && navigate(`/contacts/${contact.id}`)}>
              <div className={`mt-0.5 p-2 rounded-lg flex-shrink-0 ${isSent ? 'bg-blue-50 text-blue-600' : 'bg-violet-50 text-violet-600'}`}>
                {isSent ? <Send size={14} /> : <Inbox size={14} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-sm text-slate-900 truncate">{email.subject}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{isSent ? 'To' : 'From'}: <span className="font-medium">{contact?.firstName} {contact?.lastName}</span></span>
                  <span className="text-slate-300">·</span>
                  <span>{firm?.name}</span>
                  {contact && <StageBadge stage={contact.stage} size="xs" />}
                </div>
                {email.body && (
                  <p className="text-xs text-slate-400 mt-1 truncate">{email.body.substring(0, 120)}...</p>
                )}
              </div>
              <div className="text-xs text-slate-400 flex-shrink-0 mt-0.5">
                {format(parseISO(email.date), 'MMM d')}
              </div>
              <button
                onClick={e => {
                  e.stopPropagation()
                  contact && openCompose({ contactId: contact.id, toEmail: contact.email, toName: `${contact.firstName} ${contact.lastName}` })
                }}
                className="flex-shrink-0 px-3 py-1.5 text-xs bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium">
                Reply
              </button>
            </div>
          )
        })}
        {emails.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Mail size={32} className="mx-auto mb-2 opacity-30" />
            <div className="text-sm">No emails found</div>
          </div>
        )}
      </div>
    </Layout>
  )
}
