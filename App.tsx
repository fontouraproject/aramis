
import React, { useState } from 'react';
import { TryOnFlow } from './components/TryOnFlow';
import { LogoIcon } from './components/Icons';
import { FeedbackModal } from './components/FeedbackModal';

const App: React.FC = () => {
  const [tryOnKey, setTryOnKey] = useState(0);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const handleResetFlow = () => {
    setTryOnKey(prevKey => prevKey + 1);
  };

  return (
    <div className="bg-[#E8E8E8] min-h-screen text-black antialiased">
      <header className="bg-black text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <LogoIcon />
          <h1 className="text-xl font-semibold font-poppins">Inteligência Aramis</h1>
        </div>
        <nav className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={handleResetFlow} 
            className={`px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base rounded-lg font-montserrat transition-colors duration-200 bg-white text-black`}
          >
            Início
          </button>
          <button 
            onClick={() => setIsFeedbackModalOpen(true)}
            className={`px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base rounded-lg font-montserrat transition-colors duration-200 bg-black text-gray-300 hover:bg-gray-700`}
          >
            Feedback
          </button>
        </nav>
      </header>

      <main>
        <TryOnFlow key={tryOnKey} />
        {isFeedbackModalOpen && <FeedbackModal onClose={() => setIsFeedbackModalOpen(false)} />}
      </main>

      <footer className="text-center p-4 text-gray-500 text-sm bg-[#E8E8E8]">
        <p>Powered by Natanael Fontoura · IA Aramis</p>
      </footer>
    </div>
  );
}

export default App;
