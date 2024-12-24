// src/components/ForestryMLApp.tsx
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Brain, TreePine, Trees, Maximize2, Layers, BookOpen, GraduationCap, Check, ScrollText, ArrowUpRight, Users, MessageSquare, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import DecisionTreeAnalysis from './algorithms/DecisionTree/DecisionTreeAnalysis';
import RandomForestAnalysis from './algorithms/RandomForest/RandomForestAnalysis';
import SVMAnalysis from './algorithms/SVM/SVMAnalysis';
import KNNAnalysis from './algorithms/KNN/KNNAnalysis';
import NeuralNetworkAnalysis from './algorithms/NeuralNetwork/NeuralNetworkAnalysis';
import GradientBoostingAnalysis from './algorithms/GradientBoosting/GradientBoostingAnalysis';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import LearnMorePage from './LearnMore/LearnMorePage';

export const ForestryMLApp = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for Overview visualizations
  const sampleGrowthData = [
    { month: 'Jan', actual: 4.0, predicted: 4.2 },
    { month: 'Feb', actual: 4.3, predicted: 4.4 },
    { month: 'Mar', actual: 4.5, predicted: 4.6 },
    { month: 'Apr', actual: 4.8, predicted: 4.9 },
    { month: 'May', actual: 5.2, predicted: 5.1 },
    { month: 'Jun', actual: 5.5, predicted: 5.4 }
  ];

  // Inside the ForestryMLApp component, add KNN to the algorithm options
  const algorithmOptions = [
    // ... existing options
    { value: "knn", label: "K-Nearest Neighbors" },
  ];

  // In the renderAlgorithmComponent function, add the KNN case
  const renderAlgorithmComponent = () => {
    switch (selectedAlgorithm) {
      // ... existing cases
      case "knn":
        return <KNNAnalysis data={data} onAnalysisComplete={handleAnalysisComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Navigation */}
      <nav className="bg-green-800 text-white p-4 rounded-lg mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              activeTab === 'overview' ? 'bg-green-700' : 'hover:bg-green-700'
            }`}
          >
            <Brain size={20} />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('decision-trees')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              activeTab === 'decision-trees' ? 'bg-green-700' : 'hover:bg-green-700'
            }`}
          >
            <TreePine size={20} />
            <span>Decision Trees</span>
          </button>

          <button
            onClick={() => setActiveTab('random-forest')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              activeTab === 'random-forest' ? 'bg-green-700' : 'hover:bg-green-700'
            }`}
          >
            <Trees size={20} />
            <span>Random Forest</span>
          </button>

          <button
            onClick={() => setActiveTab('svm')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              activeTab === 'svm' ? 'bg-green-700' : 'hover:bg-green-700'
            }`}
          >
            <Maximize2 size={20} />
            <span>SVM</span>
          </button>

          <button
            onClick={() => setActiveTab('knn')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              activeTab === 'knn' ? 'bg-green-700' : 'hover:bg-green-700'
            }`}
          >
            <Brain size={20} />
            <span>K-Nearest Neighbors</span>
          </button>

          <button
            onClick={() => setActiveTab('neural-network')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              activeTab === 'neural-network' ? 'bg-green-700' : 'hover:bg-green-700'
            }`}
          >
            <Brain size={20} />
            <span>Neural Network</span>
          </button>

          <button
            onClick={() => setActiveTab('gradient-boosting')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              activeTab === 'gradient-boosting' ? 'bg-green-700' : 'hover:bg-green-700'
            }`}
          >
            <Layers size={20} />
            <span>Gradient Boosting</span>
          </button>

          <button
            onClick={() => setActiveTab('learn-more')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
              activeTab === 'learn-more' ? 'bg-green-700' : 'hover:bg-green-700'
            }`}
          >
            <BookOpen size={20} />
            <span>Learn More</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Machine Learning in Forestry</h2>
            <div className="prose max-w-none">
              <div className="text-gray-700 mb-6 space-y-4">
                <p>
                  This platform demonstrates the application of machine learning techniques in forestry management,
                  focusing on practical implementations using various algorithms like Decision Trees, Random Forests, and SVMs.
                </p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">Key Data Sources in Forestry ML:</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><span className="font-medium">Remote Sensing Data:</span> Includes satellite imagery (Landsat, Sentinel-2) and LiDAR data for 3D forest structure analysis</li>
                    <li><span className="font-medium">Ground-Truth Data:</span> Field measurements including DBH, tree height, and species identification</li>
                    <li><span className="font-medium">Environmental Parameters:</span> Soil data, climate information, and topographical features</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">Common Applications:</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><span className="font-medium">Species Classification:</span> Identifying different tree species from remote sensing data</li>
                    <li><span className="font-medium">Biomass Estimation:</span> Predicting organic matter in forest stands</li>
                    <li><span className="font-medium">Disease Detection:</span> Monitoring forest health and identifying issues</li>
                    <li><span className="font-medium">Fire Risk Prediction:</span> Assessing likelihood of wildfires</li>
                    <li><span className="font-medium">Deforestation Tracking:</span> Monitoring changes in forest cover over time</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Growth Prediction Example</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={sampleGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="actual" stroke="#2E7D32" name="Actual Growth" />
                      <Line type="monotone" dataKey="predicted" stroke="#1565C0" name="Predicted Growth" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">Key Performance Metrics</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-lg font-medium">Model Accuracy</p>
                      <p className="text-3xl font-bold text-green-600">94%</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-lg font-medium">Predictions Made</p>
                      <p className="text-3xl font-bold text-blue-600">1,234</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-green-600" />
                    Learn More
                  </h3>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Educational Resources */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <GraduationCap className="h-8 w-8 text-green-600" />
                        <h4 className="text-lg font-semibold text-green-800">Educational Resources</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                          <span>Interactive tutorials on each ML algorithm</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                          <span>Real-world forestry case studies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                          <span>Step-by-step implementation guides</span>
                        </li>
                      </ul>
                    </motion.div>

                    {/* Research Papers */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <ScrollText className="h-8 w-8 text-blue-600" />
                        <h4 className="text-lg font-semibold text-blue-800">Research Papers</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                          <ArrowUpRight className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                          <span>Latest ML applications in forestry</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowUpRight className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                          <span>Comparative algorithm studies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowUpRight className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                          <span>Environmental impact assessments</span>
                        </li>
                      </ul>
                    </motion.div>

                    {/* Community & Support */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Users className="h-8 w-8 text-purple-600" />
                        <h4 className="text-lg font-semibold text-purple-800">Community & Support</h4>
                      </div>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                          <MessageSquare className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                          <span>Expert forum discussions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <MessageSquare className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                          <span>Monthly webinars</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <MessageSquare className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                          <span>Implementation support</span>
                        </li>
                      </ul>
                    </motion.div>
                  </div>

                  {/* Additional Resources Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 text-center"
                  >
                    <Button
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg transition-all duration-200"
                      onClick={() => setActiveTab('learn-more')}
                    >
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-5 w-5" />
                        <span>Access Full Documentation</span>
                      </div>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        {activeTab === 'decision-trees' && (
          <DecisionTreeAnalysis />
        )}
        
        {activeTab === 'random-forest' && (
          <RandomForestAnalysis />
        )}

        {activeTab === 'svm' && (
          <SVMAnalysis />
        )}
        
        {activeTab === 'knn' && (
          <KNNAnalysis data={[]} onAnalysisComplete={(results) => console.log(results)} />
        )}
        
        {activeTab === 'neural-network' && (
          <NeuralNetworkAnalysis data={[]} onAnalysisComplete={(results) => console.log(results)} />
        )}

        {activeTab === 'gradient-boosting' && (
          <GradientBoostingAnalysis data={[]} onAnalysisComplete={(results) => console.log(results)} />
        )}

        {activeTab === 'learn-more' && (
          <LearnMorePage />
        )}
      </div>
    </div>
  );
};

export default ForestryMLApp;