# ONE-PERSON HEDGE FUND

## Built in Claude Code | Architecture by Dave Wang

-----

## THE SYSTEM AT A GLANCE

```
CLAUDE.md (Brain)
    ↓
SKILLS (Workflows)  ←→  MCP SERVERS (Live Data)
    ↓                         ↓
SUB-AGENTS (Parallel Research)
    ↓
WORKTREES (Scenario Lab)
    ↓
DILIGENCE MEMO → POSITION SIZING → TRADE
```

-----

## QUICK START

### Step 1: Set up your brain

Read `CLAUDE.md`. Customize your:

- Investment philosophy (growth vs. value focus)
- Sector coverage universe
- Kill criteria thresholds
- Preferred multiples

### Step 2: Connect your data pipeline

See `MCP-SERVERS.md`. You need:

- FRED API key (free at fred.stlouisfed.org)
- SEC EDGAR (no key needed)
- Yahoo Finance (no key needed)
- Puppeteer for web scraping

### Step 3: Run your first screen

```
/screen
```

Returns top candidates matching your CLAUDE.md criteria.

### Step 4: Run full diligence on a name

```
/diligence-checklist AAPL
```

Triggers 5 sub-agents in parallel. Returns full memo in ~5 minutes.

### Step 5: Validate the multiples

```
/comps AAPL MSFT GOOGL META AMZN
```

Puts the target in context vs. peers.

### Step 6: Stress-test your assumptions

Create worktree branches. Run bull/base/bear scenarios. Size the position.

-----

## FILE STRUCTURE

```
hedge-fund/
├── CLAUDE.md                    ← YOUR DILIGENCE BRAIN (read this first)
├── MCP-SERVERS.md               ← Live data pipeline setup
├── README.md                    ← This file
│
├── skills/
│   ├── screen.md                ← /screen skill
│   ├── diligence-checklist.md   ← /diligence-checklist skill (5 agents)
│   ├── comps.md                 ← /comps skill
│   └── earnings-delta-filing-diff-mgmt-scorecard.md  ← 3 skills
│
├── agents/
│   └── sub-agents.md            ← All 5 sub-agent prompts
│
├── worktrees/
│   └── worktrees-guide.md       ← Scenario stress-testing protocol
│
├── memos/                       ← Your completed diligence memos live here
│   └── [TICKER]-memo-[DATE].md
│
├── output/                      ← Comp tables, screen results, scoring outputs
│   └── screen-[DATE].md
│
└── dashboard/                   ← Interactive architecture overview (Vite + React)
    └── src/HedgeFundDashboard.jsx
```

-----

## THE FULL WORKFLOW (5 Steps)

```
STEP 1 → CLAUDE.md defines your edge
         "EV/NTM Revenue for growth names. Kill if insider selling >$10M."

STEP 2 → Run /screen
         Skill pulls data via MCP → filters on your criteria → returns top candidates

STEP 3 → Run /diligence-checklist [TICKER]
         Triggers 5 sub-agents in parallel:
         • Agent 1: Bull case
         • Agent 2: Bear case
         • Agent 3: Mgmt credibility scoring
         • Agent 4: Filing diff
         • Agent 5: Revenue quality

STEP 4 → Results converge into formatted diligence memo
         Follows CLAUDE.md structure → variant perception, catalysts, risk matrix

STEP 5 → Branch into worktrees for scenario stress-testing
         Base/bull/bear → compare side by side → size the position
```

-----

## POSITION SIZING (from CLAUDE.md)

| Conviction | Size  | Criteria                                                              |
|------------|-------|-----------------------------------------------------------------------|
| High       | 8–12% | All 6 checklist pass + strong variant perception + catalyst <6 months |
| Medium     | 4–7%  | 5/6 checklist pass + clear thesis                                     |
| Starter    | 1–3%  | Building thesis                                                       |
| Zero       | 0%    | Any kill criterion triggered                                          |

-----

## KEY NUMBERS TO REMEMBER

- Management credibility threshold: **≥6.0/10** (kill below this)
- Insider selling kill trigger: **>$10M** trailing 6 months
- Customer concentration kill: **>40%** single customer
- Max position size: **12%**
- Max sector concentration: **35%**
- Cash target: **5–15%**
- Risk/reward minimum: **2:1** upside:downside

-----

## CUSTOMIZATION GUIDE

To make this YOUR hedge fund, edit `CLAUDE.md`:

1. **Change your sector focus** → Edit "SECTOR COVERAGE UNIVERSE"
1. **Adjust valuation multiples** → Edit "PREFERRED MULTIPLES"
1. **Tighten/loosen kill criteria** → Edit "KILL CRITERIA"
1. **Change position sizing rules** → Edit "POSITION SIZING RULES"
1. **Add custom checklist items** → Edit "DILIGENCE CHECKLIST"

The skills, agents, and worktrees automatically pick up your CLAUDE.md changes.

-----

## DASHBOARD

An interactive architecture overview lives in `dashboard/`. To run it:

```bash
cd dashboard
npm install
npm run dev
```

Opens at http://localhost:5173 — visualizes the 5-layer system, workflow steps, and position sizing rules.

-----

*Architecture inspired by Dave Wang / Wall Street Prompt*
*Built for serious fundamental investors who want institutional-grade process, solo.*
