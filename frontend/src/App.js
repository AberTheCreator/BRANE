import React, { useState } from 'react';

import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection'; 
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import DemoBot from './components/DemoBot';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import RequestForm from './components/RequestForm';

function App() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation 
        setShowChatbot={setShowChatbot} 
        setShowRequestForm={setShowRequestForm} 
      />
      <HeroSection 
        setShowChatbot={setShowChatbot} 
        setShowRequestForm={setShowRequestForm} 
      />
      <Features />
      <HowItWorks />
      <DemoBot setShowChatbot={setShowChatbot} />
      <Footer />
      
      {showRequestForm && (
        <RequestForm setShowRequestForm={setShowRequestForm} />
      )}
      {showChatbot && (
        <Chatbot setShowChatbot={setShowChatbot} />
      )}
    </div>
  );
}

export default App;