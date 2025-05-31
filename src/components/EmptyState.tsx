import React from 'react';
import { Search, HelpCircle } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-6 p-4 bg-blue-100 rounded-full">
        <Search size={32} className="text-blue-600" />
      </div>
      
      <h2 className="text-xl font-medium text-gray-800 mb-2">
        Ask Anything
      </h2>
      
      <p className="text-gray-600 max-w-md mb-6">
        Get instant answers to your questions with citations from reliable sources powered by Perplexity's Sonar API.
      </p>
      
      <div className="bg-white p-4 rounded-lg shadow-md max-w-md w-full mb-4">
        <div className="flex items-start mb-2">
          <HelpCircle size={16} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
          <p className="text-gray-700 text-sm text-left">
            "What are the most effective strategies for climate change mitigation?"
          </p>
        </div>
        
        <div className="flex items-start mb-2">
          <HelpCircle size={16} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
          <p className="text-gray-700 text-sm text-left">
            "Explain quantum computing in simple terms"
          </p>
        </div>
        
        <div className="flex items-start">
          <HelpCircle size={16} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
          <p className="text-gray-700 text-sm text-left">
            "What are the latest advancements in artificial intelligence?"
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;