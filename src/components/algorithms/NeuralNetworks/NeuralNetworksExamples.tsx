import React, { useState } from 'react';
import { Network, Tree, Maximize, Database } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const NeuralNetworksSection = () => {
  const [activeDemo, setActiveDemo] = useState('satellite');
  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState(85);

  // Sample data for the visualization
  const sampleData = {
    satellite: [
      { x: 30, y: 40, class: 'forest', confidence: 0.92 },
      { x: 60, y: 70, class: 'deforested', confidence: 0.87 },
      { x: 90, y: 20, class: 'forest', confidence: 0.95 }
    ]
  };

  const handleImageUpload = (e) => {
    setLoading(true);
    // Simulate processing delay
    setTimeout(() => {
      setLoading(false);
      setConfidence(Math.floor(Math.random() * 20) + 75); // Random confidence between 75-95%
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Network className="text-green-700" />
          Neural Networks in Forestry
        </h3>
        <p className="mt-2 text-gray-700">
          Neural networks are powerful deep learning models that can analyze complex patterns 
          in forestry data, from satellite imagery to detailed tree measurements.
        </p>
      </div>

      {/* Application Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            id: 'satellite',
            title: 'Satellite Analysis',
            icon: Maximize,
            description: 'Analyze satellite imagery for deforestation and forest health'
          },
          {
            id: 'crown',
            title: 'Crown Detection',
            icon: Tree,
            description: 'Detect and measure individual tree crowns from aerial imagery'
          },
          {
            id: 'density',
            title: 'Density Estimation',
            icon: Database,
            description: 'Estimate forest density and biomass distribution'
          }
        ].map(({ id, title, icon: Icon, description }) => (
          <Card
            key={id}
            className={`cursor-pointer transition-all ${
              activeDemo === id ? 'ring-2 ring-green-500 shadow-lg' : 'hover:shadow-md'
            }`}
            onClick={() => setActiveDemo(id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="text-green-600" size={20} />
                <h4 className="font-semibold">{title}</h4>
              </div>
              <p className="text-sm text-gray-600">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interactive Demo Area */}
      <div className="bg-white p-6 rounded-lg border">
        {activeDemo === 'satellite' && (
          <div className="space-y-4">
            <h4 className="font-semibold">Satellite Image Analysis Demo</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Upload Area */}
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

              {/* Results Area */}
              <div className="space-y-4">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
                  </div>
                ) : (
                  <div>
                    <h5 className="font-medium mb-2">Analysis Results</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Forest Cover Detected:</span>
                        <span className="font-semibold text-green-600">{confidence}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-green-600 h-2.5 rounded-full" 
                          style={{ width: `${confidence}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Alert>
              <AlertDescription>
                <strong>How it works:</strong> The neural network analyzes satellite imagery using 
                a convolutional architecture to detect forest cover, deforestation, and changes 
                over time. It processes multiple spectral bands to identify vegetation patterns 
                and health indicators.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {activeDemo === 'crown' && (
          <div className="space-y-4">
            <h4 className="font-semibold">Tree Crown Detection Demo</h4>
            <p className="text-gray-600">
              Upload aerial imagery to detect and measure individual tree crowns using 
              instance segmentation neural networks.
            </p>
            {/* Crown detection demo content */}
          </div>
        )}

        {activeDemo === 'density' && (
          <div className="space-y-4">
            <h4 className="font-semibold">Forest Density Estimation Demo</h4>
            <p className="text-gray-600">
              Analyze forest structure and density using deep learning on LiDAR or 
              photogrammetry data.
            </p>
            {/* Density estimation demo content */}
          </div>
        )}
      </div>

      {/* Technical Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2">Network Architecture</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>Convolutional Neural Networks (CNN) for image analysis</li>
              <li>U-Net architecture for semantic segmentation</li>
              <li>ResNet backbone for feature extraction</li>
              <li>Attention mechanisms for focusing on relevant areas</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2">Key Metrics</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>Detection Accuracy: 92-95%</li>
              <li>Crown Delineation Precision: 88%</li>
              <li>Density Estimation Error: ±5%</li>
              <li>Processing Speed: 2-3 seconds per image</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NeuralNetworksSection;