"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, RefreshCcw, Hand, BrainCircuit, Hash, Zap, MousePointerClick, Orbit } from "lucide-react";

const games = [
  { id: "sort", name: "Sort Vis", icon: <Hash size={18} /> },
  { id: "memory", name: "Memory", icon: <BrainCircuit size={18} /> },
  { id: "reaction", name: "Reaction", icon: <Zap size={18} /> },
  { id: "cps", name: "Click Speed", icon: <MousePointerClick size={18} /> },
  { id: "snake", name: "Snake", icon: <Orbit size={18} /> },
  { id: "rps", name: "RPS Logic", icon: <Hand size={18} /> },
  { id: "tictactoe", name: "Tic Tac Toe", icon: <Gamepad2 size={18} /> },
];

export default function Playground() {
  const [activeGame, setActiveGame] = useState(games[0].id);

  // === SORTING VISUALIZER ===
  const [bars, setBars] = useState(() => Array.from({ length: 15 }, () => Math.floor(Math.random() * 80) + 10));
  const randomizeBars = () => setBars(Array.from({ length: 15 }, () => Math.floor(Math.random() * 80) + 10));

  // === MEMORY MATCH ===
  const [memoryGrid, setMemoryGrid] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);

  useEffect(() => {
    if (activeGame === "memory") {
      initMemory();
    }
  }, [activeGame]);

  const initMemory = () => {
    const pairs = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
    setMemoryGrid(pairs.sort(() => Math.random() - 0.5));
    setFlipped([]);
    setSolved([]);
  };

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || solved.includes(index) || flipped.includes(index)) return;
    
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      if (memoryGrid[newFlipped[0]] === memoryGrid[newFlipped[1]]) {
        setSolved([...solved, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  // === TIC TAC TOE ===
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  
  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return null;
  };

  const handleTTTClick = (i: number) => {
    if (board[i] || calculateWinner(board)) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  // === RPS ===
  const [rpsResult, setRpsResult] = useState("Choose your weapon");

  const playRPS = (choice: string) => {
    const options = ["Rock", "Paper", "Scissors"];
    const aiChoice = options[Math.floor(Math.random() * 3)];
    if (choice === aiChoice) setRpsResult("Draw! AI chose " + aiChoice);
    else if (
      (choice === "Rock" && aiChoice === "Scissors") ||
      (choice === "Paper" && aiChoice === "Rock") ||
      (choice === "Scissors" && aiChoice === "Paper")
    ) setRpsResult("You Win! AI chose " + aiChoice);
    else setRpsResult("You Lose! AI chose " + aiChoice);
  };

  // === REACTION TIME ===
  const [reactionState, setReactionState] = useState<"waiting" | "ready" | "clicked">("waiting");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (reactionState === "waiting" && activeGame === "reaction") {
      timeout = setTimeout(() => {
        setReactionState("ready");
        setStartTime(Date.now());
      }, Math.random() * 3000 + 1000);
    }
    return () => clearTimeout(timeout);
  }, [reactionState, activeGame]);

  const handleReactionClick = () => {
    if (reactionState === "waiting") {
      alert("Too early!");
      setReactionState("waiting");
    } else if (reactionState === "ready") {
      setReactionTime(Date.now() - startTime);
      setReactionState("clicked");
    } else {
      setReactionState("waiting");
      setReactionTime(null);
    }
  };

  // === CPS TEST ===
  const [cpsClicks, setCpsClicks] = useState(0);
  const [cpsTimeLeft, setCpsTimeLeft] = useState(5);
  const [cpsActive, setCpsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (cpsActive && cpsTimeLeft > 0) {
      interval = setInterval(() => setCpsTimeLeft((t) => t - 1), 1000);
    } else if (cpsTimeLeft === 0) {
      setCpsActive(false);
    }
    return () => clearInterval(interval);
  }, [cpsActive, cpsTimeLeft]);

  const handleCpsClick = () => {
    if (cpsTimeLeft === 0) return;
    if (!cpsActive) {
      setCpsActive(true);
      setCpsClicks(1);
    } else {
      setCpsClicks((c) => c + 1);
    }
  };

  const resetCps = () => {
    setCpsActive(false);
    setCpsTimeLeft(5);
    setCpsClicks(0);
  };

  // === SNAKE LOGIC ===
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [dir, setDir] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [snakeStarted, setSnakeStarted] = useState(false);

  const keyHandler = useCallback((e: KeyboardEvent) => {
    if (activeGame !== "snake") return;
    switch (e.key) {
      case "ArrowUp": if (dir.y === 0) setDir({ x: 0, y: -1 }); break;
      case "ArrowDown": if (dir.y === 0) setDir({ x: 0, y: 1 }); break;
      case "ArrowLeft": if (dir.x === 0) setDir({ x: -1, y: 0 }); break;
      case "ArrowRight": if (dir.x === 0) setDir({ x: 1, y: 0 }); break;
    }
  }, [dir, activeGame]);

  useEffect(() => {
    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [keyHandler]);

  useEffect(() => {
    if (activeGame !== "snake" || !snakeStarted || gameOver) return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || prev.some(seg => seg.x === head.x && seg.y === head.y)) {
          setGameOver(true);
          return prev;
        }
        const newSnake = [head, ...prev];
        if (head.x === food.x && head.y === food.y) {
          setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [dir, activeGame, gameOver, food, snakeStarted]);

  const resetSnake = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDir({ x: 1, y: 0 });
    setFood({ x: 15, y: 15 });
    setGameOver(false);
    setSnakeStarted(true);
  };

  return (
    <section id="playground" className="relative w-full py-32 bg-background dark:bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-primary dark:text-white"
          >
            Playground Arcade.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-secondary max-w-lg"
          >
            Logic visualizations and mini-games built with React state and Framer Motion. Stay a while.
          </motion.p>
        </div>

        <div className="bg-card dark:bg-[#0a0a0a] border border-border dark:border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl flex flex-col md:flex-row gap-8 min-h-[500px]">
          
          {/* Game Selector Sidebar */}
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 md:w-48 border-b md:border-b-0 md:border-r border-border dark:border-white/10 md:pr-6 scrollbar-hide">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl whitespace-nowrap transition-all interactive ${
                  activeGame === game.id 
                    ? "bg-accent/10 border border-accent/20 text-accent font-medium shadow-[0_0_15px_rgba(0,255,204,0.1)]" 
                    : "bg-transparent border border-transparent text-secondary dark:text-zinc-500 hover:text-primary dark:hover:text-white hover:bg-card-hover dark:hover:bg-white/5"
                }`}
              >
                {game.icon}
                <span className="text-sm">{game.name}</span>
              </button>
            ))}
          </div>

          {/* Game Display Area */}
          <div className="flex-1 flex flex-col items-center justify-center relative w-full h-full min-h-[350px]">
            <AnimatePresence mode="wait">
              
              {/* SORT VISUALIZER */}
              {activeGame === "sort" && (
                <motion.div key="sort" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex justify-center items-end h-64 gap-2">
                  <button onClick={randomizeBars} className="absolute top-0 right-0 p-2 text-zinc-500 hover:text-accent interactive"><RefreshCcw size={20}/></button>
                  {bars.map((height, idx) => (
                    <motion.div
                      key={idx}
                      layout
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-full max-w-[2rem] bg-primary/20 dark:bg-zinc-800 rounded-t-sm relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </motion.div>
                  ))}
                  <div className="absolute bottom-[-40px] text-xs font-mono text-zinc-500 uppercase tracking-widest">Array Data Visualization</div>
                </motion.div>
              )}

              {/* MEMORY MATCH */}
              {activeGame === "memory" && (
                <motion.div key="memory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-sm mx-auto flex flex-col items-center">
                  <button onClick={initMemory} className="absolute top-0 right-0 p-2 text-zinc-500 hover:text-accent interactive"><RefreshCcw size={20}/></button>
                  <div className="grid grid-cols-4 gap-3 w-full" style={{ perspective: "1000px" }}>
                    {memoryGrid.map((num, idx) => {
                      const isVisible = flipped.includes(idx) || solved.includes(idx);
                      // Use proper 3D transform strings
                      return (
                        <div 
                          key={idx} 
                          onClick={() => handleCardClick(idx)}
                          className="w-full aspect-square cursor-pointer interactive"
                        >
                          <motion.div
                            animate={{ rotateY: isVisible ? 180 : 0 }}
                            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                            className="w-full h-full relative"
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            {/* FRONT (HIDDEN SIDE/QUESTION MARK) */}
                            <div 
                              className="absolute inset-0 bg-background dark:bg-white/5 border border-border dark:border-white/10 rounded-xl flex items-center justify-center hover:border-accent/50 transition-colors"
                              style={{ backfaceVisibility: "hidden" }}
                            >
                              <span className="text-secondary/50 dark:text-white/20 text-xs font-mono">?</span>
                            </div>
                            
                            {/* BACK (REVEALED SIDE/NUMBER) */}
                            <div 
                              className="absolute inset-0 bg-accent border border-accent rounded-xl flex items-center justify-center"
                              style={{ 
                                backfaceVisibility: "hidden",
                                transform: "rotateY(180deg)"
                              }}
                            >
                              <span className="text-2xl font-bold text-black drop-shadow-md">{num}</span>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                  {solved.length === 12 && (
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="mt-6 text-accent font-mono animate-pulse bg-accent/10 px-4 py-2 rounded-full border border-accent/20"
                    >
                      System Memory Restored!
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* REACTION TIME */}
              {activeGame === "reaction" && (
                <motion.div key="reaction" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex items-center justify-center">
                  <button 
                    onClick={handleReactionClick}
                    className={`w-full max-w-md aspect-video rounded-3xl flex items-center justify-center text-2xl font-bold transition-colors interactive shadow-md ${
                      reactionState === "waiting" ? "bg-red-500/10 dark:bg-red-500/20 text-red-500 dark:text-red-500 border border-red-500/20 dark:border-red-500/50" :
                      reactionState === "ready" ? "bg-accent/10 dark:bg-accent/20 text-accent border border-accent/30 dark:border-accent/50" :
                      "bg-card dark:bg-white/5 text-primary dark:text-white border border-border dark:border-white/10 hover:bg-card-hover dark:hover:bg-white/10"
                    }`}
                  >
                    {reactionState === "waiting" ? "Wait for Green..." :
                     reactionState === "ready" ? "CLICK NOW!" :
                     reactionTime ? `${reactionTime}ms - Click to Restart` : "Click to Start"}
                  </button>
                </motion.div>
              )}

              {/* CLICK SPEED TEST */}
              {activeGame === "cps" && (
                <motion.div key="cps" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col items-center">
                  <button onClick={resetCps} className="absolute top-0 right-0 p-2 text-zinc-500 hover:text-accent interactive"><RefreshCcw size={20}/></button>
                  <div className="flex gap-12 mb-8">
                    <div className="text-center">
                      <div className="text-sm font-mono text-zinc-500 mb-1">Time</div>
                      <div className="text-3xl font-bold text-primary dark:text-white">{cpsTimeLeft}s</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-mono text-zinc-500 mb-1">Score</div>
                      <div className="text-3xl font-bold text-accent">{cpsTimeLeft === 0 ? (cpsClicks / 5).toFixed(1) : cpsClicks}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleCpsClick}
                    disabled={cpsTimeLeft === 0}
                    className="w-full max-w-md aspect-video bg-card dark:bg-white/5 border border-border dark:border-white/10 rounded-3xl flex items-center justify-center text-xl font-medium text-primary dark:text-zinc-300 hover:bg-card-hover dark:hover:bg-white/10 interactive disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  >
                    {cpsTimeLeft === 0 ? "Time's Up!" : cpsActive ? "CLICK!" : "Click to Start"}
                  </button>
                  {cpsTimeLeft === 0 && <div className="mt-6 text-secondary text-sm font-mono">CPS (Clicks Per Second)</div>}
                </motion.div>
              )}

              {/* SNAKE GAME */}
              {activeGame === "snake" && (
                <motion.div key="snake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                  {!snakeStarted || gameOver ? (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm rounded-xl">
                      {gameOver && <div className="text-red-500 font-bold text-2xl mb-2">Game Over</div>}
                      {gameOver && <div className="text-white mb-6 font-mono text-sm">Score: {snake.length - 1}</div>}
                      <button onClick={resetSnake} className="px-6 py-3 bg-accent text-black font-bold rounded-full interactive hover:scale-105 transition-transform">
                        {gameOver ? "Try Again" : "Start Game"}
                      </button>
                    </div>
                  ) : null}
                  <div 
                    className="relative bg-background dark:bg-black border border-border dark:border-white/10 rounded-md overflow-hidden shadow-[0_0_30px_rgba(0,255,204,0.05)]"
                    style={{ width: "300px", height: "300px" }}
                  >
                    {snake.map((segment, i) => (
                      <div
                        key={i}
                        className={`absolute w-[15px] h-[15px] ${i === 0 ? "bg-accent" : "bg-accent/70"} rounded-sm`}
                        style={{ left: segment.x * 15, top: segment.y * 15 }}
                      />
                    ))}
                    <div
                      className="absolute w-[15px] h-[15px] bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                      style={{ left: food.x * 15, top: food.y * 15 }}
                    />
                  </div>
                  <div className="mt-8 text-xs font-mono text-zinc-500">Use Arrow Keys to move</div>
                </motion.div>
              )}

              {/* TIC TAC TOE */}
              {activeGame === "tictactoe" && (
                <motion.div key="ttt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                  <button onClick={() => {setBoard(Array(9).fill(null)); setXIsNext(true)}} className="absolute top-0 right-0 p-2 text-zinc-500 hover:text-accent interactive"><RefreshCcw size={20}/></button>
                  <div className="grid grid-cols-3 gap-2 bg-card dark:bg-white/10 p-4 rounded-2xl w-64 max-w-full border border-border dark:border-transparent">
                    {board.map((cell, i) => (
                      <button
                        key={i}
                        onClick={() => handleTTTClick(i)}
                        className="aspect-square bg-background dark:bg-[#0a0a0a] rounded-xl border border-border dark:border-transparent shadow-sm dark:shadow-none text-3xl font-bold text-primary dark:text-white hover:bg-card-hover dark:hover:bg-white/5 interactive transition-colors flex items-center justify-center"
                      >
                        {cell === "X" ? <span className="text-accent">X</span> : <span className="text-primary dark:text-zinc-500">{cell}</span>}
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 text-sm font-mono text-zinc-400 h-6">
                    {calculateWinner(board) ? `Winner: ${calculateWinner(board)}` : board.includes(null) ? `Next player: ${xIsNext ? 'X' : 'O'}` : "Draw!"}
                  </div>
                </motion.div>
              )}

              {/* RPS */}
              {activeGame === "rps" && (
                <motion.div key="rps" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center w-full">
                  <div className="text-lg font-mono text-primary dark:text-zinc-300 mb-12 text-center h-8">{rpsResult}</div>
                  <div className="flex gap-4">
                    {["Rock", "Paper", "Scissors"].map(choice => (
                      <button 
                        key={choice} 
                        onClick={() => playRPS(choice)}
                        className="px-6 py-4 bg-card dark:bg-white/5 border border-border dark:border-white/10 text-primary dark:text-white rounded-xl hover:border-accent hover:text-accent dark:hover:text-accent interactive transition-all hover:-translate-y-1 shadow-sm"
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
