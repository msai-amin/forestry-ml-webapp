// src/components/algorithms/RandomForest/RandomForestAnalysis.tsx
import { useState } from "react";
import { Trees, Activity, ArrowUpDown, HelpCircle, TreePine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

interface RandomForestAnalysisProps {
  onLearnMore: () => void;
}

const RandomForestAnalysis: React.FC<RandomForestAnalysisProps> = ({ onLearnMore }) => {
  // State management
  const [selectedFeature, setSelectedFeature] = useState("height");
  const [numberOfTrees, setNumberOfTrees] = useState(5);
  const [featureSplit, setFeatureSplit] = useState(2);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Base data for different features
  const baseDataByFeature = {
    height: [
      { name: "Sample 1", value: 25.5 },
      { name: "Sample 2", value: 30.2 },
      { name: "Sample 3", value: 28.7 },
      { name: "Sample 4", value: 32.1 },
      { name: "Sample 5", value: 27.4 }
    ],
    diameter: [
      { name: "Sample 1", value: 45.2 },
      { name: "Sample 2", value: 52.8 },
      { name: "Sample 3", value: 48.5 },
      { name: "Sample 4", value: 55.3 },
      { name: "Sample 5", value: 50.1 }
    ],
    age: [
      { name: "Sample 1", value: 35 },
      { name: "Sample 2", value: 42 },
      { name: "Sample 3", value: 38 },
      { name: "Sample 4", value: 45 },
      { name: "Sample 5", value: 40 }
    ],
    density: [
      { name: "Sample 1", value: 120 },
      { name: "Sample 2", value: 145 },
      { name: "Sample 3", value: 135 },
      { name: "Sample 4", value: 150 },
      { name: "Sample 5", value: 130 }
    ]
  };

  // Calculate predictions for a single tree
  const generateTreePrediction = (baseValue: number, treeIndex: number, feature: string) => {
    const featureFactors = {
      height: { noise: 0.15, bias: 1.0 },
      diameter: { noise: 0.2, bias: 1.2 },
      age: { noise: 0.1, bias: 0.8 },
      density: { noise: 0.25, bias: 1.5 }
    };

    const factor = featureFactors[feature as keyof typeof featureFactors] || featureFactors.height;
    const randomNoise = (Math.sin(baseValue * treeIndex * factor.bias) * factor.noise) + 
                       (Math.random() - 0.5) * 0.1;
    
    return baseValue * (1 + randomNoise);
  };

  // Calculate ensemble predictions
  const generateForestPredictions = (baseValue: number, feature: string) => {
    const treePredictions = Array.from({ length: numberOfTrees }, (_, i) => 
      generateTreePrediction(baseValue, i + 1, feature)
    );

    return {
      individualPredictions: treePredictions,
      ensemblePrediction: treePredictions.reduce((a, b) => a + b) / treePredictions.length
    };
  };

  // Generate visualization data
  const sampleData = baseDataByFeature[selectedFeature as keyof typeof baseDataByFeature].map(item => {
    const forestPredictions = generateForestPredictions(item.value, selectedFeature);
    return {
      ...item,
      prediction: forestPredictions.ensemblePrediction
    };
  });

  // Individual tree predictions for the first sample
  const treeData = Array.from({ length: numberOfTrees }, (_, i) => ({
    name: `Tree ${i + 1}`,
    prediction: generateTreePrediction(sampleData[0].value, i + 1, selectedFeature)
  }));

  const handleTooltipEnter = (id: string) => setActiveTooltip(id);
  const handleTooltipLeave = () => setActiveTooltip(null);

  return (
    <div className="space-y-6">
      {/* Introduction Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Understanding Random Forests in Forestry</h2>
        <p className="text-gray-700 mb-6">
          Random Forest combines multiple Decision Trees to make more accurate predictions for various forestry tasks.
          This ensemble approach excels in both classification (e.g., species identification) and regression (e.g., growth prediction).
        </p>

        {/* How It Works */}
        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-green-800 mb-4">How Random Forest Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Base Structure</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Creates multiple independent Decision Trees</li>
                <li>Each tree analyzes different data subsets</li>
                <li>Trees vote on final predictions</li>
                <li>Combines results for better accuracy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Key Techniques</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Bootstrap sampling for diverse training</li>
                <li>Random feature selection at splits</li>
                <li>Parallel tree construction</li>
                <li>Ensemble prediction aggregation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Applications */}
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Applications in Forestry</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Classification Tasks</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Species identification</li>
                <li>Forest type mapping</li>
                <li>Disease detection</li>
                <li>Risk assessment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Prediction Tasks</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Growth forecasting</li>
                <li>Yield estimation</li>
                <li>Biomass calculation</li>
                <li>Carbon stock assessment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Monitoring Tasks</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Health surveillance</li>
                <li>Fire risk mapping</li>
                <li>Change detection</li>
                <li>Stand delineation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-purple-800 mb-4">Implementation Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Data Preparation</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Combine field and remote sensing data</li>
                <li>Handle imbalanced species data</li>
                <li>Include environmental variables</li>
                <li>Transform features when needed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Model Optimization</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Tune number of trees carefully</li>
                <li>Adjust feature split settings</li>
                <li>Control tree depth for complexity</li>
                <li>Validate with independent data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Components */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Try Random Forest Predictions</h3>
          <p className="text-gray-700 mb-4">
            Experiment with different parameters to see how they affect the model's predictions.
            Adjust the number of trees and features to understand their impact on accuracy.
          </p>
        </CardContent>
      </Card>

      {/* Parameter Controls */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Model Parameters</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Number of Trees</label>
              <input
                type="range"
                min="3"
                max="20"
                value={numberOfTrees}
                onChange={(e) => setNumberOfTrees(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-sm text-gray-600">{numberOfTrees} trees</div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Features per Split</label>
              <input
                type="range"
                min="1"
                max="4"
                value={featureSplit}
                onChange={(e) => setFeatureSplit(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-sm text-gray-600">{featureSplit} features</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visualizations */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Model Predictions</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis 
                  label={{ 
                    value: selectedFeature === 'height' ? 'Height (m)' :
                           selectedFeature === 'diameter' ? 'DBH (cm)' :
                           selectedFeature === 'age' ? 'Age (years)' :
                           'Trees per hectare',
                    angle: -90,
                    position: 'insideLeft'
                  }} 
                />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#2E7D32" name="Actual" strokeWidth={2} />
                <Line type="monotone" dataKey="prediction" stroke="#1565C0" name="Predicted" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Individual Tree Performance */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Individual Tree Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={treeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="prediction" fill="#82ca9d" name="Individual Predictions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Model Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-5 h-5 text-green-600" />
                <span className="font-medium">Accuracy</span>
              </div>
              <div className="text-2xl font-bold">
                {(95 + (numberOfTrees * 0.2) - (featureSplit * 0.5)).toFixed(1)}%
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <ArrowUpDown className="w-5 h-5 text-green-600" />
                <span className="font-medium">Error Rate</span>
              </div>
              <div className="text-2xl font-bold">
                {(0.15 - (numberOfTrees * 0.005) + (featureSplit * 0.01)).toFixed(3)}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TreePine className="w-5 h-5 text-green-600" />
                <span className="font-medium">Model Confidence</span>
              </div>
              <div className="text-2xl font-bold">
                {(0.8 + (featureSplit * 0.05)).toFixed(2)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertDescription>
          Adjust the parameters above to see how they affect the random forest's predictions.
          More trees typically improve accuracy but increase processing time. The optimal number
          of features per split helps balance between model complexity and generalization.
        </AlertDescription>
      </Alert>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <Button
          onClick={onLearnMore}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-lg transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            <Trees className="h-5 w-5" />
            <span>Learn more about Random Forests</span>
          </div>
        </Button>
      </motion.div>
    </div>
  );
};

export default RandomForestAnalysis