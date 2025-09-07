import React from 'react';
import { ArrowRight, Database, Brain, BarChart3, Zap } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Database className="w-8 h-8" />,
      title: "Connect Your Data",
      description: "Seamlessly integrate with your existing data sources, databases, and APIs. Brane automatically understands your data structure.",
      color: "from-blue-400 to-cyan-400"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Analysis",
      description: "Our advanced AI agents analyze patterns, relationships, and causality in your data using cutting-edge machine learning algorithms.",
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Generate Insights",
      description: "Get real-time insights, predictive analytics, and actionable recommendations delivered through natural language interfaces.",
      color: "from-green-400 to-blue-400"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Take Action",
      description: "Implement data-driven decisions with confidence. Monitor results and optimize continuously with autonomous AI agents.",
      color: "from-yellow-400 to-red-400"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Brane</span> Works
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From data connection to actionable insights in four simple steps
          </p>
        </div>

        <div className="relative">
          
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all group">
                 
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center font-bold text-white text-lg`}>
                    {index + 1}
                  </div>
                  
                  
                  <div className="text-center mb-4">
                    <div className={`inline-flex p-3 rounded-full bg-gradient-to-br ${step.color} bg-opacity-20`}>
                      <div className="text-white">
                        {step.icon}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 text-center">{step.title}</h3>
                  <p className="text-gray-400 text-center text-sm leading-relaxed">{step.description}</p>
                </div>

            
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 text-purple-400">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-white font-semibold mb-2">Ready to transform your data intelligence?</h3>
            <p className="text-gray-400 text-sm">
              Built with high-performance architecture for real-time analytics and autonomous insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;