import { useState } from "react";

const LAYERS = [
  {
    id: "claude-md",
    label: "CLAUDE.md",
    sublabel: "Diligence Brain",
    icon: "🧠",
    color: "#00D4AA",
    description: "Your investment OS. Read before every task.",
    items: [
      "Investment philosophy & edge",
      "Sector coverage universe",
      "Diligence checklist (6 must-pass items)",
      "Preferred multiples & valuation approach",
      "Thesis structure template",
      "Kill criteria — when to walk away",
      "Position sizing rules",
    ],
    cta: "Defines your entire analytical framework",
  },
  {
    id: "skills",
    label: "SKILLS",
    sublabel: "Diligence Workflows",
    icon: "⚙️",
    color: "#7B61FF",
    description: "One-command execution. Build once, trigger forever.",
    items: [
      "/screen — Quantitative screen on your criteria",
      "/diligence-checklist — Full run, 5 agents",
      "/comps — Peer valuation table",
      "/earnings-delta — What changed vs. last quarter",
      "/filing-diff — 10-Q word-by-word diff",
      "/mgmt-scorecard — Guidance vs. actuals, 3 yrs",
    ],
    cta: "Automates every repeatable research workflow",
  },
  {
    id: "mcp",
    label: "MCP SERVERS",
    sublabel: "Live Data Pipeline",
    icon: "📡",
    color: "#FF6B35",
    description: "No copy-paste. No stale data. Live feeds only.",
    items: [
      "SEC EDGAR — 10-Ks, 10-Qs, Form 4 insider transactions",
      "FRED — Rates, GDP, CPI, yield curves",
      "Yahoo Finance — Prices, estimates, fundamentals",
      "Web Scrape — Transcripts, press releases, IR decks",
    ],
    cta: "Real-time data flows directly into your workflows",
  },
  {
    id: "agents",
    label: "SUB-AGENTS",
    sublabel: "Parallel Research Team",
    icon: "👥",
    color: "#FFD93D",
    description: "5 analysts working simultaneously. Results converge.",
    items: [
      "Agent 1: Bull case — upside multiples + catalysts",
      "Agent 2: Bear case — kill criteria + floor",
      "Agent 3: Mgmt credibility — 3yr guidance scorecard",
      "Agent 4: Filing diff — 10-Q changes + insider flow",
      "Agent 5: Revenue quality — concentration + durability",
    ],
    cta: "Parallel diligence in the time it used to take for one task",
  },
  {
    id: "worktrees",
    label: "WORKTREES",
    sublabel: "Scenario Lab",
    icon: "🌿",
    color: "#4ECDC4",
    description: "Branch your thesis. Stress-test. Merge the winner.",
    items: [
      "main branch — Base case (consensus estimates)",
      "bull-[TICKER] — Expansion multiples, acceleration",
      "bear-[TICKER] — Compression, deceleration",
      "Compare outputs side by side",
      "Merge best-supported scenario back to main",
    ],
    cta: "Never contaminate your base case with stress-test assumptions",
  },
];

const WORKFLOW = [
  {
    step: "01",
    title: "Load your brain",
    cmd: "CLAUDE.md",
    desc: "Claude reads your investment philosophy before every task. Sets multiples, kill criteria, checklist.",
  },
  {
    step: "02",
    title: "Screen for names",
    cmd: "/screen",
    desc: "Pulls universe via Yahoo Finance + EDGAR. Filters on your criteria. Returns ranked candidates.",
  },
  {
    step: "03",
    title: "Full diligence",
    cmd: "/diligence-checklist TICKER",
    desc: "Fires 5 sub-agents in parallel. Bull, bear, mgmt, filing diff, revenue quality — all at once.",
  },
  {
    step: "04",
    title: "Validate multiples",
    cmd: "/comps TICKER",
    desc: "Builds peer comp table. EV/Revenue, EV/EBITDA, P/E vs. 5–8 comps. Flags premium/discount.",
  },
  {
    step: "05",
    title: "Stress-test & size",
    cmd: "worktrees",
    desc: "Branch bull/bear scenarios. Compare side by side. Size position per CLAUDE.md conviction rules.",
  },
];

