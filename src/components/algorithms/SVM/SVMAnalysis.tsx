// src/components/algorithms/SVM/SVMAnalysis.tsx
import { useState } from "react";
import { Maximize2, Activity, ArrowUpDown, HelpCircle, Divide } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from "recharts";

const SVMAnalysis = () => {
  // State management
  const [selectedFeature, setSelectedFeature] = useState("height");
  const [kernelType, setKernelType] = useState("linear");
  const [cParameter, setCParameter] = useState(1);
  const [gammaParameter, setGammaParameter] = useState(0.1);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Base data for different features
  const baseDataByFeature = {
    height: [
      { name: "Pine", x: 25.5, y: 15.2, class: 1 },
      { name: "Pine", x: 28.3, y: 16.8, class: 1 },
      { name: "Pine", x: 27.1, y: 15.9, class: 1 },
      { name: "Oak", x: 18.4, y: 12.3, class: -1 },
      { name: "Oak", x: 20.1, y: 13.5, class: -1 },
      { name: "Oak", x: 19.2, y: 12.8, class: -1 }
    ],
    diameter: [
      { name: "Pine", x: 45.2, y: 35.6, class: 1 },
      { name: "Pine", x: 48.7, y: 38.2, class: 1 },
      { name: "Pine", x: 46.9, y: 36.7, class: 1 },
      { name: "Oak", x: 32.4, y: 28.5, class: -1 },
      { name: "Oak", x: 34.8, y: 30.2, class: -1 },
      { name: "Oak", x: 33.1, y: 29.4, class: -1 }
    ],
    age: [
      { name: "Pine", x: 35, y: 42, class: 1 },
      { name: "Pine", x: 38, y: 45, class: 1 },
      { name: "Pine", x: 36, y: 43, class: 1 },
      { name: "Oak", x: 25, y: 32, class: -1 },
      { name: "Oak", x: 28, y: 35, class: -1 },
      { name: "Oak", x: 26, y: 33, class: -1 }
    ],
    density: [
      { name: "Pine", x: 120, y: 85, class: 1 },
      { name: "Pine", x: 125, y: 90, class: 1 },
      { name: "Pine", x: 122, y: 87, class: 1 },
      { name: "Oak", x: 95, y: 65, class: -1 },
      { name: "Oak", x: 100, y: 70, class: -1 },
      { name: "Oak", x: 98, y: 68, class: -1 }
    ]
  };

  // Features with explanations
  const features = [
    {
      id: "height",
      label: "Tree Height",
      explanation: "SVM excels at classifying tree species based on height patterns, considering both absolute height and growth characteristics. The algorithm finds optimal separation boundaries in height-related feature space."
    },
    {
      id: "diameter",
      label: "Tree Diameter",
      explanation: "Diameter measurements, when analyzed by SVM, create effective species classification boundaries. The algorithm can handle non-linear relationships in DBH distributions."
    },
    {
      id: "age",
      label: "Tree Age",
      explanation: "SVM analyzes age-related patterns to distinguish between species and forest types. The kernel methods help capture complex age-growth relationships."
    },
    {
      id: "density",
      label: "Stand Density",
      explanation: "Stand density patterns are effectively analyzed by SVM to classify forest types and conditions. The algorithm handles multiple density-related features simultaneously."
    }
  ];

  // Generate SVM decision boundary
  const generateDecisionBoundary = (data: typeof baseDataByFeature.height, kernel: string, C: number, gamma: number) => {
    // Simulate SVM decision boundary based on parameters
    const xMin = Math.min(...data.map(d => d.x));
    const xMax = Math.max(...data.map(d => d.x));
    const yMin = Math.min(...data.map(d => d.y));
    const yMax = Math.max(...data.map(d => d.y));

    // Generate boundary points
    const boundaryPoints = [];
    const steps = 50;
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (xMax - xMin) * (i / steps);
      let y;
      
      if (kernel === "linear") {
        y = (-0.5 * x) + (yMax + yMin) / 2 + (C - 1) * 2;
      } else {
        // Non-linear boundary
        y = Math.sin(x * gamma) * (yMax - yMin) / 4 + (yMax + yMin) / 2;
      }
      
      boundaryPoints.push({ x, y });
    }

    return boundaryPoints;
  };

  // Calculate performance metrics
  const calculatePerformance = (kernel: string, C: number, gamma: number) => {
    const accuracy = 85 + (C * 2) - (gamma * 5) + (kernel === "rbf" ? 5 : 0);
    const margin = 0.8 - (C * 0.1) + (gamma * 0.2);
    const support = 10 + Math.floor(C * 2);
    return { accuracy, margin, support };
  };

  const handleTooltipEnter = (id: string) => setActiveTooltip(id);
  const handleTooltipLeave = () => setActiveTooltip(null);

  // Current data and decision boundary
  const currentData = baseDataByFeature[selectedFeature as keyof typeof baseDataByFeature];
  const boundaryPoints = generateDecisionBoundary(currentData, kernelType, cParameter, gammaParameter);
  const performance = calculatePerformance(kernelType, cParameter, gammaParameter);

  return (
    <div className="space-y-6">
      {/* Introduction Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Support Vector Machines in Forestry</h2>
        <p className="text-gray-700 mb-6">
          Support Vector Machines (SVM) excel at classifying forest types and species by finding optimal boundaries
          between different classes in high-dimensional feature space.
        </p>

        {/* How It Works */}
        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-green-800 mb-4">How SVM Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Core Concepts</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Finds optimal separation boundaries</li>
                <li>Maximizes margin between classes</li>
                <li>Handles non-linear patterns</li>
                <li>Supports multiple features</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Key Features</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Kernel transformations</li>
                <li>Support vector identification</li>
                <li>Margin optimization</li>
                <li>Multi-class classification</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Applications */}
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Applications in Forestry</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Species Classification</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Tree species identification</li>
                <li>Forest type mapping</li>
                <li>Vegetation classification</li>
                <li>Habitat typing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Health Assessment</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Disease detection</li>
                <li>Stress identification</li>
                <li>Damage assessment</li>
                <li>Health monitoring</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Resource Management</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Stand delineation</li>
                <li>Resource allocation</li>
                <li>Management zoning</li>
                <li>Planning support</li>
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
                <li>Feature scaling is crucial</li>
                <li>Handle missing values carefully</li>
                <li>Remove outliers appropriately</li>
                <li>Balance class distributions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Model Optimization</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Select appropriate kernel</li>
                <li>Tune C parameter carefully</li>
                <li>Optimize gamma for RBF</li>
                <li>Use cross-validation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Parameter Controls */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">SVM Parameters</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Kernel Type</label>
              <select
                value={kernelType}
                onChange={(e) => setKernelType(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="linear">Linear</option>
                <option value="rbf">RBF (Radial Basis Function)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">C Parameter (Regularization)</label>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={cParameter}
                onChange={(e) => setCParameter(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center text-sm text-gray-600">C = {cParameter}</div>
            </div>

            {kernelType === "rbf" && (
              <div>
                <label className="block text-sm font-medium mb-2">Gamma Parameter</label>
                <input
                  type="range"
                  min="0.01"
                  max="1"
                  step="0.01"
                  value={gammaParameter}
                  onChange={(e) => setGammaParameter(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-center text-sm text-gray-600">γ = {gammaParameter}</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Visualization */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Decision Boundary Visualization</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="X" />
                <YAxis type="number" dataKey="y" name="Y" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter 
                  name="Pine" 
                  data={currentData.filter(d => d.class === 1)} 
                  fill="#82ca9d" 
                />
                <Scatter 
                  name="Oak" 
                  data={currentData.filter(d => d.class === -1)} 
                  fill="#8884d8" 
                />
                <Scatter
                  name="Decision Boundary"
                  data={boundaryPoints}
                  line
                  lineType="solid"
                  fill="none"
                  stroke="#ff7300"
                />
              </ScatterChart>
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
                <span className="font-medium">Classification Accuracy</span>
              </div>
              <div className="text-2xl font-bold">
                {performance.accuracy.toFixed(1)}%
                </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Maximize2 className="w-5 h-5 text-green-600" />
                <span className="font-medium">Margin Width</span>
              </div>
              <div className="text-2xl font-bold">
                {performance.margin.toFixed(2)}
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Divide className="w-5 h-5 text-green-600" />
                <span className="font-medium">Support Vectors</span>
              </div>
              <div className="text-2xl font-bold">
                {performance.support}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertDescription>
          Adjust the kernel type and parameters to see how they affect the SVM's decision boundary.
          The C parameter controls the trade-off between having a wider margin and correctly classifying training data.
          For the RBF kernel, gamma defines how much influence a single training example has.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SVMAnalysis;                