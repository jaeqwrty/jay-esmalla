import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Loader2, AlertCircle } from "lucide-react";
import { githubConfig } from "@/data/portfolio";

/* ── Config ──────────────────────────────────────────── */
const { profileUrl } = githubConfig;

const CURRENT_YEAR = new Date().getFullYear();

// Year tabs: "Last year" always first, then most-recent to oldest
const YEAR_TABS = [
  { key: "last", label: "Last year" },
  ...Array.from({ length: CURRENT_YEAR - 2023 }, (_, i) => {
    const y = CURRENT_YEAR - i;
    return { key: String(y), label: String(y) };
  }),
];

/* ── Types ───────────────────────────────────────────── */
type Day  = { date: string; count: number; color: string };
type Week = { days: Day[] };
type CalendarData = { total: number; weeks: Week[] };

/* ── Neon tile colours (5-step, matching GitHub's intensity scale) ──
   GitHub returns hex color for each day matching their green scale.
   We remap those to our site's pink→cyan neon palette.           */
const GH_TO_LEVEL: Record<string, number> = {
  // GitHub light-mode greens
  "#ebedf0": 0, "#9be9a8": 1, "#40c463": 2, "#30a14e": 3, "#216e39": 4,
  // GitHub dark-mode greens
  "#161b22": 0, "#0e4429": 1, "#006d32": 2, "#26a641": 3, "#39d353": 4,
};

// 5-level neon scale: void → dark violet → purple → magenta → neon pink
const NEON: { fill: string; stroke: string; glow?: string }[] = [
  { fill: "#0d0b18", stroke: "#1e1a38" },
  { fill: "#1a0845", stroke: "#3a1580" },
  { fill: "#5e0fa0", stroke: "#9b20d8" },
  { fill: "#b818c8", stroke: "#e030f0", glow: "0 0 6px #e030f060" },
  { fill: "#ff2ec4", stroke: "#ff2ec4", glow: "0 0 9px #ff2ec475, 0 0 18px #ff2ec435" },
];

const colorToLevel = (color: string, count: number): number => {
  if (count === 0) return 0;
  const mapped = GH_TO_LEVEL[color?.toLowerCase()];
  if (mapped !== undefined) return mapped;
  // Fallback: count-based thresholds
  if (count >= 20) return 4;
  if (count >= 10) return 3;
  if (count >= 4)  return 2;
  return 1;
};

/* ── Layout constants ────────────────────────────────── */
const CELL = 11;        // tile width & height (px)
const GAP  = 3;         // gap between tiles (px)
const STEP = CELL + GAP;// 14 px per column / row

/* ── Helpers ─────────────────────────────────────────── */
/** Day-of-week (0=Sun … 6=Sat) without UTC midnight timezone issues */
const dow = (dateStr: string): number => {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).getDay();
};

/* ── Jogruber fallback ───────────────────────────────────
   Used when /api/github-contributions is unreachable
   (e.g. local `npm run dev` without `vercel dev`).
   Returns public contributions only — numbers will be lower
   than the real total until the Vercel function is live.   */
const JOGRUBER_COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

const jogruberToCalendar = (raw: any, year: string): CalendarData => {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);

  let filtered: any[];
  let total: number;

  if (year === "last") {
    const cutoff = new Date(now);
    cutoff.setFullYear(cutoff.getFullYear() - 1);
    const cutoffStr = cutoff.toISOString().slice(0, 10);
    filtered = raw.contributions.filter((c: any) => c.date >= cutoffStr && c.date <= todayStr);
    total = filtered.reduce((s: number, c: any) => s + c.count, 0);
  } else {
    filtered = raw.contributions.filter(
      (c: any) => c.date.startsWith(year) && c.date <= todayStr
    );
    total = raw.total?.[year] ?? 0;
  }

  // Convert flat day list → week array
  const weeks: Week[] = [];
  let currentWeek: Day[] = [];

  filtered.forEach((c: any) => {
    if (getDow(c.date) === 0 && currentWeek.length > 0) {
      weeks.push({ days: currentWeek });
      currentWeek = [];
    }
    currentWeek.push({
      date:  c.date,
      count: c.count,
      color: JOGRUBER_COLORS[c.level] ?? JOGRUBER_COLORS[0],
    });
  });
  if (currentWeek.length > 0) weeks.push({ days: currentWeek });

  return { total, weeks };
};

// alias used inside jogruberToCalendar (defined above as `dow`)
const getDow = dow;

/**
 * Convert API week objects into padded 7-cell columns.
 * GitHub API guarantees weeks run Sun→Sat; only the first and last
 * week of a queried range may have fewer than 7 days.
 */
const buildColumns = (weeks: Week[]): (Day | null)[][] =>
  weeks.map((week, wi) => {
    const col: (Day | null)[] = [];
    if (!week.days.length) return Array(7).fill(null);

    // Pad start: only the first week can start mid-week
    if (wi === 0) {
      const firstDow = dow(week.days[0].date);
      for (let i = 0; i < firstDow; i++) col.push(null);
    }

    week.days.forEach(d => col.push(d));

    // Pad end: only the last week may be shorter than 7
    while (col.length < 7) col.push(null);

    return col;
  });

/** Month label positions: column index where a new month begins */
const monthLabels = (weeks: Week[]): { text: string; col: number }[] => {
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const out: { text: string; col: number }[] = [];
  let lastM = -1;
  weeks.forEach((week, col) => {
    if (!week.days.length) return;
    const m = new Date(week.days[0].date + "T12:00:00").getMonth();
    if (m !== lastM) { out.push({ text: MONTHS[m], col }); lastM = m; }
  });
  return out;
};

/* ── Single tile ─────────────────────────────────────── */
const Tile = ({ day }: { day: Day }) => {
  const level = colorToLevel(day.color, day.count);
  const cfg   = NEON[level];
  return (
    <div
      style={{
        width:      CELL,
        height:     CELL,
        background: cfg.fill,
        border:     `1px solid ${cfg.stroke}`,
        borderRadius: 2,
        boxShadow:  cfg.glow,
        flexShrink: 0,
        transition: "transform 0.1s ease",
      }}
      className="hover:scale-[1.3] cursor-default"
      title={`${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date}`}
    />
  );
};

const EmptyTile = () => (
  <div style={{ width: CELL, height: CELL, flexShrink: 0 }} />
);

