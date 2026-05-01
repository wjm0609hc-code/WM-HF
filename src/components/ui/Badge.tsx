import type { Stage, StrategyTag, FirmType } from '../../types'
import { STAGE_LABELS, FIRM_TYPE_LABELS } from '../../utils/format'

const STAGE_STYLES: Record<Stage, string> = {
  identified:    'bg-slate-100 text-slate-600 border border-slate-200',
  outreach:      'bg-blue-50 text-blue-700 border border-blue-200',
  intro_meeting: 'bg-violet-50 text-violet-700 border border-violet-200',
  diligence:     'bg-amber-50 text-amber-700 border border-amber-200',
  documentation: 'bg-orange-50 text-orange-700 border border-orange-200',
  committed:     'bg-emerald-50 text-emerald-700 border border-emerald-200',
  passed:        'bg-red-50 text-red-600 border border-red-200',
  current_lp:    'bg-teal-50 text-teal-700 border border-teal-200',
}

const STRATEGY_STYLES: Record<string, string> = {
  'Power Fund III':       'bg-indigo-50 text-indigo-700 border border-indigo-200',
  'Credit Opportunities II': 'bg-cyan-50 text-cyan-700 border border-cyan-200',
  'Real Assets':          'bg-lime-50 text-lime-700 border border-lime-200',
  'Core Private Equity':  'bg-purple-50 text-purple-700 border border-purple-200',
  'Venture Growth':       'bg-pink-50 text-pink-700 border border-pink-200',
}

export function StageBadge({ stage, size = 'sm' }: { stage: Stage; size?: 'xs' | 'sm' }) {
  const base = size === 'xs' ? 'px-1.5 py-0.5 text-2xs' : 'px-2 py-0.5 text-xs'
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${base} ${STAGE_STYLES[stage]}`}>
      {STAGE_LABELS[stage]}
    </span>
  )
}

export function StrategyBadge({ tag }: { tag: StrategyTag }) {
  const style = STRATEGY_STYLES[tag] ?? 'bg-gray-100 text-gray-600 border border-gray-200'
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${style}`}>
      {tag}
    </span>
  )
}

export function FirmTypeBadge({ type }: { type: FirmType }) {
  return (
    <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
      {FIRM_TYPE_LABELS[type]}
    </span>
  )
}
