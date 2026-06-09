# MCP SERVERS — Live Data Pipeline

# Connect Claude Code to live data. No copy-paste. No stale spreadsheets.

-----

## The Four Core Data Feeds

### 1. SEC EDGAR

**What it gives you:** 10-Ks, 10-Qs, proxies, insider transactions (Form 4), 8-Ks
**MCP Server:** `https://efts.sec.gov/LATEST/search-index` (EDGAR full-text search)
**Key endpoints:**

- Company filings: `https://data.sec.gov/submissions/CIK[NUMBER].json`
- Filing documents: `https://www.sec.gov/Archives/edgar/data/[CIK]/[ACCESSION]/`
- EDGAR full-text search: `https://efts.sec.gov/LATEST/search-index?q=[query]&dateRange=custom`
- Form 4 (insider transactions): Filter by `form-type=4`

**Use for:** Filing diffs, insider transaction crosscheck, risk factor changes, revenue recognition policies

-----

### 2. FRED (Federal Reserve Economic Data)

**What it gives you:** Rates, GDP, CPI, unemployment, yield curves, sector-level economic data
**MCP Server:** `https://fred.stlouisfed.org/`
**API Base:** `https://api.stlouisfed.org/fred/`
**Key series:**

- Fed Funds Rate: `FEDFUNDS`
- 10-Year Treasury: `DGS10`
- 2-Year Treasury: `DGS2`
- CPI YoY: `CPIAUCSL`
- Unemployment: `UNRATE`
- GDP Growth: `A191RL1Q225SBEA`
- PCE Inflation: `PCEPI`

**Use for:** Macro overlay on thesis, rate sensitivity analysis, discount rate inputs for DCF

-----

### 3. Yahoo Finance

**What it gives you:** Prices, market cap, EV, revenue, EBITDA, EPS, consensus estimates, fundamentals
**Key data points:**

- Real-time price, 52-week range, volume
- Consensus NTM/NTM+1 revenue, EBITDA, EPS estimates
- Historical financials (3–5 years)
- Key ratios: P/E, EV/Revenue, EV/EBITDA, P/FCF
- Analyst ratings and price targets
- Short interest data

**Use for:** Comp tables, valuation multiples, consensus vs. our estimate, earnings surprise tracking

-----

### 4. Web Scrape (News, Transcripts, IR Decks)

**What it gives you:** News, press releases, earnings call transcripts, investor presentations
**Sources to scrape:**

- Earnings call transcripts: Seeking Alpha, The Motley Fool earnings pages
- Press releases: PR Newswire, BusinessWire, company IR pages
- Investor presentations: Company IR pages (`.pdf` decks)
- News: Google News, Bloomberg snippets, Reuters
- Analyst notes: (public summaries only)

**Use for:** Management tone analysis, new business announcements, competitive intelligence, industry channel checks

-----

## Data Freshness Rules

| Data Type            | Max Staleness Allowed | Action if Stale                     |
|----------------------|-----------------------|-------------------------------------|
| Stock price          | 1 day                 | Fetch fresh before any analysis     |
| NTM estimates        | 7 days                | Re-pull if earnings in past week    |
| 10-Q/10-K            | Current quarter       | Pull latest from EDGAR              |
| Insider transactions | 30 days               | Pull all Form 4s from past 6 months |
| Macro data (FRED)    | 7 days                | Re-pull for DCF inputs              |
| News/transcripts     | Situational           | Pull for any analysis               |

**Always note the data pull date in your memo.**

-----

## MCP Integration in Skills

Each skill calls the relevant MCP server(s):

```
/screen              → Yahoo Finance + EDGAR (Form 4)
/diligence-checklist → All four MCP servers
/comps               → Yahoo Finance (all tickers in parallel)
/earnings-delta      → EDGAR + Yahoo Finance
/filing-diff         → EDGAR only
/mgmt-scorecard      → Web Scrape (transcripts) + EDGAR (actuals)
```

-----

## Claude Code MCP Configuration

Add to your Claude Code settings:

```json
{
  "mcpServers": {
    "edgar": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-edgar"],
      "description": "SEC EDGAR filings and insider transactions"
    },
    "fred": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-fred"],
      "env": {
        "FRED_API_KEY": "YOUR_FRED_API_KEY"
      },
      "description": "Federal Reserve Economic Data"
    },
    "yahoo-finance": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-yahoo-finance"],
      "description": "Stock prices, fundamentals, consensus estimates"
    },
    "web-scrape": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-puppeteer"],
      "description": "Web scraping for news, transcripts, IR decks"
    }
  }
}
```

**Free API keys:**

- FRED: https://fred.stlouisfed.org/docs/api/api_key.html (free)
- SEC EDGAR: No API key required for public filings
- Yahoo Finance: Use unofficial API (no key needed for basic data)
