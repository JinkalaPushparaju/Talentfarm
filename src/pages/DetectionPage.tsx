import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Newspaper, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import TextInputSection from '../components/detection/TextInputSection';
import { toast } from 'react-toastify';

const DetectionPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    label: string;
    confidence: number;
    text_length: number;
    processed_at: string;
  } | null>(null);
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (data: { text: string }) => {
    setIsLoading(true);
    setResult(null);
    setInputText(data.text);
    
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: data.text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze content');
      }

      const result = await response.json();
      setResult(result);
      
      // Show success toast
      toast.success('Analysis completed successfully!');
      
    } catch (error: any) {
      console.error('Error analyzing content:', error);
      toast.error(error.message || 'Failed to analyze content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setInputText('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-3 rounded-full">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Verify News Content
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Paste your news article or headline below and our AI will analyze it for authenticity
          </p>
        </motion.div>

        {/* Input Section */}
        {!result && (
          <motion.div
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <Newspaper className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Text Analysis</h2>
            </div>
            <TextInputSection onSubmit={handleSubmit} isLoading={isLoading} />
          </motion.div>
        )}

        {/* Results Section */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Main Result Card */}
            <div className={`bg-white rounded-xl shadow-lg p-8 border-l-4 ${
              result.label === 'Real' 
                ? 'border-green-500' 
                : 'border-red-500'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  {result.label === 'Real' ? (
                    <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                  ) : (
                    <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
                  )}
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {result.label === 'Real' ? 'Likely Real News' : 'Likely Fake News'}
                    </h2>
                    <p className="text-gray-600">
                      Analysis completed on {new Date(result.processed_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-4xl font-bold ${
                    result.label === 'Real' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {result.confidence}%
                  </div>
                  <p className="text-gray-600">Confidence</p>
                </div>
              </div>

              {/* Confidence Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Confidence Level</span>
                  <span>{result.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      result.label === 'Real' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${result.confidence}%` }}
                  ></div>
                </div>
              </div>

              {/* Analysis Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Analysis Details</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>Text Length:</span>
                      <span>{result.text_length} characters</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Algorithm:</span>
                      <span>PassiveAggressiveClassifier</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Features:</span>
                      <span>TF-IDF Vectorization</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {result.label === 'Real' ? 'Why This Appears Real' : 'Why This Appears Fake'}
                  </h3>
                  <div className="text-gray-600 text-sm">
                    {result.label === 'Real' ? (
                      <ul className="space-y-1">
                        <li>• Balanced and factual language</li>
                        <li>• Consistent with real news patterns</li>
                        <li>• Lacks sensationalist indicators</li>
                        <li>• Follows journalistic standards</li>
                      </ul>
                    ) : (
                      <ul className="space-y-1">
                        <li>• Contains sensationalist language</li>
                        <li>• Matches fake news patterns</li>
                        <li>• May lack credible sources</li>
                        <li>• Uses emotional manipulation</li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Original Text Display */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Analyzed Text</h3>
              <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                <p className="text-gray-700 whitespace-pre-wrap">{inputText}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Analyze Another Article
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </motion.div>
        )}

        {/* Info Section */}
        {!result && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Shield className="h-6 w-6 text-blue-600 mr-2" />
              How Our Detection Works
            </h3>
            
            <div className="space-y-4">
              <p className="text-gray-700">
                Our AI system uses advanced machine learning to analyze news content for authenticity:
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
                <li><strong>Text Preprocessing:</strong> Cleans and normalizes the input text</li>
                <li><strong>Feature Extraction:</strong> Uses TF-IDF to identify important patterns</li>
                <li><strong>Pattern Recognition:</strong> Compares against known fake news characteristics</li>
                <li><strong>Confidence Scoring:</strong> Provides percentage certainty of classification</li>
              </ul>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <div className="text-blue-600 mr-2">💡</div>
                <div>
                  <p className="text-blue-800 font-medium">Tips for Best Results:</p>
                  <ul className="text-blue-700 text-sm mt-1 space-y-1">
                    <li>• Include the full headline or first few paragraphs</li>
                    <li>• Provide original content without modifications</li>
                    <li>• Longer text generally provides more accurate results</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetectionPage;