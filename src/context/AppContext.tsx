import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Contact, Activity } from '../types'
import { contacts as initialContacts, activities as initialActivities, CURRENT_USER_ID } from '../data/mockData'

interface ComposeState {
  contactId: string
  toEmail: string
  toName: string
}

interface AppContextValue {
  contacts: Contact[]
  activities: Activity[]
  viewMode: 'personal' | 'team'
  setViewMode: (m: 'personal' | 'team') => void
  currentUserId: string
  updateContactStage: (contactId: string, stage: Contact['stage']) => void
  updateContactNotes: (contactId: string, notes: string) => void
  addActivity: (activity: Activity) => void
  composeState: ComposeState | null
  openCompose: (state: ComposeState) => void
  closeCompose: () => void
  logMeetingContactId: string | null
  openLogMeeting: (contactId: string) => void
  closeLogMeeting: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [activities, setActivities] = useState<Activity[]>(initialActivities)
  const [viewMode, setViewMode] = useState<'personal' | 'team'>('personal')
  const [composeState, setComposeState] = useState<ComposeState | null>(null)
  const [logMeetingContactId, setLogMeetingContactId] = useState<string | null>(null)

  function updateContactStage(contactId: string, stage: Contact['stage']) {
    setContacts(prev => prev.map(c => c.id === contactId ? { ...c, stage, daysInCurrentStage: 0 } : c))
  }

  function updateContactNotes(contactId: string, notes: string) {
    setContacts(prev => prev.map(c => c.id === contactId ? { ...c, notes } : c))
  }

  function addActivity(activity: Activity) {
    setActivities(prev => [activity, ...prev])
    if (activity.type === 'email_sent' || activity.type === 'email_received' || activity.type === 'meeting' || activity.type === 'call') {
      setContacts(prev => prev.map(c =>
        c.id === activity.contactId ? { ...c, lastContactDate: activity.date.split('T')[0] } : c
      ))
    }
  }

  return (
    <AppContext.Provider value={{
      contacts, activities, viewMode, setViewMode,
      currentUserId: CURRENT_USER_ID,
      updateContactStage, updateContactNotes, addActivity,
      composeState, openCompose: setComposeState, closeCompose: () => setComposeState(null),
      logMeetingContactId, openLogMeeting: setLogMeetingContactId, closeLogMeeting: () => setLogMeetingContactId(null),
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
