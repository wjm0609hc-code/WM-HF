# WORKTREES — Scenario Stress-Testing Lab

# Branch your analysis. Test assumptions. Merge the winner.

-----

## What Worktrees Do

Worktrees let you model multiple scenarios in isolated branches without contaminating your base case. You run the same diligence workspace under different assumption sets, compare the outputs side by side, then merge the best-supported scenario.

**The rule:** Never stress-test on your main branch. Branch first.

-----

## The Three-Branch Structure

```
main (base case)
├── bull-[TICKER]-[DATE]     ← expansion multiples, accelerating growth
└── bear-[TICKER]-[DATE]     ← compression multiples, decelerating growth
```

-----

## BRANCH CREATION PROTOCOL

### Base Case (main branch)

Uses consensus estimates + CLAUDE.md default multiples.
This is what the market broadly expects.

**Assumptions template:**

```
TICKER: [XXXX]
Date: [DATE]
Scenario: BASE CASE

Revenue NTM: $XXXm (consensus estimate)
Revenue growth: X% (in line with company guide)
EBITDA margin NTM: X% (consensus)
Exit multiple: Xx EV/NTM EBITDA (sector median)
Implied price: $XX.XX
Upside/downside from current: X%
Probability weight: XX%
```

-----

### Bull Case Branch (`bull-[TICKER]-[DATE]`)

Stress-tests the upside: faster growth, margin expansion, multiple re-rating.

**What to change vs. base:**

- Revenue: +5–15% vs. consensus (accelerating growth scenario)
- EBITDA margin: +200–500bps vs. consensus (operating leverage kicking in)
- Multiple: Premium to sector median (quality re-rating)

**Assumptions template:**

```
TICKER: [XXXX]
Date: [DATE]
Scenario: BULL CASE

Revenue NTM: $XXXm (+X% vs. consensus — justified by [reason])
Revenue growth: X% (acceleration from [X]% to [X]% — catalyst: [event])
EBITDA margin NTM: X% (+Xbps vs. consensus — operating leverage from [driver])
Exit multiple: Xx EV/NTM EBITDA (premium to [comp] justified by [quality metric])
Implied price: $XX.XX
Upside from current: X%
Probability weight: XX%

For bull case to materialize:
□ [Specific condition 1]
□ [Specific condition 2]
□ [Specific condition 3]
```

-----

### Bear Case Branch (`bear-[TICKER]-[DATE]`)

Stress-tests the downside: slower growth, margin pressure, multiple compression.

**What to change vs. base:**

- Revenue: -5–20% vs. consensus (deceleration / demand weakness)
- EBITDA margin: -200–600bps vs. consensus (competitive pressure / investment cycle)
- Multiple: Discount to sector median (quality discount, sentiment reset)

**Assumptions template:**

```
TICKER: [XXXX]
Date: [DATE]
Scenario: BEAR CASE

Revenue NTM: $XXXm (-X% vs. consensus — risk: [specific risk])
Revenue growth: X% (deceleration from [X]% — driver: [reason])
EBITDA margin NTM: X% (-Xbps vs. consensus — pressure from [driver])
Exit multiple: Xx EV/NTM EBITDA (discount to peers — reason: [risk])
Implied price: $XX.XX
Downside from current: X%
Probability weight: XX%

Bear case is triggered by:
□ [Specific kill trigger 1]
□ [Specific kill trigger 2]
□ [Specific kill trigger 3]

STOP LOSS: Exit position if price falls below $XX.XX (bear case is playing out)
```

-----

## SCENARIO COMPARISON OUTPUT

After running all three branches:

```
SCENARIO ANALYSIS: [TICKER]
As of: [DATE] | Current Price: $XX.XX

Scenario     | Price Target | Upside/Down | Probability | Key Driver
-------------|-------------|-------------|-------------|------------------
Bull Case    | $XXX        | +XX%        | XX%         | [1-line driver]
Base Case    | $XXX        | +XX%        | XX%         | [1-line driver]
Bear Case    | $XXX        | -XX%        | XX%         | [1-line driver]

PROBABILITY-WEIGHTED TARGET: $XXX (+XX% from current)
EXPECTED VALUE: [Positive/Negative]

RISK/REWARD:
- Upside to bull: +XX%
- Downside to bear: -XX%
- Ratio: [X]:1 [Favorable if >2:1]

SIZING DECISION:
[Based on EV and conviction, recommended position size per CLAUDE.md rules]
```

-----

## MERGE PROTOCOL

1. Review all three scenario outputs side by side
1. Ask: "Which scenario does the current data support?"
1. Use the probability-weighted target as your base price target
1. If risk/reward is >2:1 favorable AND checklist passes: size per CLAUDE.md
1. Archive losing scenario branches (don't delete — they become your stop-loss triggers)
1. Update main branch with final position memo

-----

## WORKTREE COMMANDS (Claude Code)

```bash
# Create bull case branch
git worktree add ../bull-TICKER-DATE -b bull-TICKER-DATE

# Create bear case branch
git worktree add ../bear-TICKER-DATE -b bear-TICKER-DATE

# List active worktrees
git worktree list

# Compare scenarios
diff -u bear-TICKER-DATE/memo.md bull-TICKER-DATE/memo.md

# Merge best scenario back to main
git checkout main
git merge bull-TICKER-DATE --no-ff -m "Merge bull case: TICKER"
```
