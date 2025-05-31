import React from 'react';
import { Search, Github } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Search size={24} className="mr-2" />
          <h1 className="text-xl font-bold">CurioScope</h1>
        </div>
        
        <a 
          href="https://github.com/your-username/curioscope" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center text-white hover:text-blue-200 transition-colors"
        >
          <Github size={20} className="mr-1" />
          <span className="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </header>
  );
};

export default Header;