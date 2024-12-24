// src/components/algorithms/NeuralNetworks/components/DensityEstimation.tsx
import React, { useState } from 'react';
import { Database, LineChart } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DensityEstimationProps {
  onEstimationComplete?: (results: any) => void;
}

interface DensityData {
  height: number;
  density: number;
  biomass: number;
}

const DensityEstimation: React.FC<DensityEstimationProps> = ({ onEstimationComplete }) => {
  const [loading, setLoading] = useState(false);
  const [densityData, setDensityData] = useState<DensityData[]>([]);

  const generateDensityProfile = () => {
    // Generate sample vertical density profile
    const data: DensityData[] = Array.from({ length: 10 }, (_, i) => ({
      height: (i + 1) * 5,
      density: Math.random() * 30 + 50 - i * 3,
      biomass: Math.random() * 20 + 40 - i * 2
    }));
    return data;
  };

  const handleDataUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setLoading(true);
    setTimeout(() => {
      const newData = generateDensityProfile();
      setDensityData(newData);
      setLoading(false);
      onEstimationComplete?.(newData);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Forest Density Estimation</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Area */}
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

        {/* Results Area */}
        <Card>
          <CardContent className="p-4">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
              </div>
            ) : densityData.length > 0 ? (
              <div className="space-y-4">
                <h5 className="font-medium">Vertical Density Profile</h5>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={densityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="height" 
                        label={{ value: 'Height (m)', position: 'bottom' }} 
                      />
                      <YAxis label={{ value: 'Density (%)', angle: -90, position: 'left' }} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="density" 
                        stroke="#22c55e" 
                        name="Density"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="biomass" 
                        stroke="#15803d" 
                        name="Biomass"
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      {densityData.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-sm text-gray-600">Average Density</div>
            <div className="text-xl font-semibold text-green-700">
              {Math.round(densityData.reduce((acc, curr) => acc + curr.density, 0) / densityData.length)}%
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-sm text-gray-600">Max Height</div>
            <div className="text-xl font-semibold text-green-700">
              {Math.max(...densityData.map(d => d.height))}m
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-sm text-gray-600">Total Biomass</div>
            <div className="text-xl font-semibold text-green-700">
              {Math.round(densityData.reduce((acc, curr) => acc + curr.biomass, 0))}t/ha
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-sm text-gray-600">Canopy Layers</div>
            <div className="text-xl font-semibold text-green-700">
              {Math.round(densityData.length / 2)}
            </div>
          </div>
        </div>
      )}

      <Alert>
        <AlertDescription>
          <strong>How it works:</strong> The neural network processes LiDAR point cloud data 
          to create a vertical density profile of the forest. It analyzes the distribution of 
          points at different heights to estimate forest structure, biomass, and canopy layering.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default DensityEstimation;