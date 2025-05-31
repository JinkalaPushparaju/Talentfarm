import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Newspaper, Link as LinkIcon, Image, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import TextInputSection from '../components/detection/TextInputSection';
import UrlInputSection from '../components/detection/UrlInputSection';
import ImageInputSection from '../components/detection/ImageInputSection';

type DetectionMethod = 'text' | 'url' | 'image';

const DetectionPage: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState<DetectionMethod>('text');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock result ID
      const resultId = Math.floor(Math.random() * 1000000);
      setIsLoading(false);
      navigate(`/results/${resultId}`);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Verify News Content</h1>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Select your preferred method to check if news content is real or fake
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {/* Method Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveMethod('text')}
            className={`flex items-center px-6 py-3 rounded-lg transition-all ${
              activeMethod === 'text'
                ? 'bg-primary-100 text-primary-700 font-medium'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Newspaper className="h-5 w-5 mr-2" />
            <span>Text</span>
          </button>
          <button
            onClick={() => setActiveMethod('url')}
            className={`flex items-center px-6 py-3 rounded-lg transition-all ${
              activeMethod === 'url'
                ? 'bg-secondary-100 text-secondary-700 font-medium'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <LinkIcon className="h-5 w-5 mr-2" />
            <span>URL</span>
          </button>
          <button
            onClick={() => setActiveMethod('image')}
            className={`flex items-center px-6 py-3 rounded-lg transition-all ${
              activeMethod === 'image'
                ? 'bg-warning-100 text-warning-700 font-medium'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Image className="h-5 w-5 mr-2" />
            <span>Image</span>
          </button>
        </div>

        {/* Input Section */}
        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {activeMethod === 'text' && (
            <TextInputSection onSubmit={handleSubmit} isLoading={isLoading} />
          )}
          {activeMethod === 'url' && (
            <UrlInputSection onSubmit={handleSubmit} isLoading={isLoading} />
          )}
          {activeMethod === 'image' && (
            <ImageInputSection onSubmit={handleSubmit} isLoading={isLoading} />
          )}
        </motion.div>

        {/* Info Section */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">How {activeMethod === 'text' ? 'Text' : activeMethod === 'url' ? 'URL' : 'Image'} Detection Works</h3>
          
          {activeMethod === 'text' && (
            <div className="space-y-4">
              <p className="text-gray-700">
                Our text detection system uses advanced natural language processing and machine learning algorithms to analyze news content for:
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
                <li>Sensationalist language and clickbait patterns</li>
                <li>Emotional manipulation techniques</li>
                <li>Consistency and logical coherence</li>
                <li>Comparison with known fake news patterns</li>
              </ul>
            </div>
          )}
          
          {activeMethod === 'url' && (
            <div className="space-y-4">
              <p className="text-gray-700">
                Our URL verification system:
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
                <li>Safely scrapes content from the provided URL</li>
                <li>Checks against databases of known fake news sources</li>
                <li>Analyzes domain reputation and history</li>
                <li>Cross-references with fact-checking websites</li>
              </ul>
            </div>
          )}
          
          {activeMethod === 'image' && (
            <div className="space-y-4">
              <p className="text-gray-700">
                Our image detection system:
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-4 space-y-2">
                <li>Extracts text from images using OCR technology</li>
                <li>Analyzes visual content for manipulation signs</li>
                <li>Detects deepfakes using AI pattern recognition</li>
                <li>Performs reverse image searches for origin verification</li>
              </ul>
            </div>
          )}
          
          <div className="mt-6 text-gray-600 flex items-center">
            <span className="mr-2">💡</span>
            <span>For best results, provide as much context as possible.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetectionPage;