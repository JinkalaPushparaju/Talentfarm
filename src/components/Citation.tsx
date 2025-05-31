import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Citation as CitationType } from '../types';

interface CitationProps {
  citation: CitationType;
  index: number;
}

const Citation: React.FC<CitationProps> = ({ citation, index }) => {
  return (
    <a
      href={citation.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors mr-2 mb-1"
    >
      <span className="mr-1">[{index + 1}]</span>
      <ExternalLink size={12} className="inline ml-1" />
    </a>
  );
};

export default Citation;