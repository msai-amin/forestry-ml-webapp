// src/components/ForestryMLApp.tsx
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Brain, TreePine, Trees, Maximize2, Layers } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import DecisionTreeAnalysis from './algorithms/DecisionTree/DecisionTreeAnalysis';
import RandomForestAnalysis from './algorithms/RandomForest/RandomForestAnalysis';
import SVMAnalysis from './algorithms/SVM/SVMAnalysis';
import KNNAnalysis from './algorithms/KNN/KNNAnalysis';
import NeuralNetworkAnalysis from './algorithms/NeuralNetwork/NeuralNetworkAnalysis';
import GradientBoostingAnalysis from './algorithms/GradientBoosting/GradientBoostingAnalysis';

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
      </div>
    </div>
  );
};

export default ForestryMLApp;