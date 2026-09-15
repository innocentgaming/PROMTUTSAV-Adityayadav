import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CyberTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleMatrix: () => void;
  isMatrixActive: boolean;
  onWarpTo: (sectionId: string) => void;
  onPlayTyping: () => void;
  onPlayError: () => void;
  onPlaySuccess: () => void;
  onPlayWarp: () => void;
  currentTheme: string;
  onSetTheme: (theme: string) => void;
}

interface CommandLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  text: string;
}

const QUOTES = [
  "“Remember, your work may be only to sweep a railway crossing, but it is your duty to keep it so clean that no other crossing in the world is cleaner.” — Sir M. Visvesvaraya",
  "“Engineers like to solve problems. If there are no problems handily available, they will create their own problems.” — Scott Adams",
  "“The scientist discovers a new type of material or energy and the engineer puts it to use to make a new thing or service.” — Ralph Budd",
  "“We cannot solve our problems with the same thinking we used when we created them.” — Albert Einstein",
  "“Any sufficiently advanced technology is indistinguishable from magic.” — Arthur C. Clarke",
];

export const CyberTerminal: React.FC<CyberTerminalProps> = ({
  isOpen,
  onClose,
  onToggleMatrix,
  isMatrixActive,
  onWarpTo,
  onPlayTyping,
  onPlayError,
  onPlaySuccess,
  onPlayWarp,
  currentTheme,
  onSetTheme,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [history, setHistory] = useState<string[]>([]);
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'ENGINEER-OS v2.0.26 [SECURE KERNEL ACTIVATED]',
    },
    {
      id: 'init-2',
      type: 'system',
      text: 'Type "help" to view diagnostic subsystems and active cyber routines.',
    },
  ]);

  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onPlayTyping();

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal.trim());
    }
  };

  const executeCommand = (cmd: string) => {
    if (!cmd) return;

    // Save to history
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInputVal('');

    const newLogs: CommandLog[] = [
      ...logs,
      { id: `${Date.now()}-in`, type: 'input', text: `root@engineer2.0:~$ ${cmd}` },
    ];

    const parts = cmd.toLowerCase().split(' ');
    const primary = parts[0];
    const arg = parts[1];

    switch (primary) {
      case 'help':
        onPlaySuccess();
        newLogs.push({
          id: `${Date.now()}-out`,
          type: 'output',
          text: `AVAILABLE CYBER COMMANDS:
  help               - Display command manual
  matrix             - Toggle full-spectrum digital code rain (currently: ${isMatrixActive ? 'ACTIVE' : 'STANDBY'})
  visvesvaraya       - Retrieve classified historical dossier on Sir M. Visvesvaraya
  quote              - Decrypt engineering wisdom transmission
  confetti           - Trigger victory particle detonation
  specs              - Run client hardware & environment telemetry scan
  warp <section>     - Hyper-scroll to: hero, legacy, universe, ai, challenge, identity, event
  theme <name>       - Set cyber accent palette: cyan | emerald | plasma
  clear              - Purge terminal console buffer
  exit               - Terminate terminal session`,
        });
        break;

      case 'matrix':
        onToggleMatrix();
        onPlayWarp();
        newLogs.push({
          id: `${Date.now()}-out`,
          type: 'output',
          text: `[NEURAL MATRIX] Digital rain protocol switched to: ${!isMatrixActive ? 'ONLINE' : 'OFFLINE'}`,
        });
        break;

      case 'visvesvaraya':
        onPlaySuccess();
        newLogs.push({
          id: `${Date.now()}-out`,
          type: 'output',
          text: `[DOSSIER] Sir Mokshagundam Visvesvaraya (15 Sept 1860 – 14 April 1962)
  • Honor: Bharat Ratna (1955) | Knight Commander of the Order of the Indian Empire
  • Monumental Feats: Patented Automatic Sluice Gates (Khadakwasla), Chief Architect of KRS Dam
  • Legacy: Pioneer of Indian industrialization, sanitary drainage, and economic nation-building.`,
        });
        break;

      case 'quote':
        onPlaySuccess();
        const randQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        newLogs.push({
          id: `${Date.now()}-out`,
          type: 'output',
          text: randQuote,
        });
        break;

      case 'confetti':
        onPlaySuccess();
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00D9FF', '#0066FF', '#10B981', '#F59E0B'],
        });
        newLogs.push({
          id: `${Date.now()}-out`,
          type: 'output',
          text: '[CELEBRATION] Particle burst initiated for Prompt Utsav 2026!',
        });
        break;

      case 'specs':
        onPlaySuccess();
        const nav = typeof navigator !== 'undefined' ? navigator : null;
        const screenRes = typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'N/A';
        const cores = nav?.hardwareConcurrency ? `${nav.hardwareConcurrency} Cores` : 'Unknown';
        newLogs.push({
          id: `${Date.now()}-out`,
          type: 'output',
          text: `[SYSTEM TELEMETRY SCAN]
  Resolution   : ${screenRes}
  CPU Concurrency: ${cores}
  Platform     : ${nav?.platform || 'Web/Browser'}
  Theme Glow   : ${currentTheme.toUpperCase()}
  Audio Engine : Web Audio Synthesizer (Active)
  Vite Engine  : 8.3.0 Client Production Build`,
        });
        break;

      case 'warp':
        if (!arg) {
          onPlayError();
          newLogs.push({
            id: `${Date.now()}-err`,
            type: 'error',
            text: 'ERROR: Specify section! Examples: warp legacy | warp ai | warp challenge | warp identity | warp event',
          });
        } else {
          onPlayWarp();
          const target = arg === 'universe' ? 'engineering' : arg;
          onWarpTo(target);
          newLogs.push({
            id: `${Date.now()}-out`,
            type: 'output',
            text: `[WARP INITIATED] Navigating subspace coordinates to #${target}...`,
          });
        }
        break;

      case 'theme':
        if (['cyan', 'emerald', 'plasma'].includes(arg)) {
          onSetTheme(arg);
          onPlaySuccess();
          newLogs.push({
            id: `${Date.now()}-out`,
            type: 'output',
            text: `[PALETTE] Visual spectrum reconfigured to [${arg.toUpperCase()}].`,
          });
        } else {
          onPlayError();
          newLogs.push({
            id: `${Date.now()}-err`,
            type: 'error',
            text: 'ERROR: Unknown theme. Valid options: cyan | emerald | plasma',
          });
        }
        break;

      case 'clear':
        setLogs([]);
        return;

      case 'exit':
        onClose();
        return;

      default:
        onPlayError();
        newLogs.push({
          id: `${Date.now()}-err`,
          type: 'error',
          text: `Command not recognized: "${cmd}". Type "help" for available protocols.`,
        });
        break;
    }

    setLogs(newLogs);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-[#05080D]/95 border border-cyan-accent/50 rounded-lg shadow-2xl shadow-cyan-accent/20 overflow-hidden flex flex-col font-mono text-xs sm:text-sm"
        style={{ height: '480px' }}
      >
        {/* Terminal Title Bar */}
        <div className="bg-[#0B132B] px-4 py-2.5 border-b border-cyan-accent/30 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-accent" />
            <span className="text-white font-bold tracking-wider text-xs flex items-center gap-2">
              CYBER_TERMINAL://ENGINEER-2.0
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent animate-pulse" />
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[10px] text-technical-dim">PRESS ESC OR ~ TO CLOSE</span>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/10 text-technical-dim hover:text-white rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Log Output */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-[#05080D] select-text">
          {logs.map((log) => (
            <div key={log.id} className="leading-relaxed whitespace-pre-wrap">
              {log.type === 'input' && (
                <span className="text-cyan-accent font-semibold">{log.text}</span>
              )}
              {log.type === 'output' && (
                <span className="text-gray-200">{log.text}</span>
              )}
              {log.type === 'system' && (
                <span className="text-technical-dim flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-accent inline" />
                  {log.text}
                </span>
              )}
              {log.type === 'error' && (
                <span className="text-red-400 font-semibold">{log.text}</span>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Terminal Input Bar */}
        <div className="p-3 bg-[#080E18] border-t border-cyan-accent/20 flex items-center gap-2">
          <span className="text-cyan-accent font-bold select-none">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'matrix', 'quote', 'specs', 'theme emerald'..."
            className="flex-1 bg-transparent text-white outline-none font-mono placeholder:text-white/20 text-xs sm:text-sm"
          />
          <button
            onClick={() => executeCommand(inputVal.trim())}
            className="px-2.5 py-1 bg-cyan-accent/10 hover:bg-cyan-accent/20 border border-cyan-accent/40 text-cyan-accent text-xs rounded transition-colors"
          >
            EXEC
          </button>
        </div>
      </div>
    </div>
  );
};
