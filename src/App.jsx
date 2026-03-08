import { useState, useCallback } from "react";

const G = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Manrope:wght@300;400;600;800&display=swap');`;

const css = `
${G}
*{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#08090d;--surface:#0e0f18;--card:#12131e;--border:#ffffff0d;
  --accent:#c8ff00;--accent2:#ff4d00;--accent3:#00d4ff;
  --green:#00ff88;--red:#ff3355;--text:#efefef;--muted:#666;--dim:#2a2a3a;
  --font-display:'Bebas Neue',sans-serif;--font-mono:'DM Mono',monospace;--font-body:'Manrope',sans-serif;
}
body{background:var(--bg);color:var(--text);font-family:var(--font-body);min-height:100vh;}
.bg-grid{position:fixed;inset:0;background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;z-index:0;}
.bg-blob{position:fixed;top:-200px;left:50%;transform:translateX(-50%);width:700px;height:400px;background:radial-gradient(ellipse,#c8ff0008 0%,transparent 65%);pointer-events:none;z-index:0;}
.app{position:relative;z-index:1;max-width:920px;margin:0 auto;padding:40px 20px 100px;}
.hdr{text-align:center;margin-bottom:48px;}
.eyebrow{font-family:var(--font-mono);font-size:10px;letter-spacing:5px;color:var(--accent);margin-bottom:14px;opacity:0.8;}
.title{font-family:var(--font-display);font-size:clamp(48px,8vw,88px);line-height:0.9;letter-spacing:3px;}
.title em{color:var(--accent);font-style:normal;}
.subtitle{font-size:13px;color:var(--muted);margin-top:16px;line-height:1.7;font-weight:300;}
.powered{display:inline-block;margin-top:10px;font-family:var(--font-mono);font-size:9px;letter-spacing:3px;color:var(--dim);border:1px solid var(--dim);padding:3px 10px;}
.input-stack{display:flex;flex-direction:column;gap:8px;margin-bottom:8px;}
.search-box{display:flex;border:1px solid var(--border);background:var(--card);overflow:hidden;transition:border-color 0.2s,box-shadow 0.2s;}
.search-box:focus-within{border-color:var(--accent);box-shadow:0 0 0 3px #c8ff0010;}
.search-input{flex:1;background:transparent;border:none;color:var(--text);font-family:var(--font-mono);font-size:12px;padding:14px 18px;outline:none;letter-spacing:1px;}
.search-input::placeholder{color:var(--dim);}
.search-btn{background:var(--accent);color:var(--bg);font-family:var(--font-display);font-size:18px;letter-spacing:3px;padding:0 28px;border:none;cursor:pointer;transition:all 0.15s;white-space:nowrap;}
.search-btn:hover{background:#d8ff1a;}
.search-btn:disabled{background:var(--dim);color:#555;cursor:not-allowed;}
.hint{font-family:var(--font-mono);font-size:10px;color:var(--dim);letter-spacing:1px;margin-bottom:32px;line-height:1.8;}
.hint a{color:var(--accent);text-decoration:none;}
.loading-card{background:var(--card);border:1px solid var(--border);padding:48px;text-align:center;margin:20px 0;}
.load-icon{font-size:48px;animation:spin 2s linear infinite;display:inline-block;margin-bottom:16px;}
@keyframes spin{to{transform:rotate(360deg);}}
.load-title{font-family:var(--font-display);font-size:28px;letter-spacing:3px;color:var(--accent);}
.load-sub{font-family:var(--font-mono);font-size:11px;color:var(--muted);margin-top:8px;letter-spacing:2px;animation:blink 1s step-end infinite;}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:0.3;}}
.progress-bar{height:2px;background:var(--dim);margin-top:20px;overflow:hidden;}
.progress-fill{height:100%;background:linear-gradient(90deg,var(--accent),var(--accent3));transition:width 0.4s ease;}
.wallet-header{background:var(--card);border:1px solid var(--border);padding:20px 24px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
.wallet-addr{font-family:var(--font-mono);font-size:11px;color:var(--accent);cursor:pointer;word-break:break-all;}
.wallet-bal{font-family:var(--font-display);font-size:26px;}
.wallet-bal span{font-size:13px;color:var(--muted);font-family:var(--font-mono);}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);margin-bottom:16px;}
.stat-cell{background:var(--card);padding:18px 16px;text-align:center;}
.stat-label{font-family:var(--font-mono);font-size:9px;letter-spacing:2px;color:var(--muted);text-transform:uppercase;}
.stat-val{font-family:var(--font-display);font-size:26px;margin-top:6px;}
.stat-val.green{color:var(--green);}
.stat-val.red{color:var(--red);}
.stat-val.accent{color:var(--accent);}
.stat-val.blue{color:var(--accent3);}
.stat-sub{font-family:var(--font-mono);font-size:9px;color:var(--muted);margin-top:3px;}
.winrate-wrap{display:flex;align-items:center;gap:24px;background:var(--card);border:1px solid var(--border);padding:20px 24px;margin-bottom:16px;}
.ring-wrap{position:relative;width:80px;height:80px;flex-shrink:0;}
.ring-wrap svg{transform:rotate(-90deg);}
.ring-center{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:20px;color:var(--accent);}
.winrate-info{flex:1;}
.winrate-title{font-family:var(--font-display);font-size:22px;letter-spacing:2px;}
.winrate-sub{font-family:var(--font-mono);font-size:11px;color:var(--muted);margin-top:6px;line-height:1.7;}
.section-hdr{display:flex;align-items:center;justify-content:space-between;margin:24px 0 12px;}
.section-title{font-family:var(--font-display);font-size:20px;letter-spacing:2px;color:var(--accent);}
.section-count{font-family:var(--font-mono);font-size:10px;color:var(--muted);letter-spacing:2px;}
.bw-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;}
.bw-card{background:var(--card);border:1px solid var(--border);padding:18px;}
.bw-label{font-family:var(--font-mono);font-size:9px;letter-spacing:3px;color:var(--muted);}
.bw-token{font-family:var(--font-display);font-size:24px;letter-spacing:2px;margin-top:6px;}
.bw-pnl{font-family:var(--font-display);font-size:20px;margin-top:4px;}
.bw-detail{font-family:var(--font-mono);font-size:10px;color:var(--muted);margin-top:6px;line-height:1.6;}
.tokens-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:20px;}
.token-card{background:var(--card);border:1px solid var(--border);padding:14px;transition:border-color 0.15s;}
.token-card:hover{border-color:#c8ff0030;}
.token-symbol{font-family:var(--font-display);font-size:18px;letter-spacing:1px;}
.token-sub{font-family:var(--font-mono);font-size:9px;color:var(--muted);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.token-trades{font-family:var(--font-mono);font-size:10px;color:var(--muted);margin-top:4px;}
.token-pnl{font-family:var(--font-display);font-size:16px;margin-top:6px;}
.token-bar{height:2px;background:var(--dim);margin-top:8px;overflow:hidden;}
.token-bar-fill{height:100%;transition:width 0.5s ease;}
.tx-table{background:var(--card);border:1px solid var(--border);overflow:hidden;margin-bottom:20px;}
.tx-row{display:grid;grid-template-columns:80px 130px 1fr 110px 80px;gap:0;border-bottom:1px solid var(--border);padding:10px 16px;align-items:center;transition:background 0.1s;}
.tx-row:last-child{border-bottom:none;}
.tx-row:hover{background:#ffffff03;}
.tx-row.hd{background:var(--surface);padding:8px 16px;}
.tx-cell{font-family:var(--font-mono);font-size:11px;color:var(--muted);}
.tx-cell.lbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;}
.tx-cell.buy{color:var(--green);}
.tx-cell.sell{color:var(--red);}
.tx-cell.swap{color:var(--accent);}
.tx-cell.tn{color:var(--text);font-size:12px;}
.tx-cell.desc{color:var(--text);font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.tx-cell.pos{color:var(--green);}
.tx-cell.neg{color:var(--red);}
.tx-link{color:var(--accent3);text-decoration:none;font-family:var(--font-mono);font-size:11px;}
.tx-link:hover{text-decoration:underline;}
.err{background:#ff335515;border:1px solid #ff335530;padding:16px 20px;font-family:var(--font-mono);font-size:12px;color:var(--red);margin:16px 0;line-height:1.6;}
.toast{position:fixed;bottom:28px;right:28px;background:var(--accent);color:var(--bg);padding:12px 22px;font-family:var(--font-display);font-size:14px;letter-spacing:3px;z-index:9999;animation:tUp 2.2s forwards;}
@keyframes tUp{0%{opacity:0;transform:translateY(8px);}15%{opacity:1;transform:translateY(0);}80%{opacity:1;}100%{opacity:0;transform:translateY(-10px);}}
.empty{text-align:center;padding:40px;font-family:var(--font-mono);font-size:11px;color:var(--dim);letter-spacing:2px;}
.reset-btn{background:transparent;border:1px solid var(--border);color:var(--muted);font-family:var(--font-mono);font-size:11px;letter-spacing:2px;padding:10px 24px;cursor:pointer;transition:all 0.15s;margin:32px auto 0;display:block;}
.reset-btn:hover{border-color:var(--text);color:var(--text);}
@media(max-width:640px){
  .stats-grid,.tokens-grid{grid-template-columns:1fr 1fr;}
  .bw-grid{grid-template-columns:1fr;}
  .tx-row{grid-template-columns:70px 110px 1fr 80px;}
  .tx-row>*:last-child{display:none;}
}
`;

