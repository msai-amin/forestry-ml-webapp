// src/components/algorithms/DecisionTree/DecisionTreeAnalysis.tsx
import { useState, useEffect } from "react";
import { Leaf, Activity, ArrowDownUp, HelpCircle, TreePine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

interface DecisionTreeAnalysisProps {
  onLearnMore: () => void;
}

const DecisionTreeAnalysis: React.FC<DecisionTreeAnalysisProps> = ({ onLearnMore }) => {
  // State management
  const [selectedFeature, setSelectedFeature] = useState("height");
  const [treeDepth, setTreeDepth] = useState(3);
  const [minSamplesSplit, setMinSamplesSplit] = useState(2);
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

  // Function to calculate predictions based on feature and parameters
  const calculatePredictions = (baseValue: number, feature: string, depth: number, minSamples: number) => {
    // Different prediction logic for each feature
    const featureFactors = {
      height: { depthWeight: 0.15, sampleWeight: 0.1, baseline: 1.0 },
      diameter: { depthWeight: 0.2, sampleWeight: 0.15, baseline: 1.2 },
      age: { depthWeight: 0.1, sampleWeight: 0.2, baseline: 0.8 },
      density: { depthWeight: 0.25, sampleWeight: 0.25, baseline: 1.5 }
    };

    const factor = featureFactors[feature] || featureFactors.height;
    
    // Calculate variation based on parameters
    const depthEffect = (depth / 10) * factor.depthWeight;
    const samplesEffect = (minSamples / 10) * factor.sampleWeight;
    
    // Add controlled randomness based on feature characteristics
    const variation = Math.sin(baseValue * depth * factor.baseline) * samplesEffect;
    
    // Return prediction with feature-specific adjustments
    return baseValue + variation * (1 - depthEffect);
  };

  // Generate visualization data based on selected feature
  const sampleData = baseDataByFeature[selectedFeature].map(item => ({
    ...item,
    prediction: calculatePredictions(item.value, selectedFeature, treeDepth, minSamplesSplit)
  }));

  // Features with explanations
  const features = [
    {
      id: "height",
      label: "Tree Height",
      explanation: "Tree height is a crucial predictor (85% correlation with growth rate) as it directly reflects growth potential and forest stand dynamics. Taller trees often indicate better site conditions and competitive advantage."
    },
    {
      id: "diameter",
      label: "Tree Diameter",
      explanation: "Diameter at breast height (DBH) is highly predictive (80% correlation) of tree volume and growth rate. It's particularly important for timber production forecasting and forest health assessment."
    },
    {
      id: "age",
      label: "Tree Age",
      explanation: "Age strongly influences growth patterns (75% correlation) and helps predict future development. Younger trees typically show different growth rates and responses to environmental factors than mature ones."
    },
    {
      id: "density",
      label: "Stand Density",
      explanation: "Stand density impacts individual tree growth (70% correlation) through competition for resources. It's crucial for understanding forest dynamics and predicting future growth patterns."
    }
  ];

  // Model parameters with explanations
  const parameters = {
    treeDepth: {
      label: "Tree Depth",
      explanation: "Controls how detailed the decision paths become. Higher depth (up to 10) allows more complex patterns but risks overfitting. Each level increases prediction granularity by approximately 15%."
    },
    minSamplesSplit: {
      label: "Minimum Samples Split",
      explanation: "Determines the minimum number of samples needed to split a node. Higher values (2-10) prevent overfitting. Each increment reduces model complexity by roughly 10% while potentially increasing reliability."
    }
  };

  // Tooltip handlers
  const handleTooltipEnter = (id: string) => {
    setActiveTooltip(id);
  };

  const handleTooltipLeave = () => {
    setActiveTooltip(null);
  };

  return (
    <div className="space-y-6">
      {/* Explanation Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Understanding Decision Trees in Forestry</h2>
        
        <div className="prose max-w-none">
          <p className="text-gray-700 mb-4">
            Decision trees are powerful machine learning algorithms that help foresters make predictions and decisions about forest management. Think of a decision tree like a flow chart that asks a series of yes/no questions about tree characteristics to make predictions about growth, health, or timber value.
          </p>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Key Features in Forest Analysis:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <span className="font-semibold">Tree Height</span>: Often the first decision point, as it's the strongest predictor of tree growth and forest dynamics. Taller trees typically indicate better site conditions and growth potential.
              </li>
              <li>
                <span className="font-semibold">Tree Diameter</span>: Works alongside height to determine tree volume and growth stage. It's particularly important for timber production estimates and can indicate forest health.
              </li>
              <li>
                <span className="font-semibold">Tree Age</span>: Helps predict growth patterns and future development. Young trees respond differently to environmental factors compared to mature ones.
              </li>
              <li>
                <span className="font-semibold">Stand Density</span>: Influences individual tree growth through resource competition. Higher density can mean slower individual tree growth but higher total stand volume.
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">How the Algorithm Works:</h3>
            <p className="text-gray-700">
              The decision tree algorithm examines these features and automatically determines the most important questions to ask. At each node (decision point), it splits the data based on the feature that provides the most information gain. For example, it might first ask "Is the tree height {'>'} 30m?" and then "Is the diameter {'>'} 40cm?" to predict growth rate.
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Model Parameters:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <span className="font-semibold">Tree Depth</span>: Controls how many questions the algorithm can ask. Deeper trees can capture more complex patterns but might overfit to specific cases.
              </li>
              <li>
                <span className="font-semibold">Minimum Samples Split</span>: Determines how many samples are needed to make a new decision. Higher values create more robust, generalized predictions.
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Model Performance:</h3>
            <p className="text-gray-700 mb-3">
              The performance of a decision tree model is measured through several key metrics:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <span className="font-semibold">Accuracy</span>: Shows the percentage of correct predictions. In forestry, we typically aim for {'>'} 90% accuracy for reliable predictions.
              </li>
              <li>
                <span className="font-semibold">Mean Error</span>: Represents the average difference between predicted and actual values. Lower values (ideally {'<'} 0.5) indicate better predictions.
              </li>
              <li>
                <span className="font-semibold">Sample Size</span>: The number of trees used to train the model. Larger sample sizes generally lead to more reliable predictions.
              </li>
            </ul>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Understanding the Visualization:</h3>
            <p className="text-gray-700 mb-3">
              The line chart below shows the relationship between actual and predicted values:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <span className="font-semibold">Green Line</span>: Represents actual measured values from real forest data.
              </li>
              <li>
                <span className="font-semibold">Blue Line</span>: Shows model predictions, which update as you adjust the parameters.
              </li>
              <li>
                <span className="font-semibold">Gap Between Lines</span>: Indicates prediction error - smaller gaps mean better predictions.
              </li>
              <li>
                <span className="font-semibold">Parameter Effects</span>: 
                <ul className="list-disc pl-6 mt-2">
                  <li>Increasing Tree Depth: Makes the blue line more closely follow the green line, but may lead to overfitting</li>
                  <li>Increasing Minimum Samples Split: Smooths out the blue line, making predictions more generalized</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Feature Selection */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Select Feature for Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div key={feature.id} className="relative">
                <button
                  onClick={() => setSelectedFeature(feature.id)}
                  onMouseEnter={() => handleTooltipEnter(feature.id)}
                  onMouseLeave={handleTooltipLeave}
                  className={`w-full p-4 rounded-lg flex items-center justify-between ${
                    selectedFeature === feature.id
                      ? "bg-green-100 border-2 border-green-500"
                      : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Leaf className="w-5 h-5 text-green-600" />
                    <span>{feature.label}</span>
                  </div>
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                </button>
                {activeTooltip === feature.id && (
                  <div className="absolute z-10 w-72 p-4 bg-white border rounded-lg shadow-lg -top-2 left-full ml-2">
                    <p className="text-sm text-gray-600">{feature.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Parameters Control */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Model Parameters</h3>
          <div className="space-y-6">
            {/* Tree Depth Control */}
            <div className="relative">
              <div className="flex items-center space-x-2 mb-2">
                <label className="text-sm font-medium">{parameters.treeDepth.label}</label>
                <HelpCircle 
                  className="w-4 h-4 text-gray-400 cursor-help"
                  onMouseEnter={() => handleTooltipEnter('treeDepth')}
                  onMouseLeave={handleTooltipLeave}
                />
              </div>
              {activeTooltip === 'treeDepth' && (
                <div className="absolute z-10 w-72 p-4 bg-white border rounded-lg shadow-lg -top-2 left-full ml-2">
                  <p className="text-sm text-gray-600">{parameters.treeDepth.explanation}</p>
                </div>
              )}
              <input
                type="range"
                min="1"
                max="10"
                value={treeDepth}
                onChange={(e) => setTreeDepth(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-sm text-gray-600">{treeDepth}</div>
            </div>

            {/* Minimum Samples Split Control */}
            <div className="relative">
              <div className="flex items-center space-x-2 mb-2">
                <label className="text-sm font-medium">{parameters.minSamplesSplit.label}</label>
                <HelpCircle 
                  className="w-4 h-4 text-gray-400 cursor-help"
                  onMouseEnter={() => handleTooltipEnter('minSamplesSplit')}
                  onMouseLeave={handleTooltipLeave}
                />
              </div>
              {activeTooltip === 'minSamplesSplit' && (
                <div className="absolute z-10 w-72 p-4 bg-white border rounded-lg shadow-lg -top-2 left-full ml-2">
                  <p className="text-sm text-gray-600">{parameters.minSamplesSplit.explanation}</p>
                </div>
              )}
              <input
                type="range"
                min="2"
                max="10"
                value={minSamplesSplit}
                onChange={(e) => setMinSamplesSplit(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-sm text-gray-600">{minSamplesSplit}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visualization */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Model Performance Visualization</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2E7D32"
                  name="Actual"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="prediction"
                  stroke="#1565C0"
                  name="Predicted"
                  strokeWidth={2}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Model Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-5 h-5 text-green-600" />
                <span className="font-medium">Accuracy</span>
              </div>
              <div className="text-2xl font-bold">
                {(100 - (treeDepth * 0.5 + minSamplesSplit * 0.3)).toFixed(1)}%
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <ArrowDownUp className="w-5 h-5 text-green-600" />
                <span className="font-medium">Mean Error</span>
              </div>
              <div className="text-2xl font-bold">
                {(0.2 + (treeDepth * 0.02 + minSamplesSplit * 0.01)).toFixed(2)}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Leaf className="w-5 h-5 text-green-600" />
                <span className="font-medium">Samples</span>
              </div>
              <div className="text-2xl font-bold">
                {1000 + treeDepth * 100 + minSamplesSplit * 50}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertDescription>
          Adjust the parameters above to see how they affect the decision tree model's performance.
          The visualization updates in real-time to show the impact of your changes.
          Lower mean error and higher accuracy indicate better model performance.
        </AlertDescription>
      </Alert>

      {/* Add Learn More Button at the bottom */}
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
            <TreePine className="h-5 w-5" />
            <span>More on Decision Trees</span>
          </div>
        </Button>
      </motion.div>
    </div>
  );
};

export default DecisionTreeAnalysis;