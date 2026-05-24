import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, RotateCcw } from "lucide-react";

type Difficulty = "easy" | "normal" | "hard";

type Drop = {
  id: number;
  col: number;
  row: number;
  type: "chip" | "hazard";
};

const columns = 7;
const rows = 9;
const playerRow = rows - 1;
const difficultySettings: Record<
  Difficulty,
  { label: string; lives: number; tick: number; spawnChance: number; hazardChance: number; points: number }
> = {
  easy: { label: "Easy", lives: 5, tick: 720, spawnChance: 0.48, hazardChance: 0.14, points: 8 },
  normal: { label: "Normal", lives: 3, tick: 520, spawnChance: 0.66, hazardChance: 0.28, points: 10 },
  hard: { label: "Hard", lives: 2, tick: 340, spawnChance: 0.82, hazardChance: 0.44, points: 15 },
};
const gridCells = Array.from({ length: columns * rows });

const ArcadeGame = () => {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [playerCol, setPlayerCol] = useState(Math.floor(columns / 2));
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(difficultySettings.normal.lives);
  const [running, setRunning] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const nextIdRef = useRef(1);
  const playerColRef = useRef(playerCol);

  const settings = difficultySettings[difficulty];

  const dropCells = useMemo(() => {
    const cells = new Map<string, Drop>();
    drops.forEach((drop) => cells.set(`${drop.row}-${drop.col}`, drop));
    return cells;
  }, [drops]);

  const status = useMemo(() => {
    if (lives <= 0) return "GAME OVER";
    return running ? "RUNNING" : "READY";
  }, [lives, running]);

  const movePlayer = useCallback((direction: -1 | 1) => {
    setPlayerCol((current) => Math.min(columns - 1, Math.max(0, current + direction)));
  }, []);

  useEffect(() => {
    playerColRef.current = playerCol;
  }, [playerCol]);

  const resetGame = useCallback(() => {
    setDrops([]);
    setPlayerCol(Math.floor(columns / 2));
    setScore(0);
    setLives(settings.lives);
    setRunning(true);
    nextIdRef.current = 1;
  }, [settings.lives]);

  const changeDifficulty = useCallback((level: Difficulty) => {
    setDifficulty(level);
    setDrops([]);
    setPlayerCol(Math.floor(columns / 2));
    setScore(0);
    setLives(difficultySettings[level].lives);
    setRunning(false);
    nextIdRef.current = 1;
  }, []);

  const startGame = useCallback(() => {
    if (lives <= 0) {
      resetGame();
      return;
    }
    setRunning(true);
  }, [lives, resetGame]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        movePlayer(-1);
      }
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        movePlayer(1);
      }
      if (event.key === " " || event.key === "Enter") {
        startGame();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [movePlayer, startGame]);

  useEffect(() => {
    if (!running || lives <= 0) return undefined;

    const interval = window.setInterval(() => {
      setDrops((currentDrops) => {
        let nextScore = 0;
        let nextDamage = 0;

        const advancedDrops = currentDrops
          .map((drop) => ({ ...drop, row: drop.row + 1 }))
          .filter((drop) => {
            const hitPlayer = drop.row === playerRow && drop.col === playerColRef.current;

            if (hitPlayer && drop.type === "chip") {
              nextScore += settings.points;
              return false;
            }

            if (hitPlayer && drop.type === "hazard") {
              nextDamage += 1;
              return false;
            }

            return drop.row < rows;
          });

        if (nextScore > 0) {
          setScore((currentScore) => currentScore + nextScore);
        }

        if (nextDamage > 0) {
          setLives((currentLives) => {
            const updatedLives = Math.max(0, currentLives - nextDamage);
            if (updatedLives === 0) setRunning(false);
            return updatedLives;
          });
        }

        if (Math.random() < settings.spawnChance) {
          const newDrop: Drop = {
            id: nextIdRef.current,
            col: Math.floor(Math.random() * columns),
            row: 0,
            type: Math.random() < settings.hazardChance ? "hazard" : "chip",
          };

          nextIdRef.current += 1;
          return [...advancedDrops, newDrop];
        }

        return advancedDrops;
      });
    }, settings.tick);

    return () => window.clearInterval(interval);
  }, [lives, running, settings.hazardChance, settings.points, settings.spawnChance, settings.tick]);

  return (
    <section className="relative px-4 pb-6 pt-20 md:pt-24">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 text-center text-2xl font-display neon-text-yellow md:text-3xl"
        >
          NEON DODGER
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="mx-auto mb-6 h-0.5 w-24 bg-[hsl(var(--neon-yellow))]"
          style={{ boxShadow: "0 0 10px hsl(52 100% 50%)" }}
        />

        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-5 lg:flex-row lg:items-stretch">
          <div className="w-full max-w-xl border border-border bg-card/70 p-4 lg:max-w-[18rem]">
            <img
              src="/neon-dodger-guide.svg"
              alt="Neon Dodger guide showing yellow chips to collect, blue player movement, and pink hazards to avoid."
              className="mb-4 h-36 w-full border border-border object-cover lg:h-32"
            />
            <p className="mb-3 font-mono-retro text-sm text-secondary">{"> how_to_play.txt"}</p>
            <p className="font-heading text-sm leading-relaxed text-foreground/80">
              Move left or right to catch yellow chips and avoid pink hazards. Use the arrow keys, A/D, or the on-screen
              controls. Press Start to begin and Reset to restart your run.
            </p>
          </div>

          <div className="grid w-full max-w-xl grid-cols-3 gap-3 lg:max-w-[15rem] lg:grid-cols-1">
            <div className="border border-secondary/30 bg-card/80 px-4 py-3 lg:py-4">
              <p className="font-mono-retro text-[10px] text-muted-foreground">SCORE</p>
              <p className="font-heading text-lg text-secondary md:text-xl">{score}</p>
            </div>
            <div className="border border-primary/30 bg-card/80 px-4 py-3 text-center lg:py-4 lg:text-left">
              <p className="font-mono-retro text-[10px] text-muted-foreground">STATUS</p>
              <p className="font-heading text-xs text-primary md:text-sm">{status}</p>
            </div>
            <div className="border border-[hsl(var(--neon-yellow)/0.4)] bg-card/80 px-4 py-3 text-right lg:py-4 lg:text-left">
              <p className="font-mono-retro text-[10px] text-muted-foreground">LIVES</p>
              <p className="font-heading text-lg text-[hsl(var(--neon-yellow))] md:text-xl">{lives}</p>
            </div>

            <div className="col-span-3 grid grid-cols-3 gap-2 lg:col-span-1">
              {(Object.keys(difficultySettings) as Difficulty[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => changeDifficulty(level)}
                  className={`border px-2 py-2 font-heading text-[10px] uppercase tracking-widest transition-all ${
                    difficulty === level
                      ? "border-primary bg-primary/15 text-primary shadow-[0_0_12px_hsl(var(--primary)/0.35)]"
                      : "border-border bg-card/70 text-muted-foreground hover:border-secondary/60 hover:text-secondary"
                  }`}
                >
                  {difficultySettings[level].label}
                </button>
              ))}
            </div>

            <div className="col-span-3 grid grid-cols-4 gap-2 lg:col-span-1 lg:mt-auto">
              <button
                type="button"
                onClick={() => movePlayer(-1)}
                className="neon-button flex items-center justify-center px-3 py-2"
                title="Move left"
                aria-label="Move left"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={startGame}
                className="neon-button neon-button-blue flex items-center justify-center px-3 py-2"
                title="Start"
                aria-label="Start"
              >
                <Play size={18} />
              </button>
              <button
                type="button"
                onClick={resetGame}
                className="neon-button neon-button-blue flex items-center justify-center px-3 py-2"
                title="Reset"
                aria-label="Reset"
              >
                <RotateCcw size={18} />
              </button>
              <button
                type="button"
                onClick={() => movePlayer(1)}
                className="neon-button flex items-center justify-center px-3 py-2"
                title="Move right"
                aria-label="Move right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            className="relative aspect-[7/9] w-full max-w-[32rem] overflow-hidden rounded-sm border border-border bg-background/80 p-3 shadow-[0_0_35px_hsl(var(--secondary)/0.16)]"
            style={{ width: "min(100%, 32rem, 48dvh)" }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--secondary)/0.12)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.12)_1px,transparent_1px)] bg-[size:48px_48px]" />
            <div className="relative grid h-full grid-cols-7 grid-rows-9 gap-1">
              {gridCells.map((_, index) => {
                const row = Math.floor(index / columns);
                const col = index % columns;
                const drop = dropCells.get(`${row}-${col}`);
                const hasPlayer = row === playerRow && col === playerCol;

                return (
                  <div key={`${row}-${col}`} className="relative border border-border/40 bg-muted/20">
                    {drop && (
                      <div
                        className={`absolute inset-[18%] rounded-sm ${
                          drop.type === "chip"
                            ? "bg-[hsl(var(--neon-yellow))] shadow-[0_0_18px_hsl(var(--neon-yellow)/0.8)]"
                            : "bg-primary shadow-[0_0_18px_hsl(var(--primary)/0.8)]"
                        }`}
                      />
                    )}
                    {hasPlayer && (
                      <div className="absolute inset-x-[18%] bottom-[12%] h-[58%] border-2 border-secondary bg-secondary/20 shadow-[0_0_18px_hsl(var(--secondary)/0.8)]" />
                    )}
                  </div>
                );
              })}
            </div>

            {lives <= 0 && (
              <div className="absolute inset-0 grid place-items-center bg-background/70 backdrop-blur-sm">
                <p className="font-display text-lg neon-text-pink">GAME OVER</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArcadeGame;
