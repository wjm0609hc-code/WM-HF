import type { TeamMember, Fund, Firm, Contact, Activity } from '../types'

export const CURRENT_USER_ID = 'user-1'

export const teamMembers: TeamMember[] = [
  { id: 'user-1', name: 'Alex Chen', firstName: 'Alex', title: 'Director, Investor Relations', email: 'alex.chen@wmcapital.com', initials: 'AC', color: '#6366f1' },
  { id: 'user-2', name: 'Sarah Walsh', firstName: 'Sarah', title: 'VP, Investor Relations', email: 'sarah.walsh@wmcapital.com', initials: 'SW', color: '#0ea5e9' },
  { id: 'user-3', name: 'James Park', firstName: 'James', title: 'Analyst, Business Development', email: 'james.park@wmcapital.com', initials: 'JP', color: '#10b981' },
  { id: 'user-4', name: 'Michelle Torres', firstName: 'Michelle', title: 'Managing Director, BD', email: 'michelle.torres@wmcapital.com', initials: 'MT', color: '#f59e0b' },
]

export const funds: Fund[] = [
  { id: 'fund-1', name: 'Power Fund III', shortName: 'PF III', target: 500, committed: 287, strategy: 'Power Fund III', vintage: 2025, status: 'raising' },
  { id: 'fund-2', name: 'Credit Opportunities Fund II', shortName: 'CO II', target: 300, committed: 156, strategy: 'Credit Opportunities II', vintage: 2025, status: 'raising' },
]

export const firms: Firm[] = [
  {
    id: 'firm-1', name: 'Hillcrest Family Office', city: 'Los Angeles', state: 'CA', zip: '90049', country: 'USA',
    aum: 1800, type: 'family_office', website: 'hillcrestfo.com',
    strategyTags: ['Power Fund III', 'Credit Opportunities II'],
    contactIds: ['contact-1', 'contact-2'],
    notes: 'Multi-generational family office. Strong preference for direct co-invest alongside GP. Decision maker is the CIO, John Smith.',
  },
  {
    id: 'firm-2', name: 'Meridian Capital Partners', city: 'New York', state: 'NY', zip: '10022', country: 'USA',
    aum: 12000, type: 'fund_of_funds', website: 'meridiancap.com',
    strategyTags: ['Power Fund III', 'Credit Opportunities II'],
    contactIds: ['contact-3', 'contact-4'],
    notes: 'Top-tier FoF. Very process-oriented — expect 6–9 month DD cycle. They run a formal scoring rubric. Work with Michael Johnson (Managing Partner) and Patricia Lee (VP Alternatives).',
  },
  {
    id: 'firm-3', name: 'Pacific Endowment Group', city: 'San Francisco', state: 'CA', zip: '94105', country: 'USA',
    aum: 8500, type: 'endowment', website: 'pacificendow.org',
    strategyTags: ['Power Fund III'],
    contactIds: ['contact-5', 'contact-6'],
    notes: 'University endowment. Fiscal year ends June 30 — commitments usually made in Q1/Q2. CIO Robert Williams is the key relationship.',
  },
  {
    id: 'firm-4', name: 'Northstar Pension Advisors', city: 'Chicago', state: 'IL', zip: '60601', country: 'USA',
    aum: 45000, type: 'pension', website: 'northstarpension.com',
    strategyTags: ['Power Fund III'],
    contactIds: ['contact-7', 'contact-8'],
    notes: 'Large public pension. Board approval required for new manager relationships — long lead time. Allocation committee meets quarterly.',
  },
  {
    id: 'firm-5', name: 'Sunstone Private Wealth', city: 'Scottsdale', state: 'AZ', zip: '85251', country: 'USA',
    aum: 650, type: 'family_office', website: 'sunstonepw.com',
    strategyTags: ['Power Fund III', 'Credit Opportunities II'],
    contactIds: ['contact-9', 'contact-10'],
    notes: 'Current LP in Power Fund II. Re-upping for Fund III and adding Credit exposure. Strong relationship — Thomas Brown is a champion.',
  },
  {
    id: 'firm-6', name: 'Cornerstone Foundation', city: 'Dallas', state: 'TX', zip: '75201', country: 'USA',
    aum: 2100, type: 'foundation', website: 'cornerstonefdn.org',
    strategyTags: ['Power Fund III'],
    contactIds: ['contact-11', 'contact-12'],
    notes: 'Private family foundation. 5% annual distribution requirement drives conservative positioning. New CIO (James Wilson) joined 6 months ago from endowment world — good fit for our strategy.',
  },
  {
    id: 'firm-7', name: 'Harbor View Capital', city: 'Boston', state: 'MA', zip: '02110', country: 'USA',
    aum: 3400, type: 'family_office', website: 'harborviewcap.com',
    strategyTags: ['Power Fund III', 'Credit Opportunities II'],
    contactIds: ['contact-13', 'contact-14'],
    notes: 'Entrepreneurial FO. Founder Christopher Davis is a former PE operator — very aligned with our buy-and-build thesis. Committed to both funds.',
  },
  {
    id: 'firm-8', name: 'Desert Wind Investments', city: 'Las Vegas', state: 'NV', zip: '89101', country: 'USA',
    aum: 900, type: 'family_office', website: 'desertwi.com',
    strategyTags: ['Power Fund III'],
    contactIds: ['contact-15', 'contact-16'],
    notes: 'Gaming/hospitality family office. First-time alternatives allocator — needs significant education. Brian Garcia (MP) is receptive but committee approval required.',
  },
  {
    id: 'firm-9', name: 'Alpine Wealth Partners', city: 'Denver', state: 'CO', zip: '80202', country: 'USA',
    aum: 1200, type: 'wealth_manager', website: 'alpinewp.com',
    strategyTags: ['Credit Opportunities II'],
    contactIds: ['contact-17', 'contact-18'],
    notes: 'RIA with strong mountain west client base. Interested in credit for income-oriented client portfolios.',
  },
  {
    id: 'firm-10', name: 'Eastbrook Institutional', city: 'Atlanta', state: 'GA', zip: '30303', country: 'USA',
    aum: 6000, type: 'fund_of_funds', website: 'eastbrookinst.com',
    strategyTags: ['Power Fund III', 'Credit Opportunities II'],
    contactIds: ['contact-19', 'contact-20'],
    notes: 'Southeastern FoF. Growing platform — building out alternatives book. Steven Lewis joined from Mercer 18 months ago and has been actively adding managers.',
  },
]

