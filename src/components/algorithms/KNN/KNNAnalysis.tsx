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
import { TreePine, Ruler, Target, Leaf } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface KNNAnalysisProps {
  data: any[];
  onAnalysisComplete?: (results: any) => void;
}

interface AnalysisResults {
  accuracy?: number;
  predictions?: any[];
  confusionMatrix?: number[][];
  error?: string;
}

const KNNAnalysis: React.FC<KNNAnalysisProps> = ({ data, onAnalysisComplete }) => {
  const [neighbors, setNeighbors] = useState<string>("5");
  const [metric, setMetric] = useState<string>("euclidean");
  const [weights, setWeights] = useState<string>("uniform");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);

  const handleAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate analysis with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock results - replace with actual KNN analysis
      const mockResults = {
        accuracy: 0.85,
        predictions: [
          { actual: "Pine", predicted: "Pine" },
          { actual: "Oak", predicted: "Oak" },
          { actual: "Maple", predicted: "Pine" },
        ],
        confusionMatrix: [
          [10, 2, 1],
          [1, 8, 2],
          [2, 1, 9],
        ],
      };

      setResults(mockResults);

      if (onAnalysisComplete) {
        onAnalysisComplete({
          algorithm: "KNN",
          parameters: {
            n_neighbors: parseInt(neighbors),
            metric: metric,
            weights: weights,
          },
          results: mockResults,
        });
      }
    } catch (error) {
      console.error("Error during KNN analysis:", error);
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
          <CardTitle className="text-2xl">K-NN: Your "Look-Alike" Approach to Forestry Data</CardTitle>
          <CardDescription className="text-lg">
            A straightforward yet powerful tool that helps you classify or predict based on the characteristics 
            of the most similar data points in your forest.
          </CardDescription>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p className="text-gray-700">
            Imagine you're identifying a tree species in the field. You might look at its bark, leaves, 
            and overall shape, comparing it to trees you already know. K-Nearest Neighbors (K-NN) works 
            on a similar principle for your data.
          </p>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6" />
            How K-NN Works in Your Forest
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Mapping Your Forest</h3>
              <p className="text-gray-700">
                Think of your data (DBH, height, canopy cover, remote sensing data) as points on a map. 
                Each tree or stand has its own location based on these measurements.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Finding the "K" Closest</h3>
              <p className="text-gray-700">
                K-NN calculates the "distance" between data points and finds the K most similar examples 
                to make predictions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TreePine className="h-6 w-6" />
            Practical Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Leaf className="h-5 w-5" />
                Species Identification
              </h3>
              <p className="text-sm text-gray-700">
                Match unknown trees to known examples using field data and remote sensing.
              </p>
            </div>
            {/* Add more application cards here */}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ruler className="h-6 w-6" />
            Run KNN Analysis
          </CardTitle>
          <CardDescription>
            Configure and run your K-Nearest Neighbors analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="neighbors">Number of Neighbors (K)</Label>
              <Input
                id="neighbors"
                type="number"
                value={neighbors}
                onChange={(e) => setNeighbors(e.target.value)}
                min="1"
                className="w-full"
              />
              <p className="text-sm text-gray-500">
                Start with a small number and adjust based on results
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metric">Distance Metric</Label>
              <Select value={metric} onValueChange={setMetric}>
                <SelectTrigger id="metric">
                  <SelectValue placeholder="Select distance metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="euclidean">Euclidean</SelectItem>
                  <SelectItem value="manhattan">Manhattan</SelectItem>
                  <SelectItem value="minkowski">Minkowski</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weights">Weight Function</Label>
              <Select value={weights} onValueChange={setWeights}>
                <SelectTrigger id="weights">
                  <SelectValue placeholder="Select weight function" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uniform">Uniform</SelectItem>
                  <SelectItem value="distance">Distance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleAnalysis} 
            disabled={isAnalyzing}
            className="w-full mt-6"
          >
            {isAnalyzing ? "Analyzing..." : "Run KNN Analysis"}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {results && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6" />
              Analysis Results
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

                {/* Results Interpretation */}
                <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                  <h3 className="font-semibold text-lg">Understanding Your Results</h3>
                  
                  {/* Accuracy Explanation */}
                  <div>
                    <h4 className="font-medium text-blue-800">Accuracy Score: {(results.accuracy! * 100).toFixed(1)}%</h4>
                    <p className="text-sm text-gray-700">
                      This means your model correctly identified tree species {(results.accuracy! * 100).toFixed(1)}% of the time. 
                      {results.accuracy! > 0.8 ? 
                        " This is a strong performance, suggesting the model is reliable for species identification." :
                        " There might be room for improvement - try adjusting the number of neighbors or distance metric."}
                    </p>
                  </div>

                  {/* Prediction Pattern Analysis */}
                  <div>
                    <h4 className="font-medium text-blue-800">Prediction Patterns</h4>
                    <p className="text-sm text-gray-700">
                      Looking at the sample predictions above:
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>
                          Strong predictions: {results.predictions?.filter(p => p.actual === p.predicted).length} out of {results.predictions?.length} samples 
                          were correctly identified
                        </li>
                        <li>
                          Common confusions: {results.predictions?.filter(p => p.actual !== p.predicted).length} misclassifications 
                          {results.predictions?.find(p => p.actual !== p.predicted) && 
                            ` (e.g., ${results.predictions.find(p => p.actual !== p.predicted)?.actual} 
                            mistaken for ${results.predictions.find(p => p.actual !== p.predicted)?.predicted})`}
                        </li>
                      </ul>
                    </p>
                  </div>

                  {/* Parameter Impact */}
                  <div>
                    <h4 className="font-medium text-blue-800">Impact of Your Settings</h4>
                    <p className="text-sm text-gray-700">
                      Your chosen parameters affected the analysis:
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>
                          <span className="font-medium">K={neighbors}</span>: 
                          {parseInt(neighbors) < 5 ? 
                            " A small number of neighbors makes the model more sensitive to local patterns but might be less stable." :
                            " Using more neighbors typically gives more stable predictions but might miss local patterns."}
                        </li>
                        <li>
                          <span className="font-medium">Metric: {metric}</span>: 
                          {metric === 'euclidean' ? 
                            " Euclidean distance works well for most forestry data, treating all features equally." :
                            metric === 'manhattan' ? 
                            " Manhattan distance might be more robust to outliers in your measurements." :
                            " Minkowski distance provides a flexible approach to measuring similarity."}
                        </li>
                        <li>
                          <span className="font-medium">Weights: {weights}</span>: 
                          {weights === 'uniform' ? 
                            " All neighbors have equal influence on the prediction." :
                            " Closer neighbors have more influence on the prediction."}
                        </li>
                      </ul>
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-medium text-blue-800">Recommendations</h4>
                    <p className="text-sm text-gray-700">
                      Based on these results:
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        {results.accuracy! < 0.8 && (
                          <li>Consider increasing K to get more stable predictions</li>
                        )}
                        {results.accuracy! < 0.7 && (
                          <li>Try different distance metrics to better capture similarities</li>
                        )}
                        {weights === 'uniform' && results.accuracy! < 0.75 && (
                          <li>Experiment with distance-based weights to give more importance to closer neighbors</li>
                        )}
                        <li>
                          {results.accuracy! > 0.8 
                            ? "The model is performing well and ready for practical use"
                            : "Further tuning might improve performance"}
                        </li>
                      </ul>
                    </p>
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

                {/* Parameters Used */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Analysis Parameters</h3>
                  <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <dt className="text-sm text-gray-500">Neighbors (K)</dt>
                      <dd className="text-lg font-medium">{neighbors}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Distance Metric</dt>
                      <dd className="text-lg font-medium capitalize">{metric}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Weight Function</dt>
                      <dd className="text-lg font-medium capitalize">{weights}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tips Section */}
      <Card>
        <CardHeader>
          <CardTitle>Tips for Success</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 list-disc pl-5">
            <li className="text-gray-700">Clean Data is Key: Ensure accurate measurements for precise comparisons</li>
            <li className="text-gray-700">Finding the Right 'K': Start small and adjust based on accuracy</li>
            <li className="text-gray-700">Handle Rare Cases: Adjust for uncommon species or conditions</li>
            <li className="text-gray-700">Efficiency Matters: Consider optimization for large datasets</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default KNNAnalysis; 