import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { TreePine, Target, LineChart, Layers, GitBranch } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface GradientBoostingAnalysisProps {
  data: any[];
  onAnalysisComplete?: (results: any) => void;
}

interface AnalysisResults {
  accuracy?: number;
  predictions?: any[];
  featureImportance?: { feature: string; importance: number }[];
  error?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const chartVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const GradientBoostingAnalysis: React.FC<GradientBoostingAnalysisProps> = ({ data, onAnalysisComplete }) => {
  const [numTrees, setNumTrees] = useState<string>("100");
  const [learningRate, setLearningRate] = useState<string>("0.1");
  const [maxDepth, setMaxDepth] = useState<string>("3");
  const [subsample, setSubsample] = useState<string>("1.0");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);

  const handleAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate analysis with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock results - replace with actual Gradient Boosting analysis
      const mockResults = {
        accuracy: 0.92,
        predictions: [
          { actual: "Healthy", predicted: "Healthy" },
          { actual: "Stressed", predicted: "Stressed" },
          { actual: "Diseased", predicted: "Healthy" },
          { actual: "Healthy", predicted: "Healthy" },
        ],
        featureImportance: [
          { feature: "Crown Density", importance: 0.35 },
          { feature: "DBH", importance: 0.25 },
          { feature: "Soil pH", importance: 0.20 },
          { feature: "Canopy Cover", importance: 0.15 },
          { feature: "Age", importance: 0.05 },
        ],
      };

      setResults(mockResults);

