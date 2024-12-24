import React, { useState } from 'react';
import { Maximize, Tree, Database, LineChart } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Satellite Analysis Component
const SatelliteAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState(0);

  const handleImageUpload = (e) => {
    if (!e.target.files?.length) return;
    setLoading(true);
    setTimeout(() => {
      setConfidence(Math.floor(Math.random() * 20) + 75);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Satellite Image Analysis Demo</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="satellite-upload"
          />
          <label 
            htmlFor="satellite-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <Maximize className="text-gray-400 mb-2" size={40} />
            <span className="text-sm text-gray-600">
              Upload satellite imagery for analysis
            </span>
          </label>
        </div>

        <Card>
          <CardContent className="p-4">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
              </div>
            ) : confidence > 0 && (
              <div className="space-y-4">
                <h5 className="font-medium">Analysis Results</h5>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Forest Cover Detected:</span>
                    <span className="font-semibold text-green-600">{confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full transition-all duration-500" 
                      style={{ width: `${confidence}%` }} 
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Crown Detection Component
const CrownDetection = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleImageUpload = (e) => {
    if (!e.target.files?.length) return;
    setLoading(true);
    setTimeout(() => {
      setResults({
        treeCount: Math.floor(Math.random() * 50) + 100,
        averageCrownSize: Math.floor(Math.random() * 3) + 4,
        density: Math.floor(Math.random() * 20) + 60,
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Tree Crown Detection</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="crown-upload"
          />
          <label 
            htmlFor="crown-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <Tree className="text-gray-400 mb-2" size={40} />
            <span className="text-sm text-gray-600">
              Upload aerial imagery for crown detection
            </span>
          </label>
        </div>

        <Card>
          <CardContent className="p-4">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
              </div>
            ) : results && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">Trees Detected</div>
                  <div className="text-xl font-semibold text-green-700">
                    {results.treeCount}
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">Avg Crown Size</div>
                  <div className="text-xl font-semibold text-green-700">
                    {results.averageCrownSize}m
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Density Estimation Component
const DensityEstimation = () => {
  const [loading, setLoading] = useState(false);
  const [densityData, setDensityData] = useState([]);

  const generateDensityProfile = () => {
    return Array.from({ length: 10 }, (_, i) => ({
      height: (i + 1) * 5,
      density: Math.random() * 30 + 50 - i * 3,
    }));
  };

  const handleDataUpload = (e) => {
    if (!e.target.files?.length) return;
    setLoading(true);
    setTimeout(() => {
      setDensityData(generateDensityProfile());
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Forest Density Estimation</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept=".las,.laz,.xyz"
            onChange={handleDataUpload}
            className="hidden"
            id="lidar-upload"
          />
          <label 
            htmlFor="lidar-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <Database className="text-gray-400 mb-2" size={40} />
            <span className="text-sm text-gray-600">
              Upload LiDAR data for density analysis
            </span>
          </label>
        </div>

        <Card>
          <CardContent className="p-4">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
              </div>
            ) : densityData.length > 0 && (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={densityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="height" label={{ value: 'Height (m)', position: 'bottom' }} />
                    <YAxis label={{ value: 'Density (%)', angle: -90, position: 'left' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="density" stroke="#22c55e" name="Density" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Main Deep Learning Section Component
const DeepLearningSection = () => {
  const [selectedApp, setSelectedApp] = useState('');

  const applications = [
    {
      id: 'satellite',
      title: 'Satellite image analysis for deforestation detection',
      component: SatelliteAnalysis
    },
    {
      id: 'crown',
      title: 'Tree crown detection and counting',
      component: CrownDetection
    },
    {
      id: 'density',
      title: 'Forest density estimation from aerial imagery',
      component: DensityEstimation
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Deep Learning for Forestry</h2>
        <p className="text-gray-600 mb-6">
          Apply deep learning techniques to analyze complex forest patterns and satellite imagery.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Key Applications</h3>
        <div className="grid grid-cols-1 gap-4 mb-6">
          {applications.map(app => (
            <button
              key={app.id}
              onClick={() => setSelectedApp(app.id)}
              className={`p-4 text-left rounded-lg transition-all duration-200 ${
                selectedApp === app.id
                  ? 'bg-green-100 border-green-500 border-2'
                  : 'bg-green-50 hover:bg-green-100 border-2 border-transparent'
              }`}
            >
              {app.title}
            </button>
          ))}
        </div>
      </div>

      {selectedApp && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          {applications.find(app => app.id === selectedApp)?.component && (
            React.createElement(
              applications.find(app => app.id === selectedApp)!.component
            )
          )}
        </div>
      )}
    </div>
  );
};

export default DeepLearningSection;