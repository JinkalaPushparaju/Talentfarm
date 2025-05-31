import React, { useState } from 'react';
import { Search } from 'lucide-react';
// No additional imports needed
interface QuestionFormProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ 
  onSubmit, 
  isLoading, 
  placeholder = "Ask anything..." 
}) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isLoading) {
      onSubmit(question);
      setQuestion('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full flex items-center gap-2 bg-white rounded-lg shadow-md p-2 transition-all duration-300 focus-within:shadow-lg"
    >
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder={placeholder}
        disabled={isLoading}
        className="flex-1 p-2 outline-none text-gray-800"
        data-testid="question-input"
      />
      <button
        type="submit"
        disabled={isLoading || !question.trim()}
        className={`p-2 rounded-lg ${
          isLoading || !question.trim() 
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
        }`}
        data-testid="submit-button"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <Search size={20} />
        )}
      </button>
    </form>
  );
};

export default QuestionForm;