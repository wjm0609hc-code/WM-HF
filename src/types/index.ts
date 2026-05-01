export type Stage =
  | 'identified'
  | 'outreach'
  | 'intro_meeting'
  | 'diligence'
  | 'documentation'
  | 'committed'
  | 'passed'
  | 'current_lp'

export type FirmType =
  | 'family_office'
  | 'endowment'
  | 'foundation'
  | 'pension'
  | 'fund_of_funds'
  | 'wealth_manager'
  | 'sovereign_wealth'
  | 'insurance'

export type ActivityType =
  | 'email_sent'
  | 'email_received'
  | 'meeting'
  | 'call'
  | 'note'
  | 'stage_change'

export type StrategyTag =
  | 'Power Fund III'
  | 'Credit Opportunities II'
  | 'Real Assets'
  | 'Core Private Equity'
  | 'Venture Growth'

export interface TeamMember {
  id: string
  name: string
  firstName: string
  title: string
  email: string
  initials: string
  color: string
}

export interface Fund {
  id: string
  name: string
  shortName: string
  target: number
  committed: number
  strategy: StrategyTag
  vintage: number
  status: 'raising' | 'closed' | 'investing'
}

export interface Firm {
  id: string
  name: string
  city: string
  state: string
  zip: string
  country: string
  aum: number
  type: FirmType
  website?: string
  notes?: string
  strategyTags: StrategyTag[]
  contactIds: string[]
}

export interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  title: string
  firmId: string
  bio: string
  linkedIn?: string
  stage: Stage
  strategyTags: StrategyTag[]
  checkSizeMin?: number
  checkSizeMax?: number
  expectedCommitment?: number
  ownerId: string
  lastContactDate: string
  nextFollowUpDate?: string
  notes?: string
  daysInCurrentStage: number
}

export interface Activity {
  id: string
  type: ActivityType
  contactId: string
  subject?: string
  body?: string
  date: string
  duration?: number
  ownerId: string
  attendees?: string[]
  previousStage?: Stage
  newStage?: Stage
  location?: string
  outcome?: 'positive' | 'neutral' | 'negative'
}
