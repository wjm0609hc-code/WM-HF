import { format, formatDistanceToNow, differenceInDays, parseISO } from 'date-fns'
import type { Stage, FirmType, ActivityType } from '../types'

export function formatCurrency(millions: number): string {
  if (millions >= 1000) return `$${(millions / 1000).toFixed(1)}B`
  return `$${millions}M`
}

export function formatCheckSize(min?: number, max?: number): string {
  if (!min && !max) return '—'
  if (!max) return `$${min}M+`
  if (!min) return `Up to $${max}M`
  return `$${min}M – $${max}M`
}

export function formatDate(iso: string): string {
  return format(parseISO(iso), 'MMM d, yyyy')
}

export function formatDateTime(iso: string): string {
  return format(parseISO(iso), 'MMM d, yyyy · h:mm a')
}

export function formatRelativeDate(iso: string): string {
  const date = parseISO(iso)
  const days = differenceInDays(new Date(), date)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return format(date, 'MMM d')
}

export function formatTimeAgo(iso: string): string {
  return formatDistanceToNow(parseISO(iso), { addSuffix: true })
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

export function formatAUM(millions: number): string {
  if (millions >= 1000) return `$${(millions / 1000).toFixed(1)}B`
  return `$${millions}M`
}

export function daysSince(iso: string): number {
  return differenceInDays(new Date(), parseISO(iso))
}

export const STAGE_LABELS: Record<Stage, string> = {
  identified: 'Identified',
  outreach: 'Outreach',
  intro_meeting: 'Intro Meeting',
  diligence: 'Diligence',
  documentation: 'Documentation',
  committed: 'Committed',
  passed: 'Passed',
  current_lp: 'Current LP',
}

export const STAGE_ORDER: Stage[] = [
  'identified', 'outreach', 'intro_meeting', 'diligence', 'documentation', 'committed', 'passed', 'current_lp',
]

export const FIRM_TYPE_LABELS: Record<FirmType, string> = {
  family_office: 'Family Office',
  endowment: 'Endowment',
  foundation: 'Foundation',
  pension: 'Pension Fund',
  fund_of_funds: 'Fund of Funds',
  wealth_manager: 'Wealth Manager',
  sovereign_wealth: 'Sovereign Wealth',
  insurance: 'Insurance',
}

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  email_sent: 'Email Sent',
  email_received: 'Email Received',
  meeting: 'Meeting',
  call: 'Call',
  note: 'Note',
  stage_change: 'Stage Updated',
}

export function exportContactsToCSV(rows: Record<string, string>[]): void {
  if (rows.length === 0) return
  const headers = Object.keys(rows[0])
  const csvContent = [
    headers.join(','),
    ...rows.map(row =>
      headers.map(h => `"${(row[h] ?? '').replace(/"/g, '""')}"`).join(',')
    ),
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `contacts-${format(new Date(), 'yyyy-MM-dd')}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