function sh(a){ return a?a.slice(0,4)+"..."+a.slice(-4):""; }
function shH(h){ return h?h.slice(0,6)+"..."+h.slice(-4):""; }
function l2s(l){ return (l/1e9).toFixed(4); }
function ago(ts){
  const d=Date.now()/1000-ts;
  if(d<60) return `${Math.floor(d)}s ago`;
  if(d<3600) return `${Math.floor(d/60)}m ago`;
  if(d<86400) return `${Math.floor(d/3600)}h ago`;
  return `${Math.floor(d/86400)}d ago`;
}

const SOL_MINT = "So11111111111111111111111111111111111111112";

async function helius(path, apiKey, opts={}) {
  const base = `https://api-mainnet.helius-rpc.com`;
  const res = await fetch(`${base}${path}?api-key=${apiKey}`, opts);
  if (!res.ok) throw new Error(`Helius ${res.status}: ${await res.text()}`);
  return res.json();
}

async function rpc(method, params, apiKey) {
  const res = await fetch(`https://mainnet.helius-rpc.com/?api-key=${apiKey}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  const d = await res.json();
  if (d.error) throw new Error(d.error.message);
  return d.result;
}

// Cache to avoid repeated lookups for same mint
const tokenCache = {};

async function getTokenName(mint, apiKey) {
  if (tokenCache[mint]) return tokenCache[mint];

  // Race Jupiter and Helius simultaneously — fastest response wins
  const results = await Promise.allSettled([
    // 1. Jupiter — best for memecoins, fast single-token endpoint
    fetch(`https://tokens.jup.ag/token/${mint}`, { signal: AbortSignal.timeout(3000) })
      .then(r => r.ok ? r.json() : null)
      .then(d => d?.symbol ? d.symbol.toUpperCase() : null),

    // 2. Helius DAS — reliable fallback
    rpc("getAsset", [{ id: mint }], apiKey)
      .then(d => {
        const sym = d?.token_info?.symbol || d?.content?.metadata?.symbol || null;
        const name = d?.content?.metadata?.name || null;
        if (sym) return sym.toUpperCase();
        if (name && name.length <= 12 && !name.includes(" ")) return name.toUpperCase();
        return null;
      }),
  ]);

  for (const r of results) {
    if (r.status === "fulfilled" && r.value) {
      tokenCache[mint] = r.value;
      return tokenCache[mint];
    }
  }

  return null;
}