export const contacts: Contact[] = [
  {
    id: 'contact-1', firstName: 'John', lastName: 'Smith', email: 'j.smith@hillcrestfo.com', phone: '(310) 555-0142',
    title: 'Chief Investment Officer', firmId: 'firm-1',
    bio: 'Former Managing Director at Goldman Sachs Asset Management (2001–2018) before joining Hillcrest as CIO. Harvard MBA. Oversees $1.8B across public equities, private credit, and buyout strategies. Known for deep diligence and preference for concentrated manager relationships.',
    stage: 'diligence', strategyTags: ['Power Fund III'], checkSizeMin: 25, checkSizeMax: 50, expectedCommitment: 35,
    ownerId: 'user-1', lastContactDate: '2026-04-30', nextFollowUpDate: '2026-05-07', daysInCurrentStage: 22,
    notes: 'Key concern: fee structure on recycled capital. Wants co-invest rights. Follow up on revised LPA draft by EOW.',
  },
  {
    id: 'contact-2', firstName: 'Diana', lastName: 'Chen', email: 'd.chen@hillcrestfo.com', phone: '(310) 555-0198',
    title: 'Chief Financial Officer', firmId: 'firm-1',
    bio: 'CPA with 15 years in family office CFO roles. Previously at Bessemer Trust. Manages all operational and reporting aspects. Key gatekeeper for new manager onboarding — subscription docs and KYC go through her.',
    stage: 'intro_meeting', strategyTags: ['Credit Opportunities II'], checkSizeMin: 15, checkSizeMax: 25, expectedCommitment: 20,
    ownerId: 'user-1', lastContactDate: '2026-04-22', nextFollowUpDate: '2026-05-05', daysInCurrentStage: 14,
    notes: 'Focused on operational due diligence and fund admin. Sent materials April 22. Schedule intro call this week.',
  },
  {
    id: 'contact-3', firstName: 'Michael', lastName: 'Johnson', email: 'm.johnson@meridiancap.com', phone: '(212) 555-0167',
    title: 'Managing Partner', firmId: 'firm-2',
    bio: 'Co-founder of Meridian Capital Partners (2008). Previously HarbourVest Partners. Dartmouth College, Wharton MBA. Leads investment committee and final manager selection. Very data-driven — expects full attribution analysis and benchmark comparisons.',
    stage: 'documentation', strategyTags: ['Power Fund III'], checkSizeMin: 50, checkSizeMax: 100, expectedCommitment: 75,
    ownerId: 'user-1', lastContactDate: '2026-04-28', nextFollowUpDate: '2026-05-02', daysInCurrentStage: 8,
    notes: 'IC approval received. Subscription documents sent 4/28. Awaiting signed docs and wire instructions.',
  },
  {
    id: 'contact-4', firstName: 'Patricia', lastName: 'Lee', email: 'p.lee@meridiancap.com', phone: '(212) 555-0183',
    title: 'VP, Alternatives', firmId: 'firm-2',
    bio: 'Joined Meridian in 2019 from Cambridge Associates. Day-to-day portfolio manager for credit and private equity sleeves. Runs the scoring model and manages the DD process. Works closely with Michael Johnson on final decisions.',
    stage: 'outreach', strategyTags: ['Credit Opportunities II'], checkSizeMin: 25, checkSizeMax: 50,
    ownerId: 'user-2', lastContactDate: '2026-04-15', nextFollowUpDate: '2026-05-01', daysInCurrentStage: 30,
    notes: 'Intro email sent by Sarah 4/15. Waiting for response. Try LinkedIn follow-up.',
  },
  {
    id: 'contact-5', firstName: 'Robert', lastName: 'Williams', email: 'r.williams@pacificendow.org', phone: '(415) 555-0129',
    title: 'Chief Investment Officer', firmId: 'firm-3',
    bio: 'CIO at Pacific Endowment Group since 2020. Prior roles at Yale Investments Office and Stanford Management Company. Pioneer in alternative investments — 40% alternatives allocation. Highly networked in the LP community.',
    stage: 'intro_meeting', strategyTags: ['Power Fund III'], checkSizeMin: 100, checkSizeMax: 200, expectedCommitment: 150,
    ownerId: 'user-2', lastContactDate: '2026-04-20', daysInCurrentStage: 18,
    notes: 'Very positive first meeting with Sarah. Wants to see benchmark vs. Cambridge Associates PE benchmark.',
  },
  {
    id: 'contact-6', firstName: 'Amy', lastName: 'Zhang', email: 'a.zhang@pacificendow.org', phone: '(415) 555-0145',
    title: 'Senior Portfolio Manager, PE & Credit', firmId: 'firm-3',
    bio: 'Joined Pacific Endowment in 2022. Former analyst at BlackRock Alternative Advisors. Manages day-to-day monitoring of PE and credit portfolio. Key analytical resource for the CIO.',
    stage: 'identified', strategyTags: ['Power Fund III', 'Credit Opportunities II'],
    ownerId: 'user-3', lastContactDate: '2026-03-15', daysInCurrentStage: 45,
  },
  {
    id: 'contact-7', firstName: 'David', lastName: 'Kim', email: 'd.kim@northstarpension.com', phone: '(312) 555-0134',
    title: 'Director, Private Equity', firmId: 'firm-4',
    bio: 'Led PE program at Northstar for 8 years. Former consultant at Wilshire Associates. CFA charterholder. Manages $6B PE portfolio with 45 active manager relationships. Systematic and process-driven.',
    stage: 'identified', strategyTags: ['Power Fund III'], checkSizeMin: 200, checkSizeMax: 300,
    ownerId: 'user-4', lastContactDate: '2026-03-05', daysInCurrentStage: 56,
    notes: 'Met at ILPA conference in March. Board cycle starts Q3. Need to get on radar before June.',
  },
  {
    id: 'contact-8', firstName: 'Sandra', lastName: 'Martinez', email: 's.martinez@northstarpension.com', phone: '(312) 555-0156',
    title: 'Portfolio Manager, Fixed Income & Credit', firmId: 'firm-4',
    bio: 'Manages $8B fixed income and credit book at Northstar. Joined from Nuveen. CFA charterholder. Currently expanding into private credit — target is 5% of total portfolio (currently 2%).',
    stage: 'outreach', strategyTags: ['Credit Opportunities II'], checkSizeMin: 50, checkSizeMax: 100,
    ownerId: 'user-4', lastContactDate: '2026-04-10', daysInCurrentStage: 25,
  },
  {
    id: 'contact-9', firstName: 'Thomas', lastName: 'Brown', email: 't.brown@sunstonepw.com', phone: '(480) 555-0112',
    title: 'Chief Investment Officer', firmId: 'firm-5',
    bio: 'CIO of Sunstone Private Wealth since founding (2015). Real estate background — sold commercial RE portfolio, invested proceeds with several PE/credit managers. LP in Power Fund II. Extremely happy with Fund II performance.',
    stage: 'committed', strategyTags: ['Power Fund III'], checkSizeMin: 10, checkSizeMax: 25, expectedCommitment: 20,
    ownerId: 'user-1', lastContactDate: '2026-04-29', daysInCurrentStage: 5,
    notes: 'Commitment confirmed. $20M to Power Fund III. Docs sent — wire expected by May 5.',
  },
  {
    id: 'contact-10', firstName: 'Lisa', lastName: 'Parker', email: 'l.parker@sunstonepw.com', phone: '(480) 555-0178',
    title: 'Director of Investments', firmId: 'firm-5',
    bio: 'Reports to Thomas Brown. Handles manager DD, monitoring, and reporting. Previously at Northern Trust wealth management. Very organized and responsive.',
    stage: 'committed', strategyTags: ['Credit Opportunities II'], checkSizeMin: 5, checkSizeMax: 15, expectedCommitment: 10,
    ownerId: 'user-1', lastContactDate: '2026-04-25', daysInCurrentStage: 5,
    notes: '$10M commitment to Credit Opp II. Subscription docs in review.',
  },
  {
    id: 'contact-11', firstName: 'James', lastName: 'Wilson', email: 'j.wilson@cornerstonefdn.org', phone: '(214) 555-0121',
    title: 'Executive Director & CIO', firmId: 'firm-6',
    bio: 'Joined Cornerstone Foundation 6 months ago from University of Texas endowment. Spent 12 years in institutional alternatives at UT. Deep PE background. Actively rebuilding the alternatives book — strong pipeline building mandate from board.',
    stage: 'diligence', strategyTags: ['Power Fund III'], checkSizeMin: 25, checkSizeMax: 50, expectedCommitment: 30,
    ownerId: 'user-2', lastContactDate: '2026-04-26', nextFollowUpDate: '2026-05-03', daysInCurrentStage: 19,
    notes: 'Deep reference call with two existing LPs on April 22. Very positive feedback. Board presentation scheduled for May 15.',
  },
  {
    id: 'contact-12', firstName: 'Rachel', lastName: 'Adams', email: 'r.adams@cornerstonefdn.org', phone: '(214) 555-0145',
    title: 'Investment Officer', firmId: 'firm-6',
    bio: 'Supports James Wilson on all investment analysis. CFA Level III candidate. Previously at a Dallas-based multi-family office. Does all quantitative modeling for investment committee presentations.',
    stage: 'intro_meeting', strategyTags: ['Power Fund III'], checkSizeMin: 15, checkSizeMax: 25,
    ownerId: 'user-3', lastContactDate: '2026-04-18', daysInCurrentStage: 22,
  },
  {
    id: 'contact-13', firstName: 'Christopher', lastName: 'Davis', email: 'c.davis@harborviewcap.com', phone: '(617) 555-0133',
    title: 'Founder & Managing Partner', firmId: 'firm-7',
    bio: 'Founded Harbor View Capital after selling his industrial services company in 2016 ($450M exit). Deep operational expertise in B2B services and distribution. Prefers PE managers with operational value-creation thesis. Extremely decisive.',
    stage: 'committed', strategyTags: ['Power Fund III', 'Credit Opportunities II'], checkSizeMin: 50, checkSizeMax: 75, expectedCommitment: 60,
    ownerId: 'user-1', lastContactDate: '2026-04-24', daysInCurrentStage: 10,
    notes: '$40M to Power Fund III, $20M to Credit Opp II. Both commitments signed. Wire pending.',
  },
  {
    id: 'contact-14', firstName: 'Jennifer', lastName: 'Thompson', email: 'j.thompson@harborviewcap.com', phone: '(617) 555-0167',
    title: 'VP, Investments', firmId: 'firm-7',
    bio: 'Manages investment operations and manager monitoring at Harbor View. Former operations at Wellington Management. Handles all subscription docs, capital call notices, and quarterly reporting.',
    stage: 'outreach', strategyTags: ['Credit Opportunities II'], checkSizeMin: 25, checkSizeMax: 50,
    ownerId: 'user-2', lastContactDate: '2026-04-12', daysInCurrentStage: 28,
  },
  {
    id: 'contact-15', firstName: 'Brian', lastName: 'Garcia', email: 'b.garcia@desertwi.com', phone: '(702) 555-0144',
    title: 'Managing Partner', firmId: 'firm-8',
    bio: 'Second-generation family office manager. Family wealth from gaming and hospitality ventures in Las Vegas. First-time allocator to institutional private equity — historically real estate and public markets only.',
    stage: 'outreach', strategyTags: ['Power Fund III'], checkSizeMin: 10, checkSizeMax: 25,
    ownerId: 'user-1', lastContactDate: '2026-04-28', nextFollowUpDate: '2026-05-05', daysInCurrentStage: 15,
    notes: 'Good call April 28. Receptive but needs education on PE fund structure and fees. Send primer document.',
  },
  {
    id: 'contact-16', firstName: 'Karen', lastName: 'Anderson', email: 'k.anderson@desertwi.com', phone: '(702) 555-0189',
    title: 'Chief Financial Officer', firmId: 'firm-8',
    bio: 'CPA and CFO of Desert Wind. Manages all entity structures, tax planning, and investment administration. Key decision-influencer alongside Brian Garcia.',
    stage: 'identified', strategyTags: ['Power Fund III'],
    ownerId: 'user-1', lastContactDate: '2026-04-05', daysInCurrentStage: 25,
  },
  {
    id: 'contact-17', firstName: 'Mark', lastName: 'Robinson', email: 'm.robinson@alpinewp.com', phone: '(303) 555-0156',
    title: 'Chief Investment Officer', firmId: 'firm-9',
    bio: 'CIO of Alpine Wealth Partners since 2019. Previously at Raymond James financial advisory. Growing private credit allocation for income-seeking client base (retirees and pre-retirees). Attracted to yield-oriented strategies.',
    stage: 'intro_meeting', strategyTags: ['Credit Opportunities II'], checkSizeMin: 10, checkSizeMax: 20,
    ownerId: 'user-3', lastContactDate: '2026-04-17', daysInCurrentStage: 16,
  },
  {
    id: 'contact-18', firstName: 'Nancy', lastName: 'Wright', email: 'n.wright@alpinewp.com', phone: '(303) 555-0172',
    title: 'Senior Investment Analyst', firmId: 'firm-9',
    bio: 'Supports Mark Robinson on all manager research and due diligence. Series 65 licensed. Preparing first formal alternatives allocation report for the board.',
    stage: 'identified', strategyTags: ['Credit Opportunities II'],
    ownerId: 'user-3', lastContactDate: '2026-04-05', daysInCurrentStage: 25,
  },
  {
    id: 'contact-19', firstName: 'Steven', lastName: 'Lewis', email: 's.lewis@eastbrook.com', phone: '(404) 555-0138',
    title: 'Head of Private Equity', firmId: 'firm-10',
    bio: 'Joined Eastbrook Institutional from Mercer 18 months ago. Built out PE program from scratch — currently 28 active manager relationships. CFA charterholder. Very systematic — runs quantitative and qualitative scorecards for all managers.',
    stage: 'diligence', strategyTags: ['Power Fund III', 'Credit Opportunities II'], checkSizeMin: 75, checkSizeMax: 150, expectedCommitment: 100,
    ownerId: 'user-4', lastContactDate: '2026-04-25', nextFollowUpDate: '2026-05-08', daysInCurrentStage: 17,
  },
  {
    id: 'contact-20', firstName: 'Michelle', lastName: 'Carter', email: 'm.carter@eastbrook.com', phone: '(404) 555-0162',
    title: 'Portfolio Manager, Alternatives', firmId: 'firm-10',
    bio: 'Works alongside Steven Lewis on alternatives portfolio management. CFA charterholder. Handles ongoing monitoring and quarterly reporting for all PE and credit managers.',
    stage: 'outreach', strategyTags: ['Power Fund III', 'Credit Opportunities II'], checkSizeMin: 25, checkSizeMax: 50,
    ownerId: 'user-4', lastContactDate: '2026-04-08', daysInCurrentStage: 20,
  },
]

