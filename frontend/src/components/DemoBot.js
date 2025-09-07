import React from 'react';

const DemoBot = ({ setShowChatbot }) => {
  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Experience the power of data intelligence. Test all features below!
          </h2>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-4 rounded-lg border border-purple-500/30">
              <h3 className="text-white font-semibold mb-2">Real-time Chat Interface</h3>
              <p className="text-gray-400 text-sm">Searches data to answer user questions</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-green-500/10 p-4 rounded-lg border border-blue-500/30">
              <h3 className="text-white font-semibold mb-2">Advanced Search</h3>
              <p className="text-gray-400 text-sm">Autocomplete and filtering capabilities</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-yellow-500/10 p-4 rounded-lg border border-green-500/30">
              <h3 className="text-white font-semibold mb-2">Real-time Metrics</h3>
              <p className="text-gray-400 text-sm">Live data visualization and analytics</p>
            </div>
            <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 p-4 rounded-lg border border-pink-500/30">
              <h3 className="text-white font-semibold mb-2">Complex Data Profiles</h3>
              <p className="text-gray-400 text-sm">Comprehensive data analysis and insights</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowChatbot(true)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Try Interactive Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoBot;