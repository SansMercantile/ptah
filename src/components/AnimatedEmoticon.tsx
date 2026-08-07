import React from "react";

interface AnimatedEmoticonProps {
  score: number; // 0 to 100
  size?: number | string;
}

export default function AnimatedEmoticon({ score, size = 48 }: AnimatedEmoticonProps) {
  // Determine state based on score
  // Happy/Nominal: >= 80
  // Neutral/Medium/Sufficient: 50 to 79
  // Sad/Critical/High Risk: < 50
  
  if (score >= 80) {
    return (
      <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
        {/* Ambient background pulsing glow */}
        <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none" />
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          className="relative drop-shadow-[0_0_8px_rgba(16,185,129,0.35)]"
        >
          <defs>
            <style>{`
              @keyframes eye-blink-happy {
                0%, 90%, 100% { transform: scaleY(1); }
                95% { transform: scaleY(0.1); }
              }
              @keyframes mouth-slide {
                0%, 100% { transform: scaleX(1); }
                50% { transform: scaleX(1.05); }
              }
              @keyframes circle-pulse {
                0%, 100% { transform: scale(1); stroke-width: 3.5; }
                50% { transform: scale(1.02); stroke-width: 4.5; }
              }
              .face-circle-happy {
                stroke: #10b981;
                fill: #064e3b;
                transform-origin: center;
                animation: circle-pulse 3s ease-in-out infinite;
              }
              .eye-happy {
                fill: #10b981;
                transform-origin: center;
                animation: eye-blink-happy 4s ease-in-out infinite;
              }
              .mouth-happy {
                stroke: #10b981;
                stroke-width: 4.5;
                stroke-linecap: round;
                fill: none;
                transform-origin: center;
                animation: mouth-slide 3s ease-in-out infinite;
              }
            `}</style>
          </defs>

          {/* Face Circle Outer boundary */}
          <circle cx="50" cy="50" r="44" className="face-circle-happy" />

          {/* Happy Blinking Curved Eyes */}
          <path d="M 30,38 Q 36,32 42,38" className="eye-happy" stroke="#10b981" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M 58,38 Q 64,32 70,38" className="eye-happy" stroke="#10b981" strokeWidth="4.5" strokeLinecap="round" fill="none" />

          {/* Wide Glowing Smile */}
          <path d="M 28,52 Q 50,78 72,52" className="mouth-happy" />
          
          {/* Decorative Sparkle dots */}
          <circle cx="24" cy="50" r="1.5" fill="#34d399" />
          <circle cx="76" cy="50" r="1.5" fill="#34d399" />
        </svg>
      </div>
    );
  } else if (score >= 50) {
    return (
      <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
        {/* Yellow ambient breathing glow */}
        <div className="absolute inset-0 bg-yellow-500/5 rounded-full animate-pulse pointer-events-none" />
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          className="relative drop-shadow-[0_0_8px_rgba(245,158,11,0.25)]"
        >
          <defs>
            <style>{`
              @keyframes eye-blink-neutral {
                0%, 80%, 100% { transform: scaleY(1); }
                90% { transform: scaleY(0.08); }
              }
              @keyframes mouth-flat-adjust {
                0%, 100% { transform: scaleX(1); }
                50% { transform: scaleX(0.9); }
              }
              @keyframes line-glow {
                0%, 100% { stroke: #eab308; }
                50% { stroke: #f59e0b; }
              }
              .face-circle-neutral {
                stroke: #eab308;
                fill: #451a03;
                stroke-width: 3.5;
              }
              .eye-neutral {
                fill: #eab308;
                transform-origin: center;
                animation: eye-blink-neutral 5s ease-in-out infinite;
              }
              .mouth-neutral {
                stroke: #eab308;
                stroke-width: 4.5;
                stroke-linecap: round;
                fill: none;
                transform-origin: center;
                animation: mouth-flat-adjust 4s ease-in-out infinite, line-glow 3s ease-in-out infinite;
              }
            `}</style>
          </defs>

          {/* Face Circle */}
          <circle cx="50" cy="50" r="44" className="face-circle-neutral" />

          {/* Flat Neutral Straight Blinking Eyes */}
          <rect x="30" y="38" width="10" height="3" rx="1.5" className="eye-neutral" />
          <rect x="60" y="38" width="10" height="3" rx="1.5" className="eye-neutral" />

          {/* Flat Neutral Straight Line Mouth */}
          <line x1="32" y1="60" x2="68" y2="60" className="mouth-neutral" />
        </svg>
      </div>
    );
  } else {
    return (
      <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
        {/* Red blinking high risk notification ring */}
        <div className="absolute inset-x-0 inset-y-0 border border-red-500/20 rounded-full animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none" />
        <div className="absolute inset-0 bg-red-500/10 rounded-full animate-pulse pointer-events-none" />
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          className="relative drop-shadow-[0_0_10px_rgba(239,68,68,0.45)]"
        >
          <defs>
            <style>{`
              @keyframes eye-anger-quiver {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                20% { transform: translateY(-0.5px) rotate(-1deg); }
                40% { transform: translateY(0.5px) rotate(1deg); }
                60% { transform: translateY(-0.5px) rotate(1deg); }
                80% { transform: translateY(0.5px) rotate(-1deg); }
              }
              @keyframes mouth-tremble {
                0%, 100% { transform: scale(1) translateY(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateY(-0.8px) scaleX(1.02); }
                20%, 40%, 60%, 80% { transform: translateY(0.8px) scaleX(0.98); }
              }
              .face-circle-sad {
                stroke: #ef4444;
                fill: #450a0a;
                stroke-width: 4;
              }
              .eye-brow-sad {
                stroke: #ef4444;
                stroke-width: 3.5;
                stroke-linecap: round;
                animation: eye-anger-quiver 0.8s linear infinite;
              }
              .eye-sad-dot {
                fill: #fca5a5;
                transform-origin: center;
              }
              .mouth-sad {
                stroke: #ef4444;
                stroke-width: 5;
                stroke-linecap: round;
                fill: none;
                transform-origin: center;
                animation: mouth-tremble 1.2s linear infinite;
              }
            `}</style>
          </defs>

          {/* Face Circle */}
          <circle cx="50" cy="50" r="44" className="face-circle-sad" />

          {/* Furious Angry Eye Brows (slanted inward) */}
          <line x1="28" y1="32" x2="42" y2="38" className="eye-brow-sad" />
          <line x1="72" y1="32" x2="58" y2="38" className="eye-brow-sad" />

          {/* Tiny terrified red/light indicators below brows */}
          <circle cx="34" cy="42" r="3.5" className="eye-sad-dot" />
          <circle cx="66" cy="42" r="3.5" className="eye-sad-dot" />

          {/* Quivering downward deep sad/violated frown */}
          <path d="M 32,68 Q 50,48 68,68" className="mouth-sad" />
        </svg>
      </div>
    );
  }
}
