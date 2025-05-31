import React from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';

interface TextInputSectionProps {
  onSubmit: (data: { text: string }) => void;
  isLoading: boolean;
}

const TextInputSection: React.FC<TextInputSectionProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<{ text: string }>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-1">
          Enter news headline or article text
        </label>
        <textarea
          id="text-input"
          rows={6}
          className={`input-field ${errors.text ? 'border-error-500 focus:ring-error-500' : ''}`}
          placeholder="Paste or type news content here..."
          {...register('text', { required: 'Text content is required' })}
        ></textarea>
        {errors.text && (
          <p className="mt-1 text-sm text-error-600">{errors.text.message}</p>
        )}
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <h4 className="font-medium mb-2">Tips for accurate results:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Include the full headline or the first few paragraphs</li>
          <li>Provide the original source if known</li>
          <li>Avoid modifying or paraphrasing the original content</li>
        </ul>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary"
        >
          {isLoading ? (
            <>
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Verify Content</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default TextInputSection;