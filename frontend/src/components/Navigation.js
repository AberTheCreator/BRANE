import React from 'react';
import { Brain } from 'lucide-react';

const Navigation = ({ setShowChatbot, setShowRequestForm }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Brain className="w-8 h-8 text-purple-400" />
            <span className="ml-2 text-xl font-bold text-white">Brane</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
            <a href="#demo" className="text-gray-300 hover:text-white transition-colors">Demo</a>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowRequestForm(true)}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Request Demo
            </button>
            <button
              onClick={() => setShowChatbot(true)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg transition-all"
            >
              Try Brane
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;