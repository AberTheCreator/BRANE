import React from 'react';
import { Brain, Database, Bot, Zap, Shield, Globe } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Causal Intelligence",
      description: "Discover true cause-and-effect relationships in your data with advanced causal inference algorithms."
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Multimodal Analysis",
      description: "Seamlessly integrate text, images, audio, and structured data for comprehensive analysis."
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "Autonomous AI Agents",
      description: "Let AI agents automatically discover insights and optimize decisions without human intervention."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Processing",
      description: "Process and analyze massive datasets in real-time with distributed computing architecture."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption and compliance-ready infrastructure."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Seamless Integration",
      description: "Connect with your existing tools through powerful APIs and pre-built integrations."
    }
  ];

  return (
    <section id="features" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Harness the power of autonomous AI to transform your data into actionable insights with unprecedented speed and accuracy.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all group">
              <div className="text-purple-400 mb-4 group-hover:text-purple-300 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;