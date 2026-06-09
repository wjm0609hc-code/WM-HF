# SKILL: /diligence-checklist

# Full Diligence Run — Triggers 5 Sub-Agents in Parallel

## What This Skill Does

Runs a full institutional-grade diligence workflow on a single ticker.
Spawns 5 specialized sub-agents simultaneously.
Converges results into a formatted diligence memo following CLAUDE.md structure.

## Trigger

```
/diligence-checklist [TICKER]
```

## The 5 Sub-Agents (Run in Parallel)

### Agent 1: BULL CASE

**Task:** Build the bull case scenario

- Pull NTM estimates (Yahoo Finance)
- Model upside multiples (EV/Revenue, EV/EBITDA)
- Identify acceleration catalysts
- Calculate bull price target with assumptions
- Output: Bull case price target + probability weight + key assumptions

### Agent 2: BEAR CASE

**Task:** Build the bear case scenario

- Model compression multiples (EV/Revenue, EV/EBITDA)
- Identify key risks and their financial impact
- Calculate bear price target (floor scenario)
- Check kill criteria (insider selling, restatements)
- Output: Bear case price target + probability weight + downside drivers

### Agent 3: MANAGEMENT CREDIBILITY SCORECARD

**Task:** Score management's track record

- Pull last 12 earnings call transcripts (Web Scrape MCP)
- Extract all forward guidance statements
- Cross-reference vs. actual reported results (EDGAR MCP)
- Score: (Targets hit / Total targets stated) × 10
- Flag: sandbagging patterns, serial misses, tone shifts
- Output: Credibility score /10 + evidence table

### Agent 4: FILING DIFF

**Task:** Find what changed in the most recent filing

- Pull current 10-Q (EDGAR MCP)
- Pull prior quarter 10-Q (EDGAR MCP)
- Diff word-by-word — flag NEW language, DELETED language, CHANGED language
- Focus on: MD&A, Risk Factors, Liquidity, Revenue recognition policies
- Pull Form 4 filings — insider buy/sell in last 6 months
- Output: Red flags (if any) + key changes summary + insider transaction table

### Agent 5: REVENUE QUALITY + CUSTOMER CONCENTRATION

**Task:** Analyze the quality and durability of revenue

- Pull revenue breakdown from 10-K/10-Q (EDGAR MCP)
- Identify: recurring vs. one-time, geographic mix, customer concentration
- Check: % revenue from top 1, top 3, top 5 customers
- Analyze: Contract lengths, renewal rates, churn signals
- Check: Revenue recognition policies for aggressive practices
- Output: Revenue quality score /10 + customer concentration flags

-----

## Convergence: Diligence Memo Format

After all 5 agents complete, synthesize into:

```
═══════════════════════════════════════════════════
DILIGENCE MEMO: [TICKER] — [COMPANY NAME]
Date: [DATE] | Analyst: One-Person Hedge Fund
═══════════════════════════════════════════════════

1. ONE-LINE THESIS
[Single sentence: What we believe and why it's mispriced]

2. VARIANT PERCEPTION
Market consensus: [What the street thinks]
Our view: [What we think differently]
Why we're right: [Evidence base]

3. CHECKLIST RESULTS
□ Business Quality: [Score/10] — [Pass/Fail]
□ Financial Quality: [Score/10] — [Pass/Fail]
□ Management Credibility: [Score/10] — [Pass/Fail] ← Agent 3
□ Balance Sheet: [Pass/Fail]
□ Variant Perception: [Pass/Fail]
□ Catalyst Timeline: [Pass/Fail]

OVERALL: [PASS — proceed / FAIL — walk away]
Kill criteria triggered: [YES/NO — list if yes]

4. BUSINESS OVERVIEW
[2-3 paragraphs: what they do, how they make money, moat source]

5. FINANCIAL ANALYSIS
[3-year revenue, EBITDA, FCF table + NTM estimates]

6. MANAGEMENT SCORECARD
[Credibility score + evidence] ← Agent 3 output

7. BULL CASE ← Agent 1 output
Price Target: $XXX | Probability: XX%
Key assumptions: [List]

8. BASE CASE
Price Target: $XXX | Probability: XX%
Key assumptions: [List]

9. BEAR CASE ← Agent 2 output
Price Target: $XXX | Probability: XX%
Key assumptions / kill triggers: [List]

10. CATALYST TIMELINE
[Date] — [Catalyst] — [Expected impact]
[Date] — [Catalyst] — [Expected impact]

11. RISK MATRIX
Risk | Probability | Impact (1-5) | Mitigation
-----|-------------|--------------|----------
[5 risks listed]

12. REVENUE QUALITY ← Agent 5 output
[Revenue quality score + concentration flags]

13. FILING CHANGES ← Agent 4 output
[Key changes + insider transaction summary]

14. POSITION SIZING RECOMMENDATION
Conviction: [High/Medium/Starter]
Recommended size: [X% of portfolio]
Entry range: [$XX — $XX]
Target hold period: [X months]

═══════════════════════════════════════════════════
NEXT STEP: Run /comps [TICKER] to validate multiples.
Run worktree branches for scenario stress-testing.
═══════════════════════════════════════════════════
```

## Instructions for Claude Code

1. Read CLAUDE.md — load all checklist criteria, multiples, kill criteria
1. Spawn Agents 1–5 in parallel (isolated contexts)
1. Wait for all 5 to complete
1. Check kill criteria first — if triggered, STOP and flag immediately
1. Evaluate all 6 checklist items — must ALL pass
1. Synthesize into the memo format above
1. Assign probability weights to bull/base/bear
1. Output conviction level and position sizing recommendation
