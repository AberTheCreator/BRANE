import React from 'react';
import { Brain, Database, BarChart3, Zap, Shield } from 'lucide-react';

const HeroSection = ({ setShowChatbot, setShowRequestForm }) => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto text-center pt-16">
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto mb-8 relative">

            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 via-blue-500 to-pink-500 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center">
              <Brain className="w-16 h-16 text-purple-400" />
            </div>
            
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '0s'}}>
              <Database className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '0.5s'}}>
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '1s'}}>
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-400 to-green-500 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '1.5s'}}>
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="text-white">Brane: The </span>
          <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-pink-500 bg-clip-text text-transparent">AI Brain</span>
          <span className="text-white"> for Next-Gen Data Intelligence</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
          Redefine analytics with causal insights, multimodal data, and autonomous intelligence.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={() => setShowChatbot(true)}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Try Brane
          </button>
          <button
            onClick={() => setShowRequestForm(true)}
            className="border border-gray-600 hover:border-purple-400 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-purple-500/10"
          >
            Request Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;