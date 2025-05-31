import React from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight, Globe } from 'lucide-react';

interface UrlInputSectionProps {
  onSubmit: (data: { url: string }) => void;
  isLoading: boolean;
}

const UrlInputSection: React.FC<UrlInputSectionProps> = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<{ url: string }>();

  const urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-1">
          Enter news article URL
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Globe className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="url-input"
            type="text"
            className={`input-field pl-10 ${errors.url ? 'border-error-500 focus:ring-error-500' : ''}`}
            placeholder="https://example.com/article"
            {...register('url', { 
              required: 'URL is required',
              pattern: {
                value: urlPattern,
                message: 'Please enter a valid URL'
              }
            })}
          />
        </div>
        {errors.url && (
          <p className="mt-1 text-sm text-error-600">{errors.url.message}</p>
        )}
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <h4 className="font-medium mb-2">Using URL verification:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Make sure the URL points directly to a news article</li>
          <li>We'll analyze both the content and the source reputation</li>
          <li>Results include source credibility and content analysis</li>
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
              <span>Processing URL...</span>
            </>
          ) : (
            <>
              <span>Verify URL</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default UrlInputSection;