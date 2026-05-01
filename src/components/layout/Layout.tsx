import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { ComposePanel } from '../email/ComposePanel'
import { LogMeetingModal } from '../meetings/LogMeetingModal'

export function Layout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <Header title={title} />
      <main className="ml-60 pt-14 min-h-screen">
        <div className="p-6">{children}</div>
      </main>
      <ComposePanel />
      <LogMeetingModal />
    </div>
  )
}
