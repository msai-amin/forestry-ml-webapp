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
import { Brain, Network, Activity, Target, LineChart } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import NetworkVisualization from './NetworkVisualization';

interface NeuralNetworkAnalysisProps {
  data: any[];
  onAnalysisComplete?: (results: any) => void;
}

interface AnalysisResults {
  accuracy?: number;
  predictions?: any[];
  lossHistory?: number[];
  error?: string;
}

const NeuralNetworkAnalysis: React.FC<NeuralNetworkAnalysisProps> = ({ data, onAnalysisComplete }) => {
  const [layers, setLayers] = useState<string>("3");
  const [neurons, setNeurons] = useState<string>("64");
  const [epochs, setEpochs] = useState<string>("100");
  const [learningRate, setLearningRate] = useState<string>("0.001");
  const [activation, setActivation] = useState<string>("relu");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);

  const handleAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate analysis with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock results - replace with actual Neural Network analysis
      const mockResults = {
        accuracy: 0.89,
        predictions: [
          { actual: "Pine", predicted: "Pine" },
          { actual: "Oak", predicted: "Oak" },
          { actual: "Maple", predicted: "Maple" },
          { actual: "Birch", predicted: "Pine" },
        ],
        lossHistory: [0.8, 0.6, 0.4, 0.3, 0.25, 0.2],
      };

      setResults(mockResults);

      if (onAnalysisComplete) {
        onAnalysisComplete({
          algorithm: "Neural Network",
          parameters: {
            layers: parseInt(layers),
            neurons: parseInt(neurons),
            epochs: parseInt(epochs),
            learningRate: parseFloat(learningRate),
            activation: activation,
          },
          results: mockResults,
        });
      }
    } catch (error) {
      console.error("Error during Neural Network analysis:", error);
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
          <CardTitle className="text-2xl">Neural Networks: Deep Learning for Forest Analysis</CardTitle>
          <CardDescription className="text-lg">
            Harness the power of deep learning to uncover complex patterns in your forestry data
          </CardDescription>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p className="text-gray-700">
            Neural Networks mimic the human brain's ability to learn and recognize patterns, making them 
            powerful tools for complex forestry tasks like species identification, growth prediction, and 
            health assessment from multiple data sources.
          </p>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-6 w-6" />
            Understanding Neural Networks in Forestry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Learning from Data
              </h3>
              <p className="text-gray-700">
                The network learns by analyzing thousands of examples, adjusting its internal connections 
                to recognize important patterns in your forest data.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Multiple Layers
              </h3>
              <p className="text-gray-700">
                Each layer processes different aspects of your data, from basic features to complex 
                combinations of characteristics.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Target className="h-5 w-5" />
                Continuous Improvement
              </h3>
              <p className="text-gray-700">
                The network continuously refines its predictions through multiple training epochs, 
                improving accuracy over time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-6 w-6" />
            Configure Neural Network
          </CardTitle>
          <CardDescription>
            Adjust the network architecture and training parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="layers">Number of Hidden Layers</Label>
              <Input
                id="layers"
                type="number"
                value={layers}
                onChange={(e) => setLayers(e.target.value)}
                min="1"
                className="w-full"
              />
              <p className="text-sm text-gray-500">
                More layers can learn more complex patterns
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="neurons">Neurons per Layer</Label>
              <Input
                id="neurons"
                type="number"
                value={neurons}
                onChange={(e) => setNeurons(e.target.value)}
                min="1"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="epochs">Training Epochs</Label>
              <Input
                id="epochs"
                type="number"
                value={epochs}
                onChange={(e) => setEpochs(e.target.value)}
                min="1"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="learningRate">Learning Rate</Label>
              <Input
                id="learningRate"
                type="number"
                value={learningRate}
                onChange={(e) => setLearningRate(e.target.value)}
                step="0.001"
                min="0.0001"
                max="1"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="activation">Activation Function</Label>
              <Select value={activation} onValueChange={setActivation}>
                <SelectTrigger id="activation">
                  <SelectValue placeholder="Select activation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relu">ReLU</SelectItem>
                  <SelectItem value="sigmoid">Sigmoid</SelectItem>
                  <SelectItem value="tanh">Tanh</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleAnalysis} 
            disabled={isAnalyzing}
            className="w-full mt-6"
          >
            {isAnalyzing ? "Training Network..." : "Train Neural Network"}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {results && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6" />
              Training Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.error ? (
              <Alert variant="destructive">
                <AlertDescription>{results.error}</AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-6">
                {/* Accuracy Score */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Model Accuracy</h3>
                  <p className="text-3xl font-bold text-green-600">
                    {(results.accuracy! * 100).toFixed(1)}%
                  </p>
                </div>

                {/* Network Visualization */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <NetworkVisualization
                    layers={parseInt(layers)}
                    neuronsPerLayer={parseInt(neurons)}
                    accuracy={results.accuracy!}
                  />
                </div>

                {/* Results Interpretation */}
                <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                  <h3 className="font-semibold text-lg">Understanding Your Results</h3>
                  
                  {/* Performance Analysis */}
                  <div>
                    <h4 className="font-medium text-blue-800">Model Performance</h4>
                    <p className="text-sm text-gray-700">
                      Your neural network achieved {(results.accuracy! * 100).toFixed(1)}% accuracy. 
                      {results.accuracy! > 0.85 ? 
                        " This indicates excellent learning of the forest patterns." :
                        " There might be room for improvement through parameter tuning."}
                    </p>
                  </div>

                  {/* Architecture Impact */}
                  <div>
                    <h4 className="font-medium text-blue-800">Network Architecture Impact</h4>
                    <p className="text-sm text-gray-700">
                      Your configuration:
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>
                          <span className="font-medium">{layers} hidden layers</span>: 
                          {parseInt(layers) <= 2 ? 
                            " A simpler architecture good for basic patterns." :
                            " Deep architecture capable of learning complex features."}
                        </li>
                        <li>
                          <span className="font-medium">{neurons} neurons per layer</span>: 
                          {parseInt(neurons) < 32 ? 
                            " Conservative capacity, might miss some patterns." :
                            " Good capacity for learning detailed features."}
                        </li>
                        <li>
                          <span className="font-medium">{activation} activation</span>: 
                          {activation === 'relu' ? 
                            " Fast learning, good for most forestry tasks." :
                            " Specialized activation for specific pattern types."}
                        </li>
                      </ul>
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-medium text-blue-800">Optimization Suggestions</h4>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {results.accuracy! < 0.85 && (
                        <li>Consider increasing the number of neurons or layers</li>
                      )}
                      {parseInt(epochs) < 50 && (
                        <li>Try training for more epochs to improve learning</li>
                      )}
                      {parseFloat(learningRate) > 0.01 && (
                        <li>Consider reducing the learning rate for more stable training</li>
                      )}
                      <li>
                        {results.accuracy! > 0.85 
                          ? "Model is performing well and ready for deployment"
                          : "Further tuning could improve performance"}
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Predictions Table */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">Sample Predictions</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Actual
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Predicted
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Match
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {results.predictions?.map((pred, idx) => (
                          <tr key={idx}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {pred.actual}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {pred.predicted}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {pred.actual === pred.predicted ? (
                                <span className="text-green-600">✓</span>
                              ) : (
                                <span className="text-red-600">✗</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NeuralNetworkAnalysis; 