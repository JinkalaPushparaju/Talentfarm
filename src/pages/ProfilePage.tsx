import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Clock, Download, ExternalLink, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Mock data for demonstration
const mockHistory = [
  {
    id: '893752',
    date: '2023-08-15',
    contentType: 'text',
    content: 'Breaking: Scientists discover new planet in our solar system',
    result: 'Fake',
    confidence: 89
  },
  {
    id: '742198',
    date: '2023-08-10',
    contentType: 'url',
    content: 'https://example-news.com/health-study',
    result: 'Real',
    confidence: 92
  },
  {
    id: '651248',
    date: '2023-08-05',
    contentType: 'image',
    content: 'Image of politician at controversial event',
    result: 'Fake',
    confidence: 76
  },
  {
    id: '528491',
    date: '2023-07-29',
    contentType: 'text',
    content: 'New study shows benefits of regular exercise for heart health',
    result: 'Real',
    confidence: 95
  },
  {
    id: '419875',
    date: '2023-07-22',
    contentType: 'url',
    content: 'https://example-blog.com/climate-change-discovery',
    result: 'Real',
    confidence: 87
  }
];

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="card sticky top-24">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl font-bold mb-3">
                  {user?.name.charAt(0)}
                </div>
                <h2 className="text-lg font-bold">{user?.name}</h2>
                <p className="text-gray-600 text-sm">{user?.email}</p>
              </div>
              
              <div className="space-y-2">
                <Link to="/detect" className="btn btn-primary w-full">
                  New Verification
                </Link>
                <button onClick={logout} className="btn btn-outline w-full">
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="card bg-primary-50 border border-primary-100">
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <BarChart2 className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-600 text-sm">Total Verifications</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                </div>
              </div>
              
              <div className="card bg-success-50 border border-success-100">
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <CheckCircle className="h-6 w-6 text-success-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-600 text-sm">Real News Detected</p>
                    <p className="text-2xl font-bold">9</p>
                  </div>
                </div>
              </div>
              
              <div className="card bg-error-50 border border-error-100">
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <AlertTriangle className="h-6 w-6 text-error-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-600 text-sm">Fake News Detected</p>
                    <p className="text-2xl font-bold">15</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Verification History */}
            <div className="card mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Verification History</h2>
                <div className="flex items-center text-primary-600 text-sm font-medium">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Last 30 days</span>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                      <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                      <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="py-4 text-sm text-gray-500">{item.date}</td>
                        <td className="py-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.contentType === 'text' 
                              ? 'bg-primary-100 text-primary-800' 
                              : item.contentType === 'url'
                                ? 'bg-secondary-100 text-secondary-800'
                                : 'bg-warning-100 text-warning-800'
                          }`}>
                            {item.contentType}
                          </span>
                        </td>
                        <td className="py-4 text-sm text-gray-900 max-w-xs truncate">
                          {item.content}
                        </td>
                        <td className="py-4 text-sm">
                          <span className={`flex items-center ${
                            item.result === 'Fake' ? 'text-error-600' : 'text-success-600'
                          }`}>
                            {item.result === 'Fake' 
                              ? <AlertTriangle className="h-4 w-4 mr-1" /> 
                              : <CheckCircle className="h-4 w-4 mr-1" />
                            }
                            {item.result} ({item.confidence}%)
                          </span>
                        </td>
                        <td className="py-4 text-sm">
                          <div className="flex space-x-2">
                            <Link 
                              to={`/results/${item.id}`}
                              className="text-primary-600 hover:text-primary-800"
                              title="View"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                            <button 
                              className="text-gray-600 hover:text-gray-800"
                              title="Download"
                            >
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {mockHistory.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No verification history found</p>
                </div>
              )}
            </div>
            
            {/* Settings Panel */}
            <div className="card">
              <h2 className="text-xl font-bold mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="font-medium text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive alerts about trending fake news</p>
                  </div>
                  <div className="relative">
                    <input type="checkbox" id="toggle-email" className="sr-only" defaultChecked />
                    <div className="block bg-gray-300 w-14 h-8 rounded-full"></div>
                    <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform translate-x-6"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <button className="text-sm text-primary-600 font-medium">
                    Enable
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Delete Account</h3>
                    <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                  </div>
                  <button className="text-sm text-error-600 font-medium">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;