      if (onAnalysisComplete) {
        onAnalysisComplete({
          algorithm: "Gradient Boosting",
          parameters: {
            n_estimators: parseInt(numTrees),
            learning_rate: parseFloat(learningRate),
            max_depth: parseInt(maxDepth),
            subsample: parseFloat(subsample),
          },
          results: mockResults,
        });
      }
    } catch (error) {
      console.error("Error during Gradient Boosting analysis:", error);
      setResults({ error: "Analysis failed. Please try again." });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Introduction Section */}
      <Card>
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="text-2xl flex items-center gap-3">
              <Layers className="h-8 w-8 text-green-600" />
              Gradient Boosting: Precision Forest Analysis
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              A powerful ensemble method that combines multiple tree models for highly accurate predictions
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
            <p className="text-gray-700 leading-relaxed">
              Gradient Boosting, like XGBoost, excels at learning complex patterns in forestry data. 
              It builds a series of decision trees, each one focusing on correcting the mistakes of previous trees. 
              This makes it particularly effective for:
            </p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <TreePine className="h-5 w-5 text-green-600" />
                Precise growth predictions and yield estimations
              </li>
              <li className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Early detection of disease and stress patterns
              </li>
              <li className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-green-600" />
                Site quality assessment and classification
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Explanation Section */}
      <Card>
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="text-2xl flex items-center gap-3">
              <GitBranch className="h-8 w-8 text-blue-600" />
              A "Team Effort" Approach to Forest Analysis
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Core Concept */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl"
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-4">How It Works</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Think of Gradient Boosting as assembling a team of specialized "mini-models"—in this case, 
                Decision Trees. Each new tree learns from the mistakes (errors) of the ones before it, 
                progressively boosting overall performance.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Start with a simple model that makes rough guesses</li>
                    <li>Build another tree aimed at correcting previous errors</li>
                    <li>Continue adding trees focused on fixing team mistakes</li>
                    <li>Sum up all corrections for a strong final model</li>
                  </ol>
                </div>
              </div>
            </motion.div>

            {/* Forestry Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Why It Matters for Foresters</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-1">
                      <TreePine className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-gray-700">
                      <strong>High Accuracy for Varied Data:</strong> Excels with diverse forest data, from tree measurements to soil properties
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1">
                      <Target className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-gray-700">
                      <strong>Species Classification:</strong> Integrates multiple features for reliable species identification
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1">
                      <LineChart className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-gray-700">
                      <strong>Biomass Estimation:</strong> Handles complex interactions for accurate biomass predictions
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-purple-800 mb-4">Best Practices & Tips</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="p-1 bg-purple-100 rounded">
                        <Layers className="h-4 w-4 text-purple-600" />
                      </div>
                    </div>
                    <span className="text-gray-700">
                      <strong>Learning Rate:</strong> Use 0.01–0.1 for more accurate, stable models
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="p-1 bg-purple-100 rounded">
                        <GitBranch className="h-4 w-4 text-purple-600" />
                      </div>
                    </div>
                    <span className="text-gray-700">
                      <strong>Control Complexity:</strong> Balance depth and estimators to prevent overfitting
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="p-1 bg-purple-100 rounded">
                        <Target className="h-4 w-4 text-purple-600" />
                      </div>
                    </div>
                    <span className="text-gray-700">
                      <strong>Feature Engineering:</strong> Incorporate forestry-specific metrics for better results
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Bottom Line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Bottom Line</h3>
              <p className="text-gray-700 leading-relaxed">
                Gradient Boosting is a top-notch method in the forester's data science toolkit. By progressively 
                correcting errors, it masters the nuances of forest data—helping with classification, estimation, 
                and monitoring tasks. If you need a "team effort" capable of capturing intricate patterns, 
                Gradient Boosting stands ready to boost your forestry insights.
              </p>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-6 w-6 text-blue-600" />
            Understanding Gradient Boosting in Forestry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <GitBranch className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg text-green-800">Sequential Learning</h3>
              </div>
              <p className="text-gray-700">
                Each tree learns from the mistakes of previous trees, focusing on difficult cases like 
                subtle signs of disease or complex growth patterns.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TreePine className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg text-blue-800">Weighted Trees</h3>
              </div>
              <p className="text-gray-700">
                Trees are weighted based on their performance, with more accurate predictions having 
                greater influence on the final result.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg text-purple-800">Feature Importance</h3>
              </div>
              <p className="text-gray-700">
                Automatically identifies which forest measurements are most crucial for accurate predictions.
              </p>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-6 w-6 text-indigo-600" />
            Configure Your Analysis
          </CardTitle>
          <CardDescription>
            Fine-tune the model parameters to optimize performance for your specific forest data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
              <Label htmlFor="numTrees" className="text-sm font-medium text-gray-700">
                Number of Trees
              </Label>
              <Input
                id="numTrees"
                type="number"
                value={numTrees}
                onChange={(e) => setNumTrees(e.target.value)}
                min="10"
                max="1000"
                className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
              <p className="text-sm text-gray-500">
                More trees can improve accuracy but increase computation time
              </p>
            </div>

            <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
              <Label htmlFor="learningRate" className="text-sm font-medium text-gray-700">
                Learning Rate
              </Label>
              <Input
                id="learningRate"
                type="number"
                value={learningRate}
                onChange={(e) => setLearningRate(e.target.value)}
                step="0.01"
                min="0.01"
                max="1"
                className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
              <p className="text-sm text-gray-500">
                Controls how much each tree contributes
              </p>
            </div>

            <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
              <Label htmlFor="maxDepth" className="text-sm font-medium text-gray-700">
                Maximum Tree Depth
              </Label>
              <Input
                id="maxDepth"
                type="number"
                value={maxDepth}
                onChange={(e) => setMaxDepth(e.target.value)}
                min="1"
                max="10"
                className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
              <p className="text-sm text-gray-500">
                Deeper trees can capture more complex patterns
              </p>
            </div>

            <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
              <Label htmlFor="subsample" className="text-sm font-medium text-gray-700">
                Subsample Ratio
              </Label>
              <Input
                id="subsample"
                type="number"
                value={subsample}
                onChange={(e) => setSubsample(e.target.value)}
                step="0.1"
                min="0.1"
                max="1"
                className="w-full border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
              <p className="text-sm text-gray-500">
                Fraction of samples used for each tree
              </p>
            </div>
          </div>

          <Button 
            onClick={handleAnalysis} 
            disabled={isAnalyzing}
            className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200"
          >
            {isAnalyzing ? (
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Layers className="h-5 w-5" />
                </motion.div>
                Running Analysis...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Layers className="h-5 w-5" />
                Run Gradient Boosting Analysis
              </div>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {results && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <Card>
            <CardHeader>
              <motion.div variants={itemVariants}>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6" />
                  Analysis Results
                </CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent>
              {results.error ? (
                <Alert variant="destructive">
                  <AlertDescription>{results.error}</AlertDescription>
                </Alert>
              ) : (
                <motion.div
                  variants={containerVariants}
                  className="space-y-8"
                >
                  {/* Performance Overview Cards */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <motion.div
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl shadow-sm"
                    >
                      <h3 className="text-sm font-medium text-green-800 mb-2">Model Accuracy</h3>
                      <p className="text-3xl font-bold text-green-600">
                        {(results.accuracy! * 100).toFixed(1)}%
                      </p>
                      <p className="text-xs text-green-700 mt-2">
                        {results.accuracy! > 0.9 ? "Exceptional Performance" : "Good Performance"}
                      </p>
                    </motion.div>

                    <motion.div
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm"
                    >
                      <h3 className="text-sm font-medium text-blue-800 mb-2">Trees in Ensemble</h3>
                      <p className="text-3xl font-bold text-blue-600">{numTrees}</p>
                      <p className="text-xs text-blue-700 mt-2">Working Together</p>
                    </motion.div>

                    <motion.div
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-sm"
                    >
                      <h3 className="text-sm font-medium text-purple-800 mb-2">Learning Rate</h3>
                      <p className="text-3xl font-bold text-purple-600">{learningRate}</p>
                      <p className="text-xs text-purple-700 mt-2">Step Size</p>
                    </motion.div>
                  </div>

                  {/* Feature Importance Chart */}
                  <motion.div
                    variants={chartVariants}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white p-6 rounded-xl shadow-sm border"
                  >
                    <h3 className="text-lg font-semibold mb-4">Feature Importance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={results.featureImportance}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                      >
                        <XAxis type="number" domain={[0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                        <YAxis type="category" dataKey="feature" width={90} />
                        <Tooltip
                          formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Importance']}
                        />
                        <Bar
                          dataKey="importance"
                          fill="#3b82f6"
                          radius={[0, 4, 4, 0]}
                          animationDuration={1000}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>

                  {/* Predictions Section */}
                  <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-sm border overflow-hidden"
                  >
                    <div className="p-6 border-b">
                      <h3 className="font-semibold text-lg">Sample Predictions</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actual
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Predicted
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {results.predictions?.map((pred, idx) => (
                            <motion.tr
                              key={idx}
                              variants={itemVariants}
                              custom={idx}
                              whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.4)" }}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {pred.actual}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {pred.predicted}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {pred.actual === pred.predicted ? (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Correct
                                  </span>
                                ) : (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    Incorrect
                                  </span>
                                )}
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>

                  {/* Model Insights */}
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-sm space-y-4"
                  >
                    <h3 className="font-semibold text-lg text-gray-800">Model Insights</h3>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="text-sm font-medium text-gray-600 mb-2">Performance Analysis</h4>
                        <p className="text-sm text-gray-700">
                          The model achieved {results.accuracy! > 0.9 ? "exceptional" : "good"} accuracy 
                          at {(results.accuracy! * 100).toFixed(1)}%, making it {results.accuracy! > 0.85 ? 
                          "highly reliable" : "suitable"} for forest management decisions.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="text-sm font-medium text-gray-600 mb-2">Key Drivers</h4>
                        <p className="text-sm text-gray-700">
                          The top factors influencing predictions are {results.featureImportance?.[0].feature} 
                          and {results.featureImportance?.[1].feature}, accounting for 
                          {((results.featureImportance?.[0].importance || 0) + 
                          (results.featureImportance?.[1].importance || 0) * 100).toFixed(1)}% 
                          of the model's decisions.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default GradientBoostingAnalysis; 