const SIZING = [
  { level: "High Conviction", size: "8–12%", color: "#00D4AA", criteria: "All 6 checklist pass · Strong variant perception · Catalyst < 6 months" },
  { level: "Medium Conviction", size: "4–7%", color: "#7B61FF", criteria: "5/6 checklist pass · Clear thesis · Catalyst visible" },
  { level: "Starter / Tracking", size: "1–3%", color: "#FFD93D", criteria: "Building thesis · Monitoring catalyst" },
  { level: "No Position", size: "0%", color: "#FF4444", criteria: "Any kill criterion triggered — walk away immediately" },
];

export default function HedgeFundDashboard() {
  const [activeLayer, setActiveLayer] = useState(null);
  const [activeTab, setActiveTab] = useState("architecture");

  return (
    <div style={{
      background: "#0A0E1A",
      minHeight: "100vh",
      color: "#E8EDF5",
      fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        borderBottom: "1px solid #1E2535",
        padding: "20px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#0D1220",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: "#00D4AA", boxShadow: "0 0 8px #00D4AA"
            }} />
            <span style={{ fontSize: "11px", color: "#00D4AA", letterSpacing: "2px", fontWeight: 600 }}>
              LIVE SYSTEM
            </span>
          </div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, margin: "4px 0 0", letterSpacing: "-0.5px" }}>
            One-Person Hedge Fund
          </h1>
          <p style={{ fontSize: "12px", color: "#6B7A9B", margin: "2px 0 0" }}>
            Built entirely in Claude Code · 5-layer architecture
          </p>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {["architecture", "workflow", "sizing"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "7px 14px",
              borderRadius: "6px",
              border: activeTab === tab ? "1px solid #00D4AA" : "1px solid #1E2535",
              background: activeTab === tab ? "rgba(0,212,170,0.1)" : "transparent",
              color: activeTab === tab ? "#00D4AA" : "#6B7A9B",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              textTransform: "capitalize",
              letterSpacing: "0.5px",
            }}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "24px 28px" }}>

        {/* ARCHITECTURE TAB */}
        {activeTab === "architecture" && (
          <div>
            <p style={{ fontSize: "13px", color: "#6B7A9B", marginBottom: "20px" }}>
              Click any layer to see what it does and what to configure.
            </p>

            {/* Layer cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
              {LAYERS.map((layer, i) => (
                <div key={layer.id}
                  onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                  style={{
                    background: activeLayer === layer.id ? "rgba(255,255,255,0.04)" : "#0D1220",
                    border: `1px solid ${activeLayer === layer.id ? layer.color : "#1E2535"}`,
                    borderRadius: "10px",
                    padding: "16px 18px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{
                        width: "36px", height: "36px", borderRadius: "8px",
                        background: `${layer.color}18`,
                        border: `1px solid ${layer.color}40`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "18px",
                      }}>
                        {layer.icon}
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontWeight: 700, fontSize: "14px" }}>{layer.label}</span>
                          <span style={{
                            fontSize: "10px", color: layer.color,
                            background: `${layer.color}15`, padding: "2px 7px",
                            borderRadius: "4px", fontWeight: 600, letterSpacing: "0.5px"
                          }}>
                            LAYER {i + 1}
                          </span>
                        </div>
                        <div style={{ fontSize: "12px", color: "#6B7A9B", marginTop: "2px" }}>
                          {layer.description}
                        </div>
                      </div>
                    </div>
                    <div style={{ color: "#6B7A9B", fontSize: "18px" }}>
                      {activeLayer === layer.id ? "−" : "+"}
                    </div>
                  </div>

                  {activeLayer === layer.id && (
                    <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #1E2535" }}>
                      <div style={{ marginBottom: "12px" }}>
                        {layer.items.map((item, j) => (
                          <div key={j} style={{
                            display: "flex", alignItems: "flex-start", gap: "8px",
                            padding: "6px 0",
                            borderBottom: j < layer.items.length - 1 ? "1px solid #1A2030" : "none"
                          }}>
                            <div style={{
                              width: "6px", height: "6px", borderRadius: "50%",
                              background: layer.color, marginTop: "6px", flexShrink: 0
                            }} />
                            <span style={{ fontSize: "13px", color: "#C4CCDC", fontFamily: "monospace" }}>
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div style={{
                        background: `${layer.color}10`,
                        border: `1px solid ${layer.color}30`,
                        borderRadius: "6px",
                        padding: "10px 12px",
                        fontSize: "12px",
                        color: layer.color,
                        fontWeight: 500,
                      }}>
                        → {layer.cta}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Kill criteria quick ref */}
            <div style={{
              background: "rgba(255,68,68,0.06)",
              border: "1px solid rgba(255,68,68,0.25)",
              borderRadius: "10px",
              padding: "16px 18px",
            }}>
              <div style={{ fontWeight: 700, fontSize: "13px", color: "#FF6B6B", marginBottom: "10px" }}>
                🚨 KILL CRITERIA — Walk away if ANY of these trigger
              </div>
              {[
                "Insider selling > $10M in trailing 6 months",
                "Revenue restatement or material weakness",
                "Management guidance miss > 3 consecutive quarters",
                "Customer concentration > 40% in single customer",
                "Debt covenant violation risk within 12 months",
                "SEC comment letter unresolved > 6 months",
              ].map((k, i) => (
                <div key={i} style={{ fontSize: "12px", color: "#C4CCDC", padding: "4px 0", display: "flex", gap: "8px" }}>
                  <span style={{ color: "#FF6B6B" }}>✕</span> {k}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WORKFLOW TAB */}
        {activeTab === "workflow" && (
          <div>
            <p style={{ fontSize: "13px", color: "#6B7A9B", marginBottom: "20px" }}>
              The full diligence workflow from screen to position sizing.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {WORKFLOW.map((step, i) => (
                <div key={i} style={{
                  background: "#0D1220",
                  border: "1px solid #1E2535",
                  borderRadius: "10px",
                  padding: "16px 18px",
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}>
                  <div style={{
                    fontSize: "24px", fontWeight: 800, color: "#1E2535",
                    fontFamily: "monospace", minWidth: "36px", lineHeight: 1,
                    marginTop: "2px",
                  }}>
                    {step.step}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: "4px" }}>
                      {step.title}
                    </div>
                    <div style={{
                      fontFamily: "monospace", fontSize: "13px",
                      color: "#00D4AA",
                      background: "rgba(0,212,170,0.08)",
                      padding: "4px 10px",
                      borderRadius: "5px",
                      display: "inline-block",
                      marginBottom: "8px",
                    }}>
                      {step.cmd}
                    </div>
                    <div style={{ fontSize: "13px", color: "#8A96B0" }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* 5 agents diagram */}
            <div style={{ marginTop: "24px" }}>
              <div style={{ fontWeight: 700, fontSize: "13px", color: "#7B61FF", marginBottom: "12px", letterSpacing: "1px" }}>
                STEP 3 IN DETAIL — 5 PARALLEL SUB-AGENTS
              </div>
              <div style={{
                background: "#0D1220", border: "1px solid #7B61FF40",
                borderRadius: "10px", padding: "16px",
              }}>
                <div style={{
                  textAlign: "center", fontSize: "13px", color: "#7B61FF",
                  fontFamily: "monospace", marginBottom: "14px",
                  background: "rgba(123,97,255,0.1)", padding: "8px",
                  borderRadius: "6px",
                }}>
                  /diligence-checklist TICKER
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { n: "1", title: "Bull Case Agent", color: "#00D4AA", desc: "Upside multiples + catalysts → price target" },
                    { n: "2", title: "Bear Case Agent", color: "#FF6B6B", desc: "Kill criteria check + floor scenario" },
                    { n: "3", title: "Mgmt Credibility", color: "#FFD93D", desc: "12 quarters: guidance vs. actuals → score /10" },
                    { n: "4", title: "Filing Diff Agent", color: "#FF6B35", desc: "10-Q word diff + Form 4 insider transactions" },
                    { n: "5", title: "Revenue Quality", color: "#4ECDC4", desc: "Recurring mix, customer concentration, DSO" },
                  ].map((a) => (
                    <div key={a.n} style={{
                      display: "flex", gap: "10px", alignItems: "center",
                      padding: "8px 10px", background: `${a.color}08`,
                      border: `1px solid ${a.color}25`, borderRadius: "6px",
                    }}>
                      <div style={{
                        width: "22px", height: "22px", borderRadius: "50%",
                        background: `${a.color}20`, border: `1px solid ${a.color}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "11px", fontWeight: 700, color: a.color, flexShrink: 0
                      }}>
                        {a.n}
                      </div>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 600, color: a.color }}>{a.title}</div>
                        <div style={{ fontSize: "11px", color: "#6B7A9B" }}>{a.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{
                  marginTop: "12px", textAlign: "center",
                  fontSize: "12px", color: "#6B7A9B",
                  borderTop: "1px solid #1E2535", paddingTop: "12px",
                }}>
                  All 5 run in parallel → converge into formatted diligence memo
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SIZING TAB */}
        {activeTab === "sizing" && (
          <div>
            <p style={{ fontSize: "13px", color: "#6B7A9B", marginBottom: "20px" }}>
              Position sizing rules from CLAUDE.md. Conviction drives size.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
              {SIZING.map((s, i) => (
                <div key={i} style={{
                  background: "#0D1220",
                  border: `1px solid ${s.color}30`,
                  borderRadius: "10px",
                  padding: "16px 18px",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontWeight: 700, fontSize: "15px" }}>{s.level}</span>
                    <span style={{
                      fontSize: "20px", fontWeight: 800, color: s.color, fontFamily: "monospace"
                    }}>{s.size}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#6B7A9B" }}>{s.criteria}</div>
                </div>
              ))}
            </div>

            {/* Portfolio rules */}
            <div style={{
              background: "#0D1220",
              border: "1px solid #1E2535",
              borderRadius: "10px",
              padding: "16px 18px",
            }}>
              <div style={{ fontWeight: 700, fontSize: "13px", marginBottom: "12px", color: "#E8EDF5" }}>
                Portfolio-Level Rules
              </div>
              {[
                ["Max single position", "12%"],
                ["Max sector concentration", "35%"],
                ["Min positions (diversification)", "15"],
                ["Cash target (dry powder)", "5–15%"],
                ["Min risk/reward ratio", "2:1"],
                ["Mgmt credibility threshold", "≥ 6.0 / 10"],
              ].map(([label, val], i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: i < 5 ? "1px solid #141920" : "none",
                  fontSize: "13px",
                }}>
                  <span style={{ color: "#8A96B0" }}>{label}</span>
                  <span style={{ fontFamily: "monospace", fontWeight: 600, color: "#E8EDF5" }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Worktrees scenario */}
            <div style={{
              marginTop: "16px",
              background: "rgba(78,205,196,0.06)",
              border: "1px solid rgba(78,205,196,0.25)",
              borderRadius: "10px",
              padding: "16px 18px",
            }}>
              <div style={{ fontWeight: 700, fontSize: "13px", color: "#4ECDC4", marginBottom: "10px" }}>
                🌿 WORKTREE SCENARIO TEMPLATE
              </div>
              {[
                { label: "Bull", desc: "Expansion multiples + accelerating growth", weight: "25%", col: "#00D4AA" },
                { label: "Base", desc: "Consensus estimates + median multiples", weight: "55%", col: "#7B61FF" },
                { label: "Bear", desc: "Compression + deceleration", weight: "20%", col: "#FF6B6B" },
              ].map((s, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "8px 0",
                  borderBottom: i < 2 ? "1px solid #1E2535" : "none",
                }}>
                  <div>
                    <span style={{ fontWeight: 700, color: s.col, fontSize: "13px", marginRight: "8px" }}>{s.label}</span>
                    <span style={{ fontSize: "12px", color: "#6B7A9B" }}>{s.desc}</span>
                  </div>
                  <span style={{ fontFamily: "monospace", fontSize: "13px", color: s.col, fontWeight: 700 }}>{s.weight}</span>
                </div>
              ))}
              <div style={{ fontSize: "12px", color: "#4ECDC4", marginTop: "10px" }}>
                Probability-weighted target = (Bull × 25%) + (Base × 55%) + (Bear × 20%)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
