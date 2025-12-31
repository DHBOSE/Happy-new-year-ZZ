import React, { useState, useEffect } from 'react';

const GreetingCard: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fade in text after a short delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none p-4">
      <style>{`
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient-text {
          background: linear-gradient(
            to right,
            #facc15 0%,   /* Bright Gold */
            #f43f5e 20%,  /* Rose Red */
            #a855f7 40%,  /* Vivid Purple */
            #3b82f6 60%,  /* Royal Blue */
            #06b6d4 80%,  /* Neon Cyan */
            #facc15 100%  /* Back to Gold */
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: gradient-flow 4s linear infinite;
        }
      `}</style>

      <div 
        className={`text-center transition-all duration-2000 ease-out transform ${
          visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
        }`}
      >
        <div className="relative">
          {/* Glow effect - adjusted to be a mix of purple/red/blue to match new colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-blue-900/50 blur-[70px] rounded-full"></div>
          
          <h1 className="font-calligraphy text-7xl md:text-9xl animate-gradient-text drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] leading-tight py-4">
            赵嫃
          </h1>
          
          <div className="h-2 md:h-4"></div> {/* Spacer */}
          
          <h2 className="font-calligraphy text-5xl md:text-7xl animate-gradient-text drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] tracking-widest">
            新年快乐！
          </h2>

          <div className="mt-4 md:mt-6">
            <p className="font-calligraphy text-3xl md:text-5xl animate-gradient-text drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-wider opacity-90">
               有你真好
            </p>
          </div>
          
          <div className="mt-8 md:mt-12 flex justify-center gap-4">
             <div className="h-[2px] w-12 md:w-24 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
          </div>
          
          <p className="mt-6 text-white/60 text-lg md:text-xl font-light tracking-widest uppercase">
            Happy New Year
          </p>
        </div>
      </div>
    </div>
  );
};

export default GreetingCard;