export default function PnLTracker() {
  const [wallet, setWallet] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadStep, setLoadStep] = useState("");
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(""), 2200); };
  const copy = (t) => { navigator.clipboard?.writeText(t); showToast("COPIED"); };

  const analyze = useCallback(async () => {
    const addr = wallet.trim();
    const key = apiKey.trim();
    if (!addr || addr.length < 32) { setError("Enter a valid Solana wallet address."); return; }
    if (!key) { setError("Enter your Helius API key — get one free at helius.dev"); return; }
    setError(""); setLoading(true); setData(null); setProgress(10);

    try {
      // SOL balance
      setLoadStep("Fetching SOL balance..."); setProgress(15);
      const balRes = await rpc("getBalance", [addr], key);
      const solBalance = l2s(balRes.value || 0);

      // All recent transactions (parsed by Helius)
      setLoadStep("Fetching parsed transactions..."); setProgress(30);
      const txs = await helius(`/v0/addresses/${addr}/transactions`, key, { headers: { "Content-Type": "application/json" } });

      setLoadStep("Analysing trades..."); setProgress(55);

      const tokenMap = {};
      const processed = [];
      let wins = 0, losses = 0, totalPnl = 0;

      txs.forEach(tx => {
        if (!tx || tx.transactionError) return;

        // Net SOL change for this wallet
        const accs = tx.accountData || [];
        const mine = accs.find(a => a.account === addr);
        const solChange = mine ? (mine.nativeBalanceChange || 0) / 1e9 : 0;

        // Determine primary token
        let mint = null;
        let txType = tx.type || "UNKNOWN";

        const swp = tx.events?.swap;
        if (swp) {
          // It's a swap — figure out which token we got or spent
          const inputs = swp.tokenInputs || [];
          const outputs = swp.tokenOutputs || [];
          if (solChange < 0 && outputs.length > 0) {
            // Spent SOL, got token = BUY
            mint = outputs[0].mint;
            txType = "BUY";
          } else if (solChange > 0 && inputs.length > 0) {
            // Sold token, got SOL = SELL
            mint = inputs[0].mint;
            txType = "SELL";
          } else {
            // Token for token swap
            mint = outputs[0]?.mint || inputs[0]?.mint || null;
            txType = "SWAP";
          }
        } else {
          // Non-swap: look at token transfers
          const tt = tx.tokenTransfers || [];
          tt.forEach(t => {
            if (t.fromUserAccount === addr && t.mint !== SOL_MINT) { mint = t.mint; txType = "SELL"; }
            else if (t.toUserAccount === addr && t.mint !== SOL_MINT) { mint = t.mint; txType = "BUY"; }
          });
        }

        const displayMint = mint || "SOL";
        if (displayMint !== SOL_MINT) {
          if (!tokenMap[displayMint]) tokenMap[displayMint] = { trades: 0, buys: 0, sells: 0, solPnl: 0, mint: displayMint, symbol: null };
          tokenMap[displayMint].trades++;
          tokenMap[displayMint].solPnl += solChange;
          if (txType === "BUY") tokenMap[displayMint].buys++;
          if (txType === "SELL") tokenMap[displayMint].sells++;
        }

        if (solChange > 0.001) wins++;
        else if (solChange < -0.001) losses++;
        totalPnl += solChange;

        processed.push({
          sig: tx.signature,
          type: txType,
          token: mint ? sh(mint) : "SOL",
          tokenMint: mint,
          solChange: solChange.toFixed(4),
          description: (tx.description || "").slice(0, 75),
          blockTime: tx.timestamp,
        });
      });

      // Fetch token names for top tokens
      setLoadStep("Loading token names..."); setProgress(75);
      const topTokens = Object.values(tokenMap)
        .sort((a, b) => b.trades - a.trades)
        .slice(0, 12);

      await Promise.allSettled(
        topTokens.map(async t => {
          if (!t.mint || t.mint.length < 30) return;
          const sym = await getTokenName(t.mint, key);
          if (sym) t.symbol = sym;
        })
      );

      const winRate = (wins + losses) > 0 ? Math.round((wins / (wins + losses)) * 100) : 0;
      const best = topTokens.length > 0 ? topTokens.reduce((a, b) => b.solPnl > a.solPnl ? b : a) : null;
      const worst = topTokens.length > 0 ? topTokens.reduce((a, b) => b.solPnl < a.solPnl ? b : a) : null;

      setProgress(100);
      setData({
        solBalance,
        processed: processed.slice(0, 20),
        tokens: topTokens,
        best, worst,
        stats: { wins, losses, winRate, totalPnl: totalPnl.toFixed(4), total: processed.length },
      });

    } catch (e) {
      setError(`Error: ${e.message}. Check your Helius API key and wallet address.`);
    }
    setLoading(false);
  }, [wallet, apiKey]);

  const wr = data?.stats?.winRate || 0;
  const circ = 2 * Math.PI * 32;
  const sd = (wr / 100) * circ;

  return (
    <>
      <style>{css}</style>
      {toast && <div className="toast">{toast}</div>}
      <div className="bg-grid" /><div className="bg-blob" />
      <div className="app">

        <div className="hdr">
          <div className="eyebrow">Only1 · Solana Intelligence</div>
          <div className="title">WALLET<br /><em>PNL</em></div>
          <div className="subtitle">Real memecoin trades, real token names, real PnL. Powered by Helius.</div>
          <div className="powered">HELIUS ENHANCED TX API · 100K FREE/MONTH</div>
        </div>

        <div className="input-stack">
          <div className="search-box">
            <input className="search-input" placeholder="Helius API key — get free at helius.dev"
              value={apiKey} onChange={e => setApiKey(e.target.value)} />
          </div>
          <div className="search-box">
            <input className="search-input" placeholder="Solana wallet address..."
              value={wallet} onChange={e => setWallet(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !loading && analyze()} />
            <button className="search-btn" onClick={analyze} disabled={loading}>
              {loading ? "..." : "SCAN →"}
            </button>
          </div>
        </div>
        <div className="hint">
          Get your free Helius key at <a href="https://helius.dev" target="_blank" rel="noopener noreferrer">helius.dev</a> — sign up free, no credit card · 100K credits/month
        </div>

        {error && <div className="err">⚠ {error}</div>}

        {loading && (
          <div className="loading-card">
            <div className="load-icon">⚡</div>
            <div className="load-title">SCANNING WALLET</div>
            <div className="load-sub">{loadStep}</div>
            <div className="progress-bar"><div className="progress-fill" style={{ width: progress + "%" }} /></div>
          </div>
        )}

        {data && !loading && (
          <>
            <div className="wallet-header">
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 3, color: "var(--muted)", marginBottom: 4 }}>WALLET</div>
                <div className="wallet-addr" onClick={() => copy(wallet)} title="Click to copy">{wallet} ↗</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: 3, color: "var(--muted)", marginBottom: 4 }}>SOL BALANCE</div>
                <div className="wallet-bal">{data.solBalance} <span>SOL</span></div>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-cell">
                <div className="stat-label">Total PnL</div>
                <div className={`stat-val ${parseFloat(data.stats.totalPnl) >= 0 ? "green" : "red"}`}>
                  {parseFloat(data.stats.totalPnl) >= 0 ? "+" : ""}{data.stats.totalPnl}
                </div>
                <div className="stat-sub">SOL</div>
              </div>
              <div className="stat-cell">
                <div className="stat-label">Win Rate</div>
                <div className={`stat-val ${wr >= 50 ? "green" : "red"}`}>{wr}<span style={{ fontSize: 14 }}>%</span></div>
                <div className="stat-sub">{data.stats.wins}W / {data.stats.losses}L</div>
              </div>
              <div className="stat-cell">
                <div className="stat-label">Txs Scanned</div>
                <div className="stat-val accent">{data.stats.total}</div>
                <div className="stat-sub">recent</div>
              </div>
              <div className="stat-cell">
                <div className="stat-label">Tokens</div>
                <div className="stat-val blue">{data.tokens.length}</div>
                <div className="stat-sub">unique</div>
              </div>
            </div>

            <div className="winrate-wrap">
              <div className="ring-wrap">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="var(--dim)" strokeWidth="6" />
                  <circle cx="40" cy="40" r="32" fill="none"
                    stroke={wr >= 50 ? "var(--green)" : "var(--red)"}
                    strokeWidth="6" strokeDasharray={`${sd} ${circ}`} strokeLinecap="round" />
                </svg>
                <div className="ring-center">{wr}%</div>
              </div>
              <div className="winrate-info">
                <div className="winrate-title">
                  {wr >= 60 ? "DEGEN ELITE 🔥" : wr >= 40 ? "AVERAGE TRADER" : "NGMI 💀"}
                </div>
                <div className="winrate-sub">
                  {data.stats.wins} profitable txs · {data.stats.losses} losing txs<br />
                  Based on {data.stats.total} most recent on-chain transactions
                </div>
              </div>
            </div>

            {data.best && data.worst && (
              <>
                <div className="section-hdr"><div className="section-title">BEST & WORST TOKEN</div></div>
                <div className="bw-grid">
                  <div className="bw-card" style={{ borderColor: "#00ff8820" }}>
                    <div className="bw-label">🏆 BEST TRADE</div>
                    <div className="bw-token" style={{ color: "var(--green)" }}>{data.best.symbol || sh(data.best.mint)}</div>
                    <div className="bw-pnl" style={{ color: "var(--green)" }}>
                      {data.best.solPnl >= 0 ? "+" : ""}{data.best.solPnl.toFixed(4)} SOL
                    </div>
                    <div className="bw-detail">{data.best.trades} trades · {data.best.buys} buys · {data.best.sells} sells</div>
                  </div>
                  <div className="bw-card" style={{ borderColor: "#ff335520" }}>
                    <div className="bw-label">💀 WORST TRADE</div>
                    <div className="bw-token" style={{ color: "var(--red)" }}>{data.worst.symbol || sh(data.worst.mint)}</div>
                    <div className="bw-pnl" style={{ color: "var(--red)" }}>
                      {data.worst.solPnl >= 0 ? "+" : ""}{data.worst.solPnl.toFixed(4)} SOL
                    </div>
                    <div className="bw-detail">{data.worst.trades} trades · {data.worst.buys} buys · {data.worst.sells} sells</div>
                  </div>
                </div>
              </>
            )}

            {data.tokens.length > 0 && (
              <>
                <div className="section-hdr">
                  <div className="section-title">MOST TRADED TOKENS</div>
                  <div className="section-count">{data.tokens.length} TOKENS</div>
                </div>
                <div className="tokens-grid">
                  {data.tokens.map((t, i) => {
                    const max = data.tokens[0].trades;
                    const pct = Math.round((t.trades / max) * 100);
                    const pos = t.solPnl >= 0;
                    return (
                      <div className="token-card" key={i}>
                        <div className="token-symbol">{t.symbol || sh(t.mint)}</div>
                        {t.symbol && <div className="token-sub">{sh(t.mint)}</div>}
                        <div className="token-trades">{t.trades} trades · {t.buys}B {t.sells}S</div>
                        <div className="token-pnl" style={{ color: pos ? "var(--green)" : "var(--red)" }}>
                          {pos ? "+" : ""}{t.solPnl.toFixed(4)} SOL
                        </div>
                        <div className="token-bar">
                          <div className="token-bar-fill" style={{ width: pct + "%", background: pos ? "var(--green)" : "var(--red)" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {data.processed.length > 0 && (
              <>
                <div className="section-hdr">
                  <div className="section-title">RECENT TRANSACTIONS</div>
                  <div className="section-count">{data.processed.length} SHOWN</div>
                </div>
                <div className="tx-table">
                  <div className="tx-row hd">
                    <div className="tx-cell lbl">Type</div>
                    <div className="tx-cell lbl">Token</div>
                    <div className="tx-cell lbl">Description</div>
                    <div className="tx-cell lbl">SOL Change</div>
                    <div className="tx-cell lbl">Hash</div>
                  </div>
                  {data.processed.map((tx, i) => (
                    <div className="tx-row" key={i}>
                      <div className={`tx-cell ${tx.type === "BUY" ? "buy" : tx.type === "SELL" ? "sell" : "swap"}`}>{tx.type}</div>
                      <div className="tx-cell tn">{tx.token}</div>
                      <div className="tx-cell desc">{tx.description}</div>
                      <div className={`tx-cell ${parseFloat(tx.solChange) >= 0 ? "pos" : "neg"}`}>
                        {parseFloat(tx.solChange) >= 0 ? "+" : ""}{tx.solChange}
                      </div>
                      <a className="tx-link" href={`https://solscan.io/tx/${tx.sig}`} target="_blank" rel="noopener noreferrer">
                        {shH(tx.sig)}
                      </a>
                    </div>
                  ))}
                </div>
              </>
            )}

            {data.processed.length === 0 && <div className="empty">NO TRANSACTIONS FOUND FOR THIS WALLET</div>}

            <button className="reset-btn" onClick={() => { setData(null); setWallet(""); }}>SCAN ANOTHER WALLET</button>
          </>
        )}
      </div>
    </>
  );
}
