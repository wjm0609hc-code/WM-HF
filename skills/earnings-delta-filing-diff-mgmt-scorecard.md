# SKILL: /earnings-delta

# What Changed vs. Last Quarter

## Trigger

```
/earnings-delta [TICKER]
```

## What It Does

Compares the most recent earnings release vs. the prior quarter.
Surfaces the KEY CHANGES an investor needs to know in under 5 minutes.

## Data Sources

- EDGAR MCP: Current + prior 10-Q / earnings press releases
- Yahoo Finance MCP: Estimate revisions, price reaction

## Output Format

```
EARNINGS DELTA: [TICKER] | Q[X] [YEAR] vs. Q[X-1] [YEAR]

HEADLINE NUMBERS
Metric          | This Q  | Last Q  | Change  | vs. Consensus
----------------|---------|---------|---------|---------------
Revenue         | $XXM    | $XXM    | +X%     | Beat/Miss by X%
Gross Margin    | X%      | X%      | +Xbps   | Beat/Miss
EBITDA          | $XXM    | $XXM    | +X%     | Beat/Miss
EPS             | $X.XX   | $X.XX   | +X%     | Beat/Miss
FCF             | $XXM    | $XXM    | +X%     | —

GUIDANCE CHANGES
NTM Revenue guidance: OLD $XXX–$XXX → NEW $XXX–$XXX | [Raised/Lowered/Maintained]
NTM EBITDA guidance: OLD → NEW | [Raised/Lowered/Maintained]

KEY CHANGES (What actually matters)
✅ POSITIVE: [List 3 most important positive changes]
⚠️  WATCH: [List 2-3 things to monitor]
🚨 CONCERN: [List any red flags]

MANAGEMENT TONE SHIFT
vs. Last Quarter: [More/Less confident] — Evidence: [Quote comparison]

VERDICT: [BULLISH INFLECTION / STEADY STATE / CONCERNING DECELERATION]
```

-----

# SKILL: /filing-diff

# Word-by-Word 10-Q Diff vs. Prior Quarter

## Trigger

```
/filing-diff [TICKER]
```

## What It Does

Pulls the last two 10-Qs from EDGAR and diffs them section by section.
Highlights new language, deleted language, and material changes.
Flags anything that could signal a change in business fundamentals.

## Key Sections to Diff

1. MD&A (Management Discussion & Analysis)
1. Risk Factors (new risks added? old risks removed?)
1. Liquidity and Capital Resources
1. Revenue recognition policies
1. Going concern language (flag immediately if present)
1. Legal proceedings (new lawsuits?)

## Output Format

```
FILING DIFF: [TICKER]
Current: 10-Q filed [DATE] | Prior: 10-Q filed [DATE]

🚨 CRITICAL CHANGES (Requires immediate attention)
[Any going concern, material weakness, new SEC investigation, etc.]

📋 MD&A CHANGES
ADDED: "[New language in quotes]"
REMOVED: "[Deleted language in quotes]"
CHANGED: "[Old] → [New]"

⚠️  RISK FACTOR CHANGES
New risks added: [List]
Risks removed: [List — why removed?]

💰 LIQUIDITY CHANGES
[Changes to cash, credit facilities, covenant headroom]

📊 REVENUE RECOGNITION CHANGES
[Any policy changes that affect reported numbers]

⚖️  LEGAL PROCEEDINGS
[New cases, status changes, settlement amounts]

FORM 4 INSIDER TRANSACTIONS (Last 6 months)
Name          | Title | Transaction | Shares  | Price  | Value   | Date
--------------|-------|-------------|---------|--------|---------|------
[Name]        | CEO   | SELL        | XXX,XXX | $XX.XX | $XXM    | [Date]

INSIDER ACTIVITY VERDICT: [CLEAN / WATCH / KILL FLAG — insider selling >$10M]

OVERALL FILING VERDICT: [CLEAN / MONITOR / RED FLAG — explain]
```

-----

# SKILL: /mgmt-scorecard

# Management Credibility Score — Guidance vs. Actuals (3 Years)

## Trigger

```
/mgmt-scorecard [TICKER]
```

## What It Does

Scores management's track record of delivering on what they promised.
Pulls 3 years of earnings call transcripts and cross-references guidance vs. actuals.
Produces a credibility score and pattern analysis.

## Data Sources

- Web Scrape MCP: Earnings call transcripts (last 12 quarters)
- EDGAR MCP: Reported actuals from 10-Qs and 10-Ks
- Yahoo Finance MCP: Consensus estimates at time of guidance

## Scoring Methodology

For each guidance item (revenue, EBITDA, EPS, margin):

- Beat guidance by >3%: 2 points
- Met guidance (within 3%): 1 point
- Missed guidance by 3–10%: 0 points
- Missed guidance by >10%: -1 point

Score = (Total points / Max possible) × 10

## Output Format

```
MANAGEMENT SCORECARD: [TICKER] — [CEO NAME]
Period: [START DATE] — [END DATE] | [N] quarters analyzed

OVERALL CREDIBILITY SCORE: X.X / 10
Threshold (CLAUDE.md): ≥6.0 | STATUS: [PASS / FAIL — KILL]

QUARTERLY GUIDANCE TRACKER
Quarter  | Metric  | Guidance    | Actual  | Delta  | Score
---------|---------|-------------|---------|--------|------
Q1 20XX  | Revenue | $XXX–$XXXM  | $XXXM   | +X%    | ✅ Beat
Q1 20XX  | EBITDA  | $XX–$XXM    | $XXM    | -X%    | ❌ Miss
...

PATTERN ANALYSIS
Sandbagging? [Yes/No — evidence]
Serial misser on [metric]? [Yes/No]
Credibility trend: [Improving / Stable / Deteriorating]

TONE ANALYSIS (Last 4 quarters)
Q[X]: [Confident/Hedging/Defensive] — Notable language: "[Quote]"

KEY QUOTES (Most telling statements)
[Quote 1 — why it matters]
[Quote 2 — why it matters]

VERDICT: [HIGH CREDIBILITY / ADEQUATE / LOW — KILL FLAG]
RECOMMENDATION: [Proceed to full diligence / Discount guidance significantly / Kill]
```
