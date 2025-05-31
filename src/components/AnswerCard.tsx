import React from 'react';
import { MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Citation from './Citation';
import { Citation as CitationType } from '../types';

interface AnswerCardProps {
  question: string;
  answer: string;
  citations: CitationType[];
  timestamp: string;
  onFollowUp: () => void;
  isFollowUp?: boolean;
}

const AnswerCard: React.FC<AnswerCardProps> = ({
  question,
  answer,
  citations,
  timestamp,
  onFollowUp,
  isFollowUp = false,
}) => {
  return (
    <div className={`w-full bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg mb-4 ${isFollowUp ? 'ml-6 border-l-4 border-blue-500' : ''}`}>
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-medium text-gray-800">{question}</h3>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(timestamp).toLocaleString()}
        </p>
      </div>
      
      <div className="p-4">
        <ReactMarkdown
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  style={nord}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-gray-100 px-1 py-0.5 rounded" {...props}>
                  {children}
                </code>
              );
            }
          }}
          className="prose prose-sm max-w-none text-gray-700"
        >
          {answer}
        </ReactMarkdown>
      </div>
      
      {citations.length > 0 && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-600 mb-1">Sources:</p>
          <div className="flex flex-wrap">
            {citations.map((citation, index) => (
              <Citation key={index} citation={citation} index={index} />
            ))}
          </div>
        </div>
      )}
      
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
        <button
          onClick={onFollowUp}
          className="text-sm flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <MessageSquare size={14} className="mr-1" />
          Ask follow-up
        </button>
      </div>
    </div>
  );
};

export default AnswerCard;