import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ─── boot script ─────────────────────────────────── */
const BOOT_STEPS: { text: string; delay: number }[] = [
  { text: "INITIALIZING SYSTEM BOOT",        delay: 140 },
  { text: "SECURING PORTFOLIO ENVIRONMENT",   delay: 120 },
  { text: "LOADING PORTFOLIO.EXE (v3.2.0)",  delay: 120 },
  { text: "DECRYPTING CYBERPUNK PALETTE",     delay: 100 },
  { text: "LOADING ASSETS & REPOSITORIES",    delay: 90 },
];

const CHAR_SPEED = 12; // ms per character (faster typewriter)

/* ─── component ───────────────────────────────────── */
const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const isBooted = sessionStorage.getItem("portfolio_booted");

  // ── skip entirely if already seen this session ──
  const [skip] = useState(() => !!isBooted);
  useEffect(() => { if (skip) { onComplete(); } }, [skip, onComplete]);
  if (skip) return null;

  return <BootScreen onComplete={onComplete} />;
};

/* ─── inner screen (only mounts when not skipped) ─── */
type LineState = { full: string; shown: string; status: "typing" | "ok" | "pending" };

const BootScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines]           = useState<LineState[]>([]);
  const [progress, setProgress]     = useState(0);
  const [accessGranted, setAccessGranted] = useState(false);
  const stepRef = useRef(0);

  /* animate one character at a time for the current line */
  useEffect(() => {
    const total = BOOT_STEPS.length;
    let charTimer: ReturnType<typeof setTimeout>;
    let stepTimer: ReturnType<typeof setTimeout>;

    const typeNextLine = () => {
      const idx = stepRef.current;
      if (idx >= total) return;

      const { text, delay } = BOOT_STEPS[idx];
      // add blank pending line
      setLines(prev => [...prev, { full: text, shown: "", status: "typing" }]);

      let char = 0;
      const typeChar = () => {
        char++;
        setLines(prev =>
          prev.map((l, i) =>
            i === idx ? { ...l, shown: text.slice(0, char) } : l
          )
        );
        if (char < text.length) {
          charTimer = setTimeout(typeChar, CHAR_SPEED);
        } else {
          // mark as OK, update progress, schedule next line
          setLines(prev =>
            prev.map((l, i) => i === idx ? { ...l, status: "ok" } : l)
          );
          setProgress(Math.round(((idx + 1) / total) * 100));
          stepRef.current++;
          if (stepRef.current < total) {
            stepTimer = setTimeout(typeNextLine, delay);
          } else {
            // all done → show ACCESS GRANTED then exit
            stepTimer = setTimeout(() => {
              setAccessGranted(true);
              setTimeout(() => {
                sessionStorage.setItem("portfolio_booted", "true");
                window.scrollTo(0, 0);
                onComplete();
              }, 700); // reduced from 1200ms
            }, 180); // reduced from 350ms
          }
        }
      };
      charTimer = setTimeout(typeChar, CHAR_SPEED);
    };

    stepTimer = setTimeout(typeNextLine, 150);
    return () => { clearTimeout(charTimer); clearTimeout(stepTimer); };
  }, [onComplete]);

  return (
    <motion.div
      /* CRT-shutdown exit: squash to horizontal line → vanish with flash */
      exit={{
        scaleY: [1, 1, 0.008, 0.008, 0],
        scaleX: [1, 1, 1,     0.04,  0],
        filter: [
          "brightness(1) blur(0px)",
          "brightness(1) blur(0px)",
          "brightness(3) blur(1px)",
          "brightness(6) blur(2px)",
          "brightness(0) blur(0px)",
        ],
      }}
      transition={{ duration: 0.45, times: [0, 0.35, 0.60, 0.85, 1], ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#040408] flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ transformOrigin: "center center" }}
    >
      {/* scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.18) 2px,rgba(0,0,0,0.18) 4px)",
        }}
      />

      {/* ambient neon glow behind card */}
      <div className="absolute w-[480px] h-[320px] rounded-full opacity-20 blur-[80px]"
           style={{ background: "radial-gradient(ellipse, hsl(326 100% 60%), hsl(186 100% 50%), transparent 70%)" }} />

      {/* terminal card */}
      <div className="relative z-20 w-full max-w-[520px]">
        {/* top gradient bar */}
        <div className="h-[3px] w-full bg-gradient-to-r from-primary via-secondary to-accent rounded-t-sm"
             style={{ boxShadow: "0 0 16px hsl(186 100% 50%)" }} />

        <div className="border border-white/10 bg-[#080b12]/90 backdrop-blur-sm rounded-b-sm p-7 shadow-[0_0_60px_rgba(0,240,255,0.08)]">

          {/* header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/8">
            <div className="flex gap-1.5">
              {["#ff6b6b","#ffd93d","#6bcb77"].map(c => (
                <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}` }} />
              ))}
            </div>
            <span className="font-mono-retro text-[10px] text-muted-foreground/60 tracking-widest ml-2">
              JAY_ESMALLA.EXE — TERMINAL v3.2.0
            </span>
          </div>

          {/* lines */}
          <div className="space-y-2 mb-6 min-h-[165px]">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                <span className="font-mono-retro text-[10px]"
                      style={{ color: "hsl(326 100% 70%)", textShadow: "0 0 6px hsl(326 100% 70% / 0.6)" }}>
                  &gt;
                </span>
                <span className="font-mono-retro text-xs text-[#c8f8ff]/90 tracking-wider">
                  {line.shown}
                  {line.status === "typing" && (
                    <span className="inline-block w-[7px] h-[13px] bg-secondary align-middle ml-0.5 animate-pulse" />
                  )}
                </span>
                {line.status === "ok" && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-auto font-mono-retro text-[10px] tracking-widest"
                    style={{ color: "hsl(186 100% 50%)", textShadow: "0 0 6px hsl(186 100% 50% / 0.8)" }}
                  >
                    [ OK ]
                  </motion.span>
                )}
              </motion.div>
            ))}

            {/* ACCESS GRANTED burst */}
            {accessGranted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-4 py-3 px-4 border rounded-sm text-center"
                style={{
                  borderColor: "hsl(186 100% 50%)",
                  boxShadow: "0 0 24px hsl(186 100% 50% / 0.6), inset 0 0 24px hsl(186 100% 50% / 0.08)",
                  background: "hsl(186 100% 50% / 0.05)",
                }}
              >
                <motion.p
                  animate={{ textShadow: [
                    "0 0 10px hsl(186 100% 50%)",
                    "0 0 30px hsl(186 100% 50%), 0 0 60px hsl(326 100% 70%)",
                    "0 0 10px hsl(186 100% 50%)",
                  ]}}
                  transition={{ duration: 0.6, repeat: 1 }}
                  className="font-display text-sm tracking-widest"
                  style={{ color: "hsl(186 100% 60%)" }}
                >
                  &gt; ACCESS GRANTED.
                </motion.p>
              </motion.div>
            )}
          </div>

          {/* progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-mono-retro text-[9px] text-muted-foreground/50">
              <span>BOOT PROGRESS</span>
              <span>{progress}%</span>
            </div>
            <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, hsl(326 100% 70%), hsl(186 100% 50%))",
                         boxShadow: "0 0 8px hsl(186 100% 50%)" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BootSequence;

