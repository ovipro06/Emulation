import React, { useState, useEffect, useRef } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import {
  Gamepad2,
  Trophy,
  RotateCcw,
  Zap,
  Coins,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  Sparkles,
} from 'lucide-react';

interface Obstacle {
  id: number;
  lane: number; // 0, 1, 2
  y: number; // 0 to 100
  type: 'train' | 'barrier' | 'coin';
}

export const SubwayRunnerApp: React.FC = () => {
  const { showToast } = useEmulator();

  const [playerLane, setPlayerLane] = useState<number>(1); // 0: Left, 1: Center, 2: Right
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [coins, setCoins] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [highScore, setHighScore] = useState<number>(1840);

  const [obstacles, setObstacles] = useState<Obstacle[]>([
    { id: 1, lane: 0, y: 10, type: 'train' },
    { id: 2, lane: 2, y: 40, type: 'barrier' },
    { id: 3, lane: 1, y: 65, type: 'coin' },
  ]);

  // Game loop
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const interval = setInterval(() => {
      setScore((s) => s + 5);

      setObstacles((prev) => {
        // Move obstacles down
        const updated = prev
          .map((ob) => ({ ...ob, y: ob.y + 4 }))
          .filter((ob) => ob.y <= 100);

        // Check collision at player position (~80% height)
        for (const ob of updated) {
          if (ob.y >= 75 && ob.y <= 85 && ob.lane === playerLane) {
            if (ob.type === 'coin') {
              setCoins((c) => c + 1);
              ob.y = 110; // collected
            } else if (!isJumping) {
              // Collision
              setIsGameOver(true);
              setIsPlaying(false);
              showToast('Game Over! Obstacle hit.');
              return updated;
            }
          }
        }

        // Spawn new obstacles randomly
        if (Math.random() < 0.18 && updated.length < 5) {
          const randomLane = Math.floor(Math.random() * 3);
          const types: ('train' | 'barrier' | 'coin')[] = ['train', 'barrier', 'coin', 'coin'];
          const randomType = types[Math.floor(Math.random() * types.length)];
          updated.push({
            id: Date.now() + Math.random(),
            lane: randomLane,
            y: 0,
            type: randomType,
          });
        }

        return updated;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, isGameOver, playerLane, isJumping, showToast]);

  const handleMoveLeft = () => {
    setPlayerLane((prev) => Math.max(0, prev - 1));
  };

  const handleMoveRight = () => {
    setPlayerLane((prev) => Math.min(2, prev + 1));
  };

  const handleJump = () => {
    if (isJumping) return;
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 600);
  };

  const restartGame = () => {
    setPlayerLane(1);
    setScore(0);
    setCoins(0);
    setIsGameOver(false);
    setIsPlaying(true);
    setObstacles([
      { id: 1, lane: 0, y: 10, type: 'train' },
      { id: 2, lane: 2, y: 40, type: 'barrier' },
      { id: 3, lane: 1, y: 65, type: 'coin' },
    ]);
  };

  return (
    <div className="w-full h-full bg-slate-950 text-white flex flex-col font-sans select-none overflow-hidden relative">
      {/* Top Game HUD */}
      <div className="absolute top-2 inset-x-3 z-20 flex items-center justify-between bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10 text-xs font-bold">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-amber-300">
            <Coins size={14} className="fill-current" />
            <span className="font-mono">{coins}</span>
          </div>
          <div className="flex items-center gap-1 text-sky-400">
            <Trophy size={14} />
            <span className="font-mono">{score}</span>
          </div>
        </div>

        <span className="text-[10px] text-emerald-400 font-mono">120 FPS • Vulkan</span>
      </div>

      {/* Main 3-Lane Track Canvas */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950">
        {/* Track Lines */}
        <div className="absolute inset-0 grid grid-cols-3 divide-x divide-white/10">
          <div className="h-full bg-slate-900/40 relative">
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
          </div>
          <div className="h-full bg-slate-900/20 relative">
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
          </div>
          <div className="h-full bg-slate-900/40 relative">
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
          </div>
        </div>

        {/* Falling Obstacles */}
        {obstacles.map((ob) => (
          <div
            key={ob.id}
            className="absolute transition-all duration-100 flex items-center justify-center"
            style={{
              top: `${ob.y}%`,
              left: `${ob.lane * 33.33 + 4}%`,
              width: '25%',
              height: ob.type === 'train' ? '70px' : '36px',
            }}
          >
            {ob.type === 'train' ? (
              <div className="w-full h-full bg-gradient-to-b from-red-600 to-red-800 rounded-2xl border-2 border-red-400 shadow-xl flex flex-col items-center justify-center text-white">
                <span className="text-[9px] font-black tracking-wider uppercase">TRAIN</span>
                <div className="flex gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
                </div>
              </div>
            ) : ob.type === 'barrier' ? (
              <div className="w-full h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl border border-yellow-300 flex items-center justify-center font-bold text-[10px] text-black shadow">
                BARRIER
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-yellow-200 text-slate-950 flex items-center justify-center font-black shadow-lg animate-bounce">
                $
              </div>
            )}
          </div>
        ))}

        {/* Runner Character */}
        <div
          className={`absolute bottom-16 transition-all duration-150 flex flex-col items-center justify-center ${
            isJumping ? '-translate-y-12 scale-110' : ''
          }`}
          style={{
            left: `${playerLane * 33.33 + 4}%`,
            width: '25%',
          }}
        >
          <div className="w-12 h-14 rounded-2xl bg-gradient-to-b from-blue-500 via-indigo-600 to-purple-700 border-2 border-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.6)] flex items-center justify-center text-white">
            <Gamepad2 size={24} />
          </div>
          <span className="text-[9px] font-mono text-cyan-300 mt-1 font-bold">JAKE</span>
        </div>
      </div>

      {/* Touch Control Bar */}
      <div className="p-3 bg-slate-900 border-t border-white/10 flex items-center justify-between gap-3 z-20">
        <button
          onClick={handleMoveLeft}
          className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 flex items-center justify-center text-white border border-white/10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleJump}
          className="flex-1 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 active:scale-95 flex items-center justify-center text-white font-bold text-xs gap-1 shadow-lg shadow-cyan-900/40"
        >
          <ArrowUp size={18} />
          <span>JUMP</span>
        </button>
        <button
          onClick={handleMoveRight}
          className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 flex items-center justify-center text-white border border-white/10"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* GAME OVER MODAL */}
      {isGameOver && (
        <div className="absolute inset-0 z-40 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center text-red-400 shadow-xl">
            <Trophy size={32} />
          </div>

          <div>
            <h2 className="text-xl font-black text-white tracking-tight">GAME OVER</h2>
            <p className="text-xs text-slate-400 mt-1">You crashed on the subway tracks!</p>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-white/10 w-full max-w-[220px] space-y-1.5 font-mono">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Score:</span>
              <span className="text-white font-bold">{score}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Coins:</span>
              <span className="text-amber-400 font-bold">{coins}</span>
            </div>
            <div className="flex justify-between text-xs border-t border-white/10 pt-1">
              <span className="text-slate-400">Best:</span>
              <span className="text-cyan-400 font-bold">{Math.max(score, highScore)}</span>
            </div>
          </div>

          <button
            onClick={restartGame}
            className="w-full max-w-[220px] py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-xl flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            <span>PLAY AGAIN</span>
          </button>
        </div>
      )}
    </div>
  );
};
