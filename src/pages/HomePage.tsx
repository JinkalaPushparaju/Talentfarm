import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Newspaper, Image, Link as LinkIcon, Shield, TrendingUp, History } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Detect Fake News with Advanced AI
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Our cutting-edge AI system verifies the authenticity of news articles, 
                URLs, and images to help you navigate the complex information landscape.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/detect" className="btn bg-white text-primary-600 hover:bg-gray-100">
                  Start Verifying
                </Link>
                <a href="#how-it-works" className="btn border border-white/30 hover:bg-white/10">
                  Learn How It Works
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-64 h-64 bg-white/10 rounded-xl"></div>
                <div className="relative z-10 bg-white rounded-xl shadow-2xl p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-3 h-3 bg-error-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-warning-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="flex items-center text-gray-600 mb-2">
                        <AlertTriangle className="h-5 w-5 text-error-500 mr-2" />
                        <span className="text-sm font-medium">Likely Fake News</span>
                      </div>
                      <p className="text-gray-900">
                        "Scientists discover that drinking coffee turns your blood into gold"
                      </p>
                      <div className="mt-2 flex items-center">
                        <div className="h-2 rounded-full bg-gray-200 w-full">
                          <div className="h-2 rounded-full bg-error-500 w-9/12"></div>
                        </div>
                        <span className="ml-2 text-sm text-error-600 font-medium">92%</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="flex items-center text-gray-600 mb-2">
                        <CheckCircle className="h-5 w-5 text-success-500 mr-2" />
                        <span className="text-sm font-medium">Likely Real News</span>
                      </div>
                      <p className="text-gray-900">
                        "New study shows benefits of regular exercise for heart health"
                      </p>
                      <div className="mt-2 flex items-center">
                        <div className="h-2 rounded-full bg-gray-200 w-full">
                          <div className="h-2 rounded-full bg-success-500 w-10/12"></div>
                        </div>
                        <span className="ml-2 text-sm text-success-600 font-medium">95%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Multi-Input Detection System</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Verify news in multiple formats using our advanced detection tools
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div 
              className="card card-hover"
              variants={fadeInUp}
            >
              <div className="bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Newspaper className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Text Analysis</h3>
              <p className="text-gray-600 mb-4">
                Enter news headlines or paragraphs to analyze using our advanced language models.
              </p>
              <Link to="/detect" className="text-primary-600 font-medium inline-flex items-center">
                Analyze text
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </motion.div>
            
            <motion.div 
              className="card card-hover"
              variants={fadeInUp}
            >
              <div className="bg-secondary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <LinkIcon className="h-7 w-7 text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">URL Verification</h3>
              <p className="text-gray-600 mb-4">
                Paste a link to a news article and our system will scrape and analyze its content.
              </p>
              <Link to="/detect" className="text-secondary-600 font-medium inline-flex items-center">
                Verify URL
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </motion.div>
            
            <motion.div 
              className="card card-hover"
              variants={fadeInUp}
            >
              <div className="bg-warning-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Image className="h-7 w-7 text-warning-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Image Detection</h3>
              <p className="text-gray-600 mb-4">
                Upload images or screenshots to extract and analyze text or detect manipulation.
              </p>
              <Link to="/detect" className="text-warning-600 font-medium inline-flex items-center">
                Analyze image
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50" id="how-it-works">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our system uses advanced AI and machine learning to detect fake news
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
              
              {/* Steps */}
              <div className="space-y-12">
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="flex-1 md:pr-12 mb-4 md:mb-0 md:text-right">
                      <h3 className="text-xl font-bold mb-2">Input Selection</h3>
                      <p className="text-gray-600">
                        Choose between text, URL, or image upload to begin the verification process.
                      </p>
                    </div>
                    <div className="z-10 flex items-center justify-center w-12 h-12 bg-primary-500 rounded-full text-white">
                      1
                    </div>
                    <div className="flex-1 md:pl-12 md:mt-0 mt-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex space-x-3">
                          <div className="p-2 bg-primary-100 rounded-lg">
                            <Newspaper className="h-5 w-5 text-primary-600" />
                          </div>
                          <div className="p-2 bg-secondary-100 rounded-lg">
                            <LinkIcon className="h-5 w-5 text-secondary-600" />
                          </div>
                          <div className="p-2 bg-warning-100 rounded-lg">
                            <Image className="h-5 w-5 text-warning-600" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="flex-1 md:pr-12 mb-4 md:mb-0 order-1 md:order-1 md:text-right">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Shield className="h-8 w-8 text-gray-400" />
                        </div>
                      </div>
                    </div>
                    <div className="z-10 flex items-center justify-center w-12 h-12 bg-primary-500 rounded-full text-white order-2 md:order-2">
                      2
                    </div>
                    <div className="flex-1 md:pl-12 md:mt-0 mt-4 order-3 md:order-3">
                      <h3 className="text-xl font-bold mb-2">AI Processing</h3>
                      <p className="text-gray-600">
                        Our machine learning models analyze content for patterns indicative of misinformation.
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="flex-1 md:pr-12 mb-4 md:mb-0 md:text-right">
                      <h3 className="text-xl font-bold mb-2">Result Analysis</h3>
                      <p className="text-gray-600">
                        Get detailed results with confidence scores and supporting evidence.
                      </p>
                    </div>
                    <div className="z-10 flex items-center justify-center w-12 h-12 bg-primary-500 rounded-full text-white">
                      3
                    </div>
                    <div className="flex-1 md:pl-12 md:mt-0 mt-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center mb-2">
                          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-error-500 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                          <span className="ml-2 font-medium text-error-600">78%</span>
                        </div>
                        <p className="text-sm text-gray-500">Likely fake based on sensationalist language and lack of sources</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Additional Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive suite of tools to combat misinformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="card card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Shield className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Source Credibility</h3>
              <p className="text-gray-600">
                Check the reputation and reliability of news sources with our database of credible outlets.
              </p>
            </motion.div>
            
            <motion.div 
              className="card card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <TrendingUp className="h-8 w-8 text-secondary-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Trending Fake News</h3>
              <p className="text-gray-600">
                Stay updated on current misinformation trends and popular fake news being circulated.
              </p>
            </motion.div>
            
            <motion.div 
              className="card card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <History className="h-8 w-8 text-warning-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">History Tracking</h3>
              <p className="text-gray-600">
                Keep a record of your verification history for research and reference purposes.
              </p>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/detect" className="btn btn-primary">
              Try It Now
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Combat Misinformation?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our platform to verify news and stop the spread of misinformation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/detect" className="btn bg-white text-primary-600 hover:bg-gray-100">
              Start Verifying
            </Link>
            <Link to="/register" className="btn border border-white text-white hover:bg-white/10">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;