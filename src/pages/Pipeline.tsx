import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, DollarSign, Filter } from 'lucide-react'
import { Layout } from '../components/layout/Layout'
import { StrategyBadge } from '../components/ui/Badge'
import { Avatar } from '../components/ui/Avatar'
import { useApp } from '../context/AppContext'
import { firms, teamMembers } from '../data/mockData'
import { formatCheckSize, formatCurrency, STAGE_LABELS, STAGE_ORDER } from '../utils/format'
import type { Stage, StrategyTag } from '../types'

const PIPELINE_STAGES: Stage[] = ['identified', 'outreach', 'intro_meeting', 'diligence', 'documentation', 'committed']

const STAGE_COLORS: Record<Stage, { header: string; card: string; dot: string }> = {
  identified:    { header: 'bg-slate-100 border-slate-200',   card: 'border-l-slate-400',   dot: 'bg-slate-400' },
  outreach:      { header: 'bg-blue-50 border-blue-100',      card: 'border-l-blue-400',    dot: 'bg-blue-400' },
  intro_meeting: { header: 'bg-violet-50 border-violet-100',  card: 'border-l-violet-400',  dot: 'bg-violet-400' },
  diligence:     { header: 'bg-amber-50 border-amber-100',    card: 'border-l-amber-400',   dot: 'bg-amber-400' },
  documentation: { header: 'bg-orange-50 border-orange-100',  card: 'border-l-orange-400',  dot: 'bg-orange-400' },
  committed:     { header: 'bg-emerald-50 border-emerald-100', card: 'border-l-emerald-400', dot: 'bg-emerald-500' },
  passed:        { header: 'bg-red-50 border-red-100',        card: 'border-l-red-300',     dot: 'bg-red-400' },
  current_lp:    { header: 'bg-teal-50 border-teal-100',      card: 'border-l-teal-400',    dot: 'bg-teal-400' },
}

export default function Pipeline() {
  const { contacts, viewMode, currentUserId, updateContactStage } = useApp()
  const navigate = useNavigate()
  const [strategyFilter, setStrategyFilter] = useState<StrategyTag | 'all'>('all')
  const [dragContactId, setDragContactId] = useState<string | null>(null)
  const [dragOverStage, setDragOverStage] = useState<Stage | null>(null)

  const baseContacts = viewMode === 'personal'
    ? contacts.filter(c => c.ownerId === currentUserId)
    : contacts

  const filteredContacts = strategyFilter === 'all'
    ? baseContacts
    : baseContacts.filter(c => c.strategyTags.includes(strategyFilter))

  // Summary
  const totalPipeline = filteredContacts
    .filter(c => !['passed', 'current_lp'].includes(c.stage))
    .reduce((s, c) => s + (c.expectedCommitment ?? ((c.checkSizeMin ?? 0) + (c.checkSizeMax ?? 0)) / 2), 0)

  const committed = filteredContacts
    .filter(c => c.stage === 'committed')
    .reduce((s, c) => s + (c.expectedCommitment ?? 0), 0)

  function handleDragStart(contactId: string) { setDragContactId(contactId) }
  function handleDragOver(e: React.DragEvent, stage: Stage) {
    e.preventDefault()
    setDragOverStage(stage)
  }
  function handleDrop(stage: Stage) {
    if (dragContactId) {
      updateContactStage(dragContactId, stage)
    }
    setDragContactId(null)
    setDragOverStage(null)
  }
  function handleDragEnd() {
    setDragContactId(null)
    setDragOverStage(null)
  }

  return (
    <Layout title="Pipeline">
      {/* Summary bar */}
      <div className="flex items-center gap-6 mb-5 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="text-xs text-slate-500 font-medium">Total Pipeline</div>
          <div className="text-lg font-bold text-slate-900">{formatCurrency(totalPipeline)}</div>
        </div>
        <div className="w-px h-8 bg-slate-200" />
        <div>
          <div className="text-xs text-slate-500 font-medium">Committed</div>
          <div className="text-lg font-bold text-emerald-700">{formatCurrency(committed)}</div>
        </div>
        <div className="w-px h-8 bg-slate-200" />
        <div>
          <div className="text-xs text-slate-500 font-medium">Total Prospects</div>
          <div className="text-lg font-bold text-slate-900">{filteredContacts.filter(c => !['passed', 'current_lp'].includes(c.stage)).length}</div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Filter size={14} className="text-slate-400" />
          <select value={strategyFilter} onChange={e => setStrategyFilter(e.target.value as StrategyTag | 'all')}
            className="text-sm border border-slate-200 rounded-xl px-3 py-1.5 outline-none focus:border-indigo-300 bg-white">
            <option value="all">All Funds</option>
            <option value="Power Fund III">Power Fund III</option>
            <option value="Credit Opportunities II">Credit Opportunities II</option>
            <option value="Real Assets">Real Assets</option>
          </select>
        </div>
      </div>

      {/* Kanban board */}
      <div className="flex gap-3 overflow-x-auto pb-4" style={{ minHeight: '70vh' }}>
        {PIPELINE_STAGES.map(stage => {
          const stageContacts = filteredContacts.filter(c => c.stage === stage)
          const stageValue = stageContacts.reduce((s, c) => s + (c.expectedCommitment ?? ((c.checkSizeMin ?? 0) + (c.checkSizeMax ?? 0)) / 2), 0)
          const colors = STAGE_COLORS[stage]
          const isDragOver = dragOverStage === stage

          return (
            <div
              key={stage}
              className={`flex-shrink-0 w-56 flex flex-col rounded-2xl border transition-all ${
                isDragOver ? 'border-indigo-300 bg-indigo-50/30 scale-[1.01]' : 'border-slate-200 bg-slate-50/50'
              }`}
              onDragOver={e => handleDragOver(e, stage)}
              onDrop={() => handleDrop(stage)}
              onDragLeave={() => setDragOverStage(null)}
            >
              {/* Column header */}
              <div className={`px-3 py-3 rounded-t-2xl border-b ${colors.header}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                    <span className="text-xs font-semibold text-slate-700">{STAGE_LABELS[stage]}</span>
                  </div>
                  <span className="text-xs text-slate-400 bg-white border border-slate-200 rounded-full px-1.5 py-0.5 font-medium">{stageContacts.length}</span>
                </div>
                {stageValue > 0 && (
                  <div className="text-xs text-slate-400 mt-1 ml-4">{formatCurrency(stageValue)}</div>
                )}
              </div>

              {/* Cards */}
              <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                {stageContacts.map(contact => {
                  const firm = firms.find(f => f.id === contact.firmId)
                  const owner = teamMembers.find(t => t.id === contact.ownerId)
                  const isDragging = dragContactId === contact.id

                  return (
                    <div
                      key={contact.id}
                      draggable
                      onDragStart={() => handleDragStart(contact.id)}
                      onDragEnd={handleDragEnd}
                      onClick={() => navigate(`/contacts/${contact.id}`)}
                      className={`bg-white rounded-xl border-l-2 border border-slate-200 p-3 cursor-pointer shadow-sm hover:shadow-md transition-all ${colors.card} ${isDragging ? 'opacity-40 scale-95' : 'hover:-translate-y-0.5'}`}
                    >
                      <div className="font-semibold text-sm text-slate-900 mb-0.5">
                        {contact.firstName} {contact.lastName}
                      </div>
                      <div className="text-xs text-slate-500 mb-2 truncate">{firm?.name}</div>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {contact.strategyTags.slice(0, 2).map(t => (
                          <span key={t} className="text-2xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-medium">{t}</span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                          <DollarSign size={10} />
                          {contact.expectedCommitment
                            ? <span className="font-medium text-slate-600">${contact.expectedCommitment}M</span>
                            : <span>{formatCheckSize(contact.checkSizeMin, contact.checkSizeMax)}</span>
                          }
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-slate-400">
                            <Clock size={10} />
                            <span>{contact.daysInCurrentStage}d</span>
                          </div>
                          {owner && <Avatar initials={owner.initials} color={owner.color} size="xs" name={owner.name} />}
                        </div>
                      </div>
                    </div>
                  )
                })}

                {stageContacts.length === 0 && !isDragOver && (
                  <div className="text-center py-8 text-xs text-slate-300">Drop here</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-slate-400 text-center mt-2">Drag cards to move between stages</p>
    </Layout>
  )
}
