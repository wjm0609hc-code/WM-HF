# SKILL: /screen

# Quantitative Screen — Pull candidates matching your investment criteria

## What This Skill Does

Screens a universe of stocks against the criteria defined in CLAUDE.md.
Pulls live data via MCP (Yahoo Finance, EDGAR).
Returns a ranked list of candidates for deeper diligence.

## Trigger

```
/screen [optional: custom criteria override]
```

## Default Screen Criteria (from CLAUDE.md)

- Revenue growth: >15% YoY
- Gross margin: >50%
- EV/NTM Revenue: <8x (growth), or EV/NTM EBITDA <18x (value)
- Net debt/EBITDA: <3x
- Market cap: $500M–$50B (mid-cap focus)
- No kill criteria flags (insider selling, restatements)
- Rule of 40 score: >35

## Data Sources

- Yahoo Finance: Prices, market cap, revenue, EBITDA, EPS estimates
- SEC EDGAR: Recent insider transactions (Form 4), filing dates
- FRED: Macro context overlay (rate environment, sector comps)

## Output Format

```
SCREEN RESULTS — [Date]
Criteria: [Summary of filters applied]
Universe: [N stocks screened]

RANK | TICKER | NAME | MKT CAP | EV/NTM REV | REV GROWTH | RULE OF 40 | INSIDER FLAG | SCORE
-----|--------|------|---------|------------|------------|------------|--------------|------
1    | XXXX   | ...  | $XB     | Xx         | X%         | XX         | CLEAN        | X/10

TOP CANDIDATES FOR DILIGENCE:
1. [TICKER] — [One-line reason why interesting]
2. [TICKER] — [One-line reason why interesting]
3. [TICKER] — [One-line reason why interesting]

NEXT STEP: Run /diligence-checklist [TICKER] on top candidates.
```

## Sub-Agent Calls

This skill spawns:

- Agent A: Pull financials + estimates for universe (Yahoo Finance MCP)
- Agent B: Pull insider transaction flags (EDGAR MCP)
- Merge + rank outputs, apply CLAUDE.md filters

## Instructions for Claude Code

1. Read CLAUDE.md first — load all screening criteria
1. Spawn Agent A + Agent B in parallel
1. Merge results, apply all filters
1. Rank by composite score (weighted: valuation 30%, growth 30%, quality 25%, insider 15%)
1. Return formatted table + top 3 candidates flagged for /diligence-checklist
1. Flag any names that partially pass (borderline) for manual review
