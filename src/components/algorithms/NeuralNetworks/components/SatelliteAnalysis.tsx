// src/components/algorithms/NeuralNetworks/components/SatelliteAnalysis.tsx
import React, { useState } from 'react';
import { Maximize } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SatelliteAnalysisProps {
  onAnalysisComplete?: (results: any) => void;
}

const SatelliteAnalysis: React.FC<SatelliteAnalysisProps> = ({ onAnalysisComplete }) => {
  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    setLoading(true);
    // Simulate processing delay
    setTimeout(() => {
      const randomConfidence = Math.floor(Math.random() * 20) + 75; // 75-95%
      setConfidence(randomConfidence);
      setLoading(false);
      
      if (onAnalysisComplete) {
        onAnalysisComplete({
          confidence: randomConfidence,
          forestCover: randomConfidence,
          deforestation: 100 - randomConfidence,
        });
      }
    }, 1500);
  };

  return (
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
          ) : confidence > 0 ? (
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
                <div className="flex justify-between items-center mt-2">
                  <span>Potential Deforestation:</span>
                  <span className="font-semibold text-red-600">{100 - confidence}%</span>
                </div>
              </div>
            </div>
          ) : null}
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
  );
};

export default SatelliteAnalysis;