export const activities: Activity[] = [
  // April 30 (today)
  { id: 'act-1', type: 'email_sent', contactId: 'contact-1', ownerId: 'user-1', date: '2026-04-30T09:15:00Z', subject: 'Power Fund III — LPA Draft & Fee Schedule Follow-Up', body: 'John, Following our call yesterday, I\'ve attached the revised LPA draft addressing your questions on recycled capital and the fee offset provisions. Please let me know if you\'d like to schedule a call with our general counsel to walk through the changes. Best, Alex' },
  { id: 'act-2', type: 'email_sent', contactId: 'contact-15', ownerId: 'user-1', date: '2026-04-30T10:30:00Z', subject: 'PE Fund Primer — Power Fund III Overview', body: 'Brian, Great connecting yesterday. As promised, I\'m attaching a primer on how institutional PE funds are structured, alongside our Power Fund III overview deck. Happy to walk through any questions on a call. Alex' },

  // April 29
  { id: 'act-3', type: 'email_received', contactId: 'contact-9', ownerId: 'user-1', date: '2026-04-29T14:20:00Z', subject: 'RE: Power Fund III — Commitment Confirmation', body: 'Alex — We\'re in. $20M to Power Fund III. Please send subscription documents when ready. Thomas' },
  { id: 'act-4', type: 'stage_change', contactId: 'contact-9', ownerId: 'user-1', date: '2026-04-29T14:25:00Z', previousStage: 'documentation', newStage: 'committed' },

  // April 28
  { id: 'act-5', type: 'meeting', contactId: 'contact-1', ownerId: 'user-1', date: '2026-04-28T14:00:00Z', subject: 'Power Fund III — Due Diligence Deep Dive', duration: 90, location: 'Video Call (Teams)', outcome: 'positive', body: 'Covered: fee structure, recycled capital provisions, co-invest rights, Fund II performance attribution. John very engaged — main outstanding item is LPA redline on recycled capital clause. Expects to bring to IC week of May 12.' },
  { id: 'act-6', type: 'call', contactId: 'contact-15', ownerId: 'user-1', date: '2026-04-28T16:00:00Z', subject: 'Introductory Call — Power Fund III', duration: 30, outcome: 'positive', body: 'Brian asked good questions about fee structure and J-curve dynamics. First-time PE allocator — family made money in gaming/hospitality and is looking to diversify. Committed to sending PE primer and fund overview.' },

  // April 26
  { id: 'act-7', type: 'call', contactId: 'contact-11', ownerId: 'user-2', date: '2026-04-26T11:00:00Z', subject: 'Reference Check Debrief — Two Existing LPs', duration: 45, outcome: 'positive', body: 'James called two Fund II LPs we provided. Both gave extremely positive references — specifically highlighted our communication style and co-invest execution. Board presentation scheduled May 15.' },

  // April 25
  { id: 'act-8', type: 'email_sent', contactId: 'contact-3', ownerId: 'user-1', date: '2026-04-25T09:00:00Z', subject: 'Power Fund III — Subscription Documents', body: 'Michael, Congratulations on IC approval and thank you for the partnership. I\'ve attached the subscription booklet and wire instructions. Please confirm receipt and let us know if you have any questions. We\'re targeting a May 15 close.' },
  { id: 'act-9', type: 'email_sent', contactId: 'contact-19', ownerId: 'user-4', date: '2026-04-25T13:00:00Z', subject: 'Power Fund III — Revised Performance Data', body: 'Steven, Per your request from our last call, attached is the full Fund II performance attribution by company and year, benchmarked against Cambridge Associates Upper Quartile. Please let me know if the format works for your scorecard. Michelle' },
  { id: 'act-10', type: 'email_sent', contactId: 'contact-10', ownerId: 'user-1', date: '2026-04-25T15:00:00Z', subject: 'Credit Opp Fund II — Subscription Documents', body: 'Lisa, Attached are the subscription documents for Credit Opportunities Fund II. Please coordinate with your fund admin on KYC/AML documentation. Alex' },

  // April 24
  { id: 'act-11', type: 'meeting', contactId: 'contact-13', ownerId: 'user-1', date: '2026-04-24T10:00:00Z', subject: 'Closing Call — Power Fund III & Credit Opp II', duration: 60, location: 'Phone', outcome: 'positive', body: 'Christopher committed to $40M Power Fund III and $20M Credit Opp II. Strong conviction on our operational value-creation playbook. Wants co-invest on next deal in industrial services space.' },
  { id: 'act-12', type: 'stage_change', contactId: 'contact-13', ownerId: 'user-1', date: '2026-04-24T11:00:00Z', previousStage: 'documentation', newStage: 'committed' },

  // April 23
  { id: 'act-13', type: 'email_received', contactId: 'contact-1', ownerId: 'user-1', date: '2026-04-23T16:45:00Z', subject: 'RE: Power Fund III — LPA Questions', body: 'Alex, Thanks for sending. A few questions for Monday\'s call: (1) Recycled capital — how does the fee offset work in the first 3 years? (2) Co-invest rights — are these ROFR or discretionary? (3) GP commit — what\'s the exact dollar figure? John' },

  // April 22
  { id: 'act-14', type: 'email_sent', contactId: 'contact-2', ownerId: 'user-1', date: '2026-04-22T10:00:00Z', subject: 'Credit Opportunities Fund II — Overview Materials', body: 'Diana, Following up on my email to John, I wanted to connect separately on the Credit Opp II opportunity, which may be relevant for your income-oriented allocation. Attaching our deck and a one-page term summary.' },
  { id: 'act-15', type: 'stage_change', contactId: 'contact-3', ownerId: 'user-1', date: '2026-04-22T15:00:00Z', previousStage: 'diligence', newStage: 'documentation' },

  // April 20
  { id: 'act-16', type: 'meeting', contactId: 'contact-5', ownerId: 'user-2', date: '2026-04-20T13:00:00Z', subject: 'Power Fund III — Initial Presentation', duration: 60, location: 'San Francisco (Pacific Endowment offices)', outcome: 'positive', body: 'Robert very engaged throughout. Particularly impressed by our operational value-creation case studies. Asked to see benchmark comparison vs. Cambridge PE benchmark. Sarah to follow up with data.' },
  { id: 'act-17', type: 'email_sent', contactId: 'contact-19', ownerId: 'user-4', date: '2026-04-20T09:00:00Z', subject: 'Power Fund III & Credit Opp II — Due Diligence Package', body: 'Steven, As discussed, attaching our full DD package: (1) Fund III overview, (2) Fund II performance attribution, (3) Team bios and org chart, (4) Reference list. Please reach out with questions.' },

  // April 18
  { id: 'act-18', type: 'email_sent', contactId: 'contact-1', ownerId: 'user-1', date: '2026-04-18T09:30:00Z', subject: 'Follow-Up — Power Fund III Presentation & Next Steps', body: 'John, Thank you for taking the time yesterday. As discussed, I\'m attaching: (1) Full Fund III tearsheet, (2) Fund II detailed performance attribution, (3) GP team bios. Happy to schedule a follow-on call once you\'ve had a chance to review.' },
  { id: 'act-19', type: 'call', contactId: 'contact-17', ownerId: 'user-3', date: '2026-04-17T14:00:00Z', subject: 'Credit Opportunities Fund II — Introductory Call', duration: 45, outcome: 'positive', body: 'Mark Robinson is very interested in private credit for yield. Wants to allocate $10–20M to build out income sleeve. Schedule in-person meeting in Denver.' },

  // April 15
  { id: 'act-20', type: 'meeting', contactId: 'contact-1', ownerId: 'user-1', date: '2026-04-15T10:00:00Z', subject: 'Power Fund III — Full Presentation', duration: 90, location: 'Los Angeles (Hillcrest offices)', outcome: 'positive', body: 'Attended by John Smith and Diana Chen. Walked through full fund strategy, team, portfolio construction, and Fund II performance. Very strong engagement. John wants to move to DD — will pull in legal and CFO.' },
  { id: 'act-21', type: 'stage_change', contactId: 'contact-1', ownerId: 'user-1', date: '2026-04-15T12:00:00Z', previousStage: 'intro_meeting', newStage: 'diligence' },
  { id: 'act-22', type: 'email_sent', contactId: 'contact-4', ownerId: 'user-2', date: '2026-04-15T09:00:00Z', subject: 'Introduction — Credit Opportunities Fund II', body: 'Patricia, I hope this finds you well. I\'m reaching out regarding Meridian\'s potential interest in our Credit Opportunities Fund II. We had a great conversation with Michael Johnson about Power Fund III and wanted to introduce our credit strategy separately. Sarah' },

  // April 12
  { id: 'act-23', type: 'email_sent', contactId: 'contact-14', ownerId: 'user-2', date: '2026-04-12T11:00:00Z', subject: 'RE: Harbor View — Credit Opp II Interest', body: 'Jennifer, Happy to send over our Credit Opp II materials. Attaching our deck and term sheet. Given Christopher\'s interest in yield, this could be a nice complement to the Power Fund III commitment. Sarah' },

  // April 10
  { id: 'act-24', type: 'email_sent', contactId: 'contact-2', ownerId: 'user-1', date: '2026-04-10T08:30:00Z', subject: 'Introduction — Hillcrest Family Office', body: 'Diana, Great meeting you at the meeting alongside John. I wanted to follow up directly to ensure you have everything you need from an operational standpoint as we progress the diligence.' },
  { id: 'act-25', type: 'email_sent', contactId: 'contact-8', ownerId: 'user-4', date: '2026-04-10T10:00:00Z', subject: 'Credit Opportunities Fund II — Private Credit Overview', body: 'Sandra, I hope this finds you well. I understand Northstar is building out its private credit allocation, and I wanted to share our Credit Opportunities Fund II which I think could be a strong fit. Michelle' },

  // April 8
  { id: 'act-26', type: 'stage_change', contactId: 'contact-1', ownerId: 'user-1', date: '2026-04-08T09:00:00Z', previousStage: 'outreach', newStage: 'intro_meeting' },

  // April 5
  { id: 'act-27', type: 'email_sent', contactId: 'contact-16', ownerId: 'user-1', date: '2026-04-05T10:00:00Z', subject: 'Introduction — WM Capital Power Fund III', body: 'Karen, I was introduced to you through a mutual contact at a recent LP conference. I wanted to share information on our Power Fund III strategy, which may be relevant as Desert Wind explores institutional PE allocations.' },
  { id: 'act-28', type: 'note', contactId: 'contact-7', ownerId: 'user-4', date: '2026-04-05T14:00:00Z', subject: 'ILPA Conference Notes', body: 'Met David Kim at the ILPA spring conference. Northstar has a new alternatives consultant (Mercer) who needs to approve any new manager relationships — adds 3–4 months to process. Next board cycle starts Q3 FY2026 (September). Key person: David Kim, but real power sits with investment consultant.' },

  // March 30
  { id: 'act-29', type: 'meeting', contactId: 'contact-9', ownerId: 'user-1', date: '2026-03-30T11:00:00Z', subject: 'Power Fund III — Final DD Call', duration: 60, outcome: 'positive', body: 'Thomas ready to commit. Walked through final LP Agreement questions — all addressed. He will confirm $20M commitment by end of April after internal paperwork is signed.' },
  { id: 'act-30', type: 'call', contactId: 'contact-3', ownerId: 'user-1', date: '2026-03-25T15:00:00Z', subject: 'IC Prep — Meridian Capital Partners', duration: 45, outcome: 'positive', body: 'Michael walked us through the Meridian IC scoring model. Two outstanding items before committee: (1) audited Fund II financials — send latest, (2) third-party reference list (need 5 LPs). Both addressed same day.' },
  { id: 'act-31', type: 'stage_change', contactId: 'contact-3', ownerId: 'user-1', date: '2026-03-25T16:00:00Z', previousStage: 'intro_meeting', newStage: 'diligence' },
  { id: 'act-32', type: 'meeting', contactId: 'contact-13', ownerId: 'user-1', date: '2026-03-20T10:00:00Z', subject: 'Harbor View Capital — Fund Overview & Strategy', duration: 75, location: 'Boston (Harbor View offices)', outcome: 'positive', body: 'Christopher Davis brought his VP Jennifer Thompson. Great cultural fit — he is a former operator who deeply appreciates our buy-and-build approach. Very serious about both funds.' },
  { id: 'act-33', type: 'email_received', contactId: 'contact-3', ownerId: 'user-1', date: '2026-03-18T10:00:00Z', subject: 'RE: Power Fund III — IC Approval Request', body: 'Alex, Great news — I\'ve formally submitted Power Fund III for IC consideration. Our next meeting is April 20. I\'ll keep you posted. Michael' },
  { id: 'act-34', type: 'note', contactId: 'contact-11', ownerId: 'user-2', date: '2026-03-15T09:00:00Z', subject: 'Intro Meeting Notes — Cornerstone Foundation', body: 'First meeting with James Wilson. Very sharp — deep institutional PE background from UT endowment. Board is pushing him to build out alternatives exposure quickly. Key differentiator for us: operational value-creation story resonated strongly. Requested 3 LP references.' },
  { id: 'act-35', type: 'stage_change', contactId: 'contact-11', ownerId: 'user-2', date: '2026-03-15T10:00:00Z', previousStage: 'intro_meeting', newStage: 'diligence' },

  // February / March
  { id: 'act-36', type: 'email_sent', contactId: 'contact-5', ownerId: 'user-2', date: '2026-03-10T09:00:00Z', subject: 'Power Fund III — Introduction', body: 'Robert, I came across Pacific Endowment\'s recent annual report and noticed your growing alternatives allocation. I wanted to introduce our Power Fund III strategy, which I believe aligns well with your portfolio objectives. Sarah' },
  { id: 'act-37', type: 'stage_change', contactId: 'contact-5', ownerId: 'user-2', date: '2026-03-20T10:00:00Z', previousStage: 'outreach', newStage: 'intro_meeting' },
  { id: 'act-38', type: 'meeting', contactId: 'contact-11', ownerId: 'user-2', date: '2026-03-12T13:00:00Z', subject: 'Cornerstone Foundation — Introductory Meeting', duration: 60, location: 'Dallas (Cornerstone offices)', outcome: 'positive', body: 'Initial meeting went very well. James Wilson is building a new alternatives program and is looking for 3–5 core PE managers. We were referred by a mutual contact at the University of Texas.' },
  { id: 'act-39', type: 'call', contactId: 'contact-19', ownerId: 'user-4', date: '2026-03-22T11:00:00Z', subject: 'Eastbrook Institutional — Introductory Call', duration: 30, outcome: 'positive', body: 'Steven Lewis runs a very systematic process. Full DD package requested. He scores managers on 12 criteria including team stability, strategy differentiation, and operational capabilities.' },
  { id: 'act-40', type: 'stage_change', contactId: 'contact-19', ownerId: 'user-4', date: '2026-03-22T12:00:00Z', previousStage: 'intro_meeting', newStage: 'diligence' },
]
