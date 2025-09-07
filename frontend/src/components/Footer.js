import React from 'react';
import { Brain, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Brain className="w-8 h-8 text-purple-400" />
              <span className="ml-2 text-xl font-bold text-white">Brane</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The AI brain for next-generation data intelligence. Transform your data into actionable insights with autonomous AI.
            </p>
            
            
            <div className="flex space-x-4 mt-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:contact@brane.ai" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#demo" className="text-gray-400 hover:text-white transition-colors">Demo</a></li>
              <li><button className="text-gray-400 hover:text-white transition-colors text-left">Pricing</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors text-left">API Docs</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors text-left">Integrations</button></li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-white font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li><button className="text-gray-400 hover:text-white transition-colors text-left">Enterprise Analytics</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors text-left">Real-time Insights</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors text-left">Causal Analysis</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors text-left">Data Intelligence</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors text-left">AI Automation</button></li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><button className="text-gray-400 hover:text-white transition-colors text-left">About Us</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors text-left">Blog</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors text-left">Careers</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors text-left">Contact</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors text-left">Privacy</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {currentYear} Brane AI. Built for Sensay Hackathon. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-4 text-sm">
                <button className="text-gray-400 hover:text-white transition-colors">Terms of Service</button>
                <button className="text-gray-400 hover:text-white transition-colors">Privacy Policy</button>
                <button className="text-gray-400 hover:text-white transition-colors">Security</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;