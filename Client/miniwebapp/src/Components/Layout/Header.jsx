import React from 'react';
import { Github } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
            <Github className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">RepoFinder</h1>
            <p className="text-gray-400 text-sm">Discover amazing repositories</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