/* ── Motion variant ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Main Section ────────────────────────────────────── */
const GitHubSection = () => {
  const [activeTab,   setActiveTab]   = useState("last");
  const [data,        setData]        = useState<CalendarData | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState<string | null>(null);
  const [isFallback,  setIsFallback]  = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);
    setIsFallback(false);

    const qs  = activeTab !== "last" ? `?year=${activeTab}` : "";
    const username = "jaeqwrty";

    // ── Stage 1: secure Vercel serverless function (includes private contributions)
    const tryVercel = (): Promise<CalendarData> =>
      fetch(`/api/github-contributions${qs}`)
        .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
        .then(j => { if (j.error) throw new Error(j.error); return j as CalendarData; });

    // ── Stage 2: jogruber public API (public contributions only — fallback)
    const tryJogruber = (): Promise<CalendarData> =>
      fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
        .then(r => { if (!r.ok) throw new Error(`Jogruber HTTP ${r.status}`); return r.json(); })
        .then(raw => jogruberToCalendar(raw, activeTab));

    tryVercel()
      .then(d => { setData(d); setIsFallback(false); })
      .catch(() =>
        // Vercel function unreachable — use public fallback silently
        tryJogruber()
          .then(d => { setData(d); setIsFallback(true); })
          .catch(e => setError(e.message))
      )
      .finally(() => setLoading(false));
  }, [activeTab]);

  const columns = useMemo(() => data ? buildColumns(data.weeks)  : [], [data]);
  const labels  = useMemo(() => data ? monthLabels(data.weeks)   : [], [data]);

  // Grid height: 7 rows × STEP − last gap
  const gridH = 7 * STEP - GAP; // 95 px

  return (
    <section id="github" className="py-20 px-4 relative">

      {/* ── Section header ── */}
      <motion.div
        variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="font-mono-retro text-secondary text-sm tracking-widest mb-3">
          {"> git log --contributions_"}
        </p>
        <h2 className="font-display text-3xl md:text-4xl neon-text-pink-bold mb-4">
          GITHUB.LOG
        </h2>
        <div className="mt-4 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-secondary to-transparent" />
      </motion.div>

      <div className="max-w-5xl mx-auto space-y-6">

        {/* ── Heatmap card ── */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="rounded-sm border border-secondary/20 bg-[#0a0a12]/90 backdrop-blur-sm p-5 md:p-6"
          style={{ boxShadow: "0 0 0 1px hsl(186 100% 50% / 0.12), 0 0 32px hsl(186 100% 50% / 0.06)" }}
        >
          {/* ── Top row: total count + year tabs ── */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

            {/* Contribution count headline */}
            <div className="font-mono-retro min-h-[24px]">
              {loading && (
                <span className="text-muted-foreground/40 text-xs tracking-wider">
                  Loading…
                </span>
              )}
              {!loading && error && (
                <span className="text-red-400/60 text-xs">
                  Unable to load contributions
                </span>
              )}
              {!loading && !error && data && (
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span
                    className="font-display text-base"
                    style={{ color: "hsl(186 100% 55%)", textShadow: "0 0 12px hsl(186 100% 50% / 0.5)" }}
                  >
                    {data.total.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground/55 text-xs tracking-wider">
                    {activeTab === "last"
                      ? "contributions in the last year"
                      : `contributions in ${activeTab}`}
                  </span>
                </div>
              )}
            </div>

            {/* Year selector tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {YEAR_TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`font-mono-retro text-[10px] tracking-widest px-2.5 py-1 rounded-sm border
                              transition-all duration-200 ${
                    activeTab === tab.key
                      ? "border-secondary text-secondary bg-secondary/10 shadow-[0_0_8px_hsl(186_100%_50%/0.25)]"
                      : "border-border/35 text-muted-foreground/45 hover:border-border/70 hover:text-muted-foreground/70"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Graph body ── */}
          {loading && (
            <div className="flex h-32 items-center justify-center gap-3 text-muted-foreground/40">
              <Loader2 size={16} className="animate-spin text-secondary" />
              <span className="font-mono-retro text-xs tracking-wider">QUERYING GITHUB API…</span>
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col h-32 items-center justify-center gap-3">
              <div className="flex items-center gap-2 text-red-400/50">
                <AlertCircle size={14} />
                <span className="font-mono-retro text-xs">{error}</span>
              </div>
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-retro text-xs text-secondary/70 hover:text-secondary flex items-center gap-1.5
                           underline underline-offset-4 transition-colors"
              >
                <ExternalLink size={11} />
                View live contributions on GitHub →
              </a>
            </div>
          )}

          {!loading && !error && data && (
            /* Horizontally scrollable, no visible scrollbar */
            <div className="overflow-x-auto no-scrollbar">
              {/*
                Layout (pixel coordinates):
                  paddingLeft 32px  → room for Mon/Wed/Fri labels
                  paddingTop  20px  → room for month labels
                  minWidth computed from number of week columns
              */}
              <div
                className="relative select-none"
                style={{
                  paddingLeft: 32,
                  paddingTop:  20,
                  paddingBottom: 4,
                  minWidth: columns.length * STEP + 32,
                }}
              >

                {/* Month labels row (above grid) */}
                <div className="absolute top-0 left-8 right-0 pointer-events-none">
                  {labels.map((lbl, i) => (
                    <span
                      key={i}
                      className="absolute font-mono-retro text-[10px] text-muted-foreground/45"
                      style={{ left: lbl.col * STEP }}
                    >
                      {lbl.text}
                    </span>
                  ))}
                </div>

                {/* Day-of-week labels — Mon, Wed, Fri only (matching GitHub) */}
                <div
                  className="absolute left-0 pointer-events-none"
                  style={{ top: 20, width: 28, height: gridH }}
                >
                  {[
                    { label: "Mon", row: 1 },
                    { label: "Wed", row: 3 },
                    { label: "Fri", row: 5 },
                  ].map(({ label, row }) => (
                    <span
                      key={label}
                      className="absolute font-mono-retro text-[9px] text-muted-foreground/35 leading-none"
                      style={{ top: row * STEP + Math.floor((CELL - 9) / 2) }}
                    >
                      {label}
                    </span>
                  ))}
                </div>

                {/* Week columns — ONE continuous grid */}
                <div className="flex" style={{ gap: GAP }}>
                  {columns.map((col, wi) => (
                    <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
                      {col.map((day, di) =>
                        day
                          ? <Tile      key={di} day={day} />
                          : <EmptyTile key={di} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Bottom row: legend (Less … More) */}
                <div className="flex items-center justify-end gap-1.5 mt-3">
                  <span className="font-mono-retro text-[9px] text-muted-foreground/35 mr-0.5">Less</span>
                  {NEON.map((cfg, i) => (
                    <div
                      key={i}
                      style={{
                        width:        CELL,
                        height:       CELL,
                        background:   cfg.fill,
                        border:       `1px solid ${cfg.stroke}`,
                        borderRadius: 2,
                        boxShadow:    cfg.glow,
                      }}
                    />
                  ))}
                  <span className="font-mono-retro text-[9px] text-muted-foreground/35 ml-0.5">More</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Profile CTA ── */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="flex justify-center pt-2"
        >
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-button text-xs flex items-center gap-2"
          >
            <ExternalLink size={12} />
            VIEW GITHUB PROFILE
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default GitHubSection;
