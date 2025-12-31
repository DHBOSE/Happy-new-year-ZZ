import React, { useState } from 'react';
import FireworksDisplay from './components/FireworksDisplay';
import GreetingCard from './components/GreetingCard';
import { Volume2, VolumeX } from 'lucide-react';

const App: React.FC = () => {
  const [muted, setMuted] = useState(true);

  // Note: Actual sound implementation would require audio files. 
  // Since we cannot load external assets reliably without URLs, we keep the UI but visual only for this demo.
  // In a real app, we would play a firework sound loop here.

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background Gradient for subtle depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0510] to-[#1a0b10] opacity-80 z-0 pointer-events-none"></div>

      {/* The Firework Engine */}
      <FireworksDisplay />

      {/* The Content Layer */}
      <GreetingCard />

      {/* Control Layer (Optional Interactions) */}
      <div className="absolute bottom-6 right-6 z-20 flex gap-2">
         {/* Sound toggle placeholder - purely visual in this restricted env */}
         <button 
           onClick={() => setMuted(!muted)}
           className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:bg-white/20 transition-all hover:scale-105 active:scale-95 hidden" // Hidden for now as we don't have audio assets
         >
            {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
         </button>
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center z-20">
        <p className="text-white/20 text-xs font-light">Created for a special celebration</p>
      </div>
    </div>
  );
};

export default App;
