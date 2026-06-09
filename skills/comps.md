# SKILL: /comps

# Comparable Company Analysis — Peer Valuation Table

## Trigger

```
/comps [TICKER] [optional: PEER1,PEER2,PEER3,PEER4,PEER5]
```

If no peers specified, auto-select 5–8 closest comps based on sector + size.

## Data Sources

- Yahoo Finance MCP: Prices, market cap, EV, revenue, EBITDA, net income, EPS
- EDGAR MCP: Last 10-K/10-Q for any missing data
- Consensus estimates: NTM and NTM+1 from Yahoo Finance

## Output Format

```
COMP TABLE: [TICKER] vs. Peers
As of: [Date]

COMPANY      | TICKER | MKT CAP | EV     | EV/NTM REV | EV/NTM EBITDA | P/NTM E | REV GROWTH | EBITDA MARGIN | RULE OF 40 | NET DEBT/EBITDA
-------------|--------|---------|--------|------------|---------------|---------|------------|---------------|------------|---------------
[TARGET]     | XXXX   | $XB     | $XB    | Xx         | Xx            | Xx      | X%         | X%            | XX         | Xx
[PEER 1]     | XXXX   | $XB     | $XB    | Xx         | Xx            | Xx      | X%         | X%            | XX         | Xx
[PEER 2]     | XXXX   | $XB     | $XB    | Xx         | Xx            | Xx      | X%         | X%            | XX         | Xx
...

PEER MEDIAN  |        |         |        | Xx         | Xx            | Xx      | X%         | X%            | XX         | Xx
PEER MEAN    |        |         |        | Xx         | Xx            | Xx      | X%         | X%            | XX         | Xx

[TICKER] vs. Median:
- EV/NTM Revenue: X% [premium/discount] — Justified? [Yes/No — reason]
- EV/NTM EBITDA: X% [premium/discount] — Justified? [Yes/No — reason]

VALUATION CONCLUSION:
[TICKER] trades at [premium/discount/in-line] to peers.
At peer median multiple, implied price: $XXX ([upside/downside]%)
At growth-adjusted (PEG-equivalent) multiple, implied price: $XXX
```

## Instructions for Claude Code

1. Read CLAUDE.md for preferred multiples by sector/growth profile
1. Pull all data from Yahoo Finance MCP in parallel for all tickers
1. Calculate NTM estimates (blend current + next fiscal year)
1. Flag any outliers (>2 std deviations from peer group)
1. Assess whether target's premium/discount is justified by growth + quality
1. Note data freshness — flag if estimates >30 days stale
