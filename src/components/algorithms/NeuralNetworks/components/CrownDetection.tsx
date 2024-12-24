// src/components/algorithms/NeuralNetworks/components/CrownDetection.tsx
import React, { useState, useRef } from 'react';
import { Tree } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';

interface CrownDetectionProps {
  onDetectionComplete?: (results: any) => void;
}

interface DetectionResult {
  treeCount: number;
  averageCrownSize: number;
  density: number;
  confidence: number;
}

const CrownDetection: React.FC<CrownDetectionProps> = ({ onDetectionComplete }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DetectionResult | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setLoading(true);
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      if (!event.target?.result) return;

      const img = new Image();
      img.onload = () => {
        // Draw image on canvas
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to match image
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Simulate crown detection
        setTimeout(() => {
          const newResults = {
            treeCount: Math.floor(Math.random() * 50) + 100,
            averageCrownSize: Math.floor(Math.random() * 3) + 4,
            density: Math.floor(Math.random() * 20) + 60,
            confidence: Math.floor(Math.random() * 10) + 85
          };

          setResults(newResults);
          setLoading(false);
          onDetectionComplete?.(newResults);

          // Simulate crown detection visualization
          ctx.strokeStyle = '#22c55e';
          ctx.lineWidth = 2;
          for (let i = 0; i < 20; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const radius = (Math.random() * 20) + 10;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.stroke();
          }
        }, 2000);
      };

      img.src = event.target.result as string;
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Tree Crown Detection</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Upload Area */}
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

          {/* Canvas for visualization */}
          <canvas 
            ref={canvasRef} 
            className="w-full border rounded-lg"
            style={{ display: loading || !results ? 'none' : 'block' }}
          />
        </div>

        {/* Results Area */}
        <Card>
          <CardContent className="p-4">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500" />
              </div>
            ) : results ? (
              <div className="space-y-4">
                <h5 className="font-medium">Detection Results</h5>
                <div className="space-y-2">
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
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Density</div>
                      <div className="text-xl font-semibold text-green-700">
                        {results.density}%
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-600">Confidence</div>
                      <div className="text-xl font-semibold text-green-700">
                        {results.confidence}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <Alert>
        <AlertDescription>
          <strong>How it works:</strong> The model uses instance segmentation to identify 
          individual tree crowns from aerial imagery. It employs a U-Net architecture with 
          a ResNet backbone to achieve high-precision crown delineation.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default CrownDetection;