import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import Contacts from './pages/Contacts'
import ContactDetail from './pages/ContactDetail'
import Firms from './pages/Firms'
import FirmDetail from './pages/FirmDetail'
import Pipeline from './pages/Pipeline'
import CalendarPage from './pages/CalendarPage'
import EmailActivity from './pages/EmailActivity'

function Placeholder({ title }: { title: string }) {
  return (
    <div className="ml-60 pt-14 p-6">
      <div className="text-slate-400 text-sm text-center mt-20">{title} — coming soon</div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/:id" element={<ContactDetail />} />
          <Route path="/firms" element={<Firms />} />
          <Route path="/firms/:id" element={<FirmDetail />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/email" element={<EmailActivity />} />
          <Route path="/reports" element={<Placeholder title="Reports" />} />
          <Route path="/settings" element={<Placeholder title="Settings" />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}
