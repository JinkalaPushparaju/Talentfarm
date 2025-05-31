import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, AlertTriangle, DownloadCloud, ThumbsUp, ThumbsDown, Share2, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock result data (in a real app, this would come from an API)
const mockResults = {
  text: {
    content: "Scientists discover that drinking coffee turns your blood into gold",
    isFake: true,
    confidence: 92,
    category: "Misleading Claim",
    analysis: [
      { keyword: "Scientifically impossible", score: 0.85 },
      { keyword: "No credible sources", score: 0.78 },
      { keyword: "Sensationalist language", score: 0.67 },
    ],
    explanation: "This claim contradicts basic biology and chemistry. Human blood cannot be transformed into metal by consuming any substance. The headline uses sensationalist language common in fake news articles.",
    source: "Unknown Source"
  },
  url: {
    content: "https://example-news.com/breaking-medical-discovery",
    isFake: false,
    confidence: 83,
    category: "Legitimate News",
    analysis: [
      { keyword: "Reputable source", score: 0.89 },
      { keyword: "Expert quotes", score: 0.76 },
      { keyword: "References research", score: 0.82 },
    ],
    explanation: "The article cites peer-reviewed research published in a respected medical journal and quotes experts in the field. The source has a good historical accuracy rating.",
    source: "example-news.com (Credibility Score: 85/100)"
  },
  image: {
    content: "/path/to/mocked/image.jpg",
    isFake: true,
    confidence: 77,
    category: "Manipulated Image",
    analysis: [
      { keyword: "Image manipulation", score: 0.81 },
      { keyword: "Inconsistent shadows", score: 0.65 },
      { keyword: "Metadata mismatch", score: 0.72 },
    ],
    explanation: "This image shows evidence of digital manipulation. Analysis reveals inconsistent shadows and lighting, as well as metadata that doesn't match the purported origin date.",
    source: "Image shared on social media"
  }
};

const ResultsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<any>(null);
  const [voted, setVoted] = useState<'up' | 'down' | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      // Select a random result type for demonstration
      const resultTypes = ['text', 'url', 'image'];
      const randomType = resultTypes[Math.floor(Math.random() * resultTypes.length)];
      setResult(mockResults[randomType as keyof typeof mockResults]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-primary-600 mb-4"></div>
          <p className="text-gray-600">Analyzing results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-3xl font-bold">Verification Results</h1>
            <Link to="/detect" className="btn btn-outline text-sm">
              Run Another Check
            </Link>
          </div>

          {/* Result Card */}
          <div className="card mb-8">
            <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-gray-200 pb-6 mb-6">
              <div>
                <div className="flex items-center mb-2">
                  {result.isFake ? (
                    <div className="flex items-center text-error-600 bg-error-100 px-3 py-1 rounded-full">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      <span className="font-medium">Likely Fake</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-success-600 bg-success-100 px-3 py-1 rounded-full">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="font-medium">Likely Real</span>
                    </div>
                  )}
                  <div className="ml-3 text-gray-500 text-sm">
                    Result ID: #{id}
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{result.category}</h2>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center bg-gray-100 rounded-full p-1">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    result.confidence >= 80 ? 'bg-error-500 text-white' : 
                    result.confidence >= 60 ? 'bg-warning-500 text-white' : 
                    'bg-success-500 text-white'
                  }`}>
                    {result.confidence}%
                  </div>
                  <span className="ml-2 mr-3 text-gray-600 text-sm font-medium">Confidence</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Content Analyzed</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  {result.content}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Source Information</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p>{result.source}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Analysis Results</h3>
                <div className="space-y-4">
                  {result.analysis.map((item: any, index: number) => (
                    <div key={index} className="flex items-center">
                      <div className="w-full mr-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{item.keyword}</span>
                          <span className="text-sm text-gray-600">{Math.round(item.score * 100)}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              result.isFake ? 'bg-error-500' : 'bg-success-500'
                            }`}
                            style={{ width: `${item.score * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Explanation</h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">{result.explanation}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Actions Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Leave Feedback</h3>
              <p className="text-gray-600 mb-4">Was this classification accurate and helpful?</p>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => setVoted('up')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    voted === 'up' 
                      ? 'bg-success-100 border-success-300 text-success-700' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <ThumbsUp className="h-5 w-5" />
                  <span>Helpful</span>
                </button>
                
                <button 
                  onClick={() => setVoted('down')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    voted === 'down' 
                      ? 'bg-error-100 border-error-300 text-error-700' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <ThumbsDown className="h-5 w-5" />
                  <span>Not Helpful</span>
                </button>
              </div>
              
              {voted && (
                <p className="mt-4 text-sm text-gray-600">
                  Thanks for your feedback! We'll use it to improve our system.
                </p>
              )}
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Download & Share</h3>
              
              <div className="space-y-3">
                <button className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                  <DownloadCloud className="h-5 w-5 text-primary-600" />
                  <span>Download PDF Report</span>
                </button>
                
                <button className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                  <Share2 className="h-5 w-5 text-secondary-600" />
                  <span>Share Results</span>
                </button>
                
                <button className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                  <FileText className="h-5 w-5 text-warning-600" />
                  <span>Submit to Our Database</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage;