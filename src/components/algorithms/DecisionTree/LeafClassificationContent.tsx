import React, { useState } from 'react';
import { Leaf, Binary, TreePine, Microscope, BrainCircuit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LeafClassificationContent = () => {
  const [activeSection, setActiveSection] = useState('conceptual');

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-green-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Leaf className="text-green-700" />
          Species Classification Using Leaf Characteristics
        </h2>
        <p className="text-gray-700">
          Understanding how decision trees can automate and enhance traditional dendrology 
          through machine learning techniques.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex space-x-4">
        {[
          { id: 'conceptual', icon: BrainCircuit, label: 'Conceptual Framework' },
          { id: 'technical', icon: Binary, label: 'Technical Deep Dive' },
          { id: 'practical', icon: TreePine, label: 'Practical Application' }
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeSection === id 
                ? 'bg-green-100 text-green-800 border-2 border-green-500' 
                : 'bg-gray-50 hover:bg-green-50'
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Conceptual Framework */}
        {activeSection === 'conceptual' && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">From Traditional to Machine Learning</h3>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Traditional dendrology relies on dichotomous keys and expert knowledge. 
                    Decision trees in machine learning mirror this process, but with added 
                    capabilities for handling uncertainty and multiple characteristics simultaneously.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Traditional Approach</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Sequential, binary decisions</li>
                        <li>Requires complete information</li>
                        <li>Limited handling of variations</li>
                        <li>Based on expert-defined rules</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">ML-Enhanced Approach</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Parallel feature analysis</li>
                        <li>Handles missing data</li>
                        <li>Accounts for natural variation</li>
                        <li>Learns patterns from examples</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4">Key Principles</h4>
                  <div className="space-y-3">
                    {[
                      {
                        title: 'Feature Hierarchy',
                        desc: 'Most distinctive characteristics are prioritized in classification'
                      },
                      {
                        title: 'Pattern Recognition',
                        desc: 'System learns to identify complex patterns across multiple features'
                      },
                      {
                        title: 'Uncertainty Management',
                        desc: 'Probabilistic approach to handle natural variations'
                      },
                      {
                        title: 'Continuous Learning',
                        desc: 'Model improves with more examples and expert feedback'
                      }
                    ].map(({ title, desc }) => (
                      <div key={title} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium">{title}</div>
                        <div className="text-sm text-gray-600">{desc}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4">Leaf Feature Analysis</h4>
                  <div className="space-y-3">
                    {[
                      {
                        category: 'Primary Features',
                        items: ['Shape', 'Margin', 'Venation']
                      },
                      {
                        category: 'Secondary Features',
                        items: ['Size', 'Texture', 'Color']
                      },
                      {
                        category: 'Compound Features',
                        items: ['Leaflet Arrangement', 'Rachis Character']
                      },
                      {
                        category: 'Contextual Features',
                        items: ['Season', 'Location', 'Health']
                      }
                    ].map(({ category, items }) => (
                      <div key={category} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium mb-1">{category}</div>
                        <div className="text-sm text-gray-600">
                          {items.join(' • ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Technical Details */}
        {activeSection === 'technical' && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Decision Tree Implementation</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        title: 'Data Collection',
                        steps: [
                          'Standardized leaf measurements',
                          'Multiple samples per species',
                          'Seasonal variations',
                          'Geographic distribution'
                        ]
                      },
                      {
                        title: 'Feature Engineering',
                        steps: [
                          'Shape indices calculation',
                          'Texture analysis',
                          'Venation pattern extraction',
                          'Color normalization'
                        ]
                      },
                      {
                        title: 'Model Training',
                        steps: [
                          'Split criteria selection',
                          'Tree depth optimization',
                          'Cross-validation',
                          'Expert validation'
                        ]
                      }
                    ].map(({ title, steps }) => (
                      <div key={title} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">{title}</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          {steps.map(step => (
                            <li key={step} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Practical Examples */}
        {activeSection === 'practical' && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Real-World Application</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        species: 'Quercus (Oak)',
                        features: {
                          'Leaf Shape': 'Lobed',
                          'Margin': 'Smooth between lobes',
                          'Size Range': '8-15cm',
                          'Key Indicators': 'Deep sinuses, rounded lobes'
                        }
                      },
                      {
                        species: 'Acer (Maple)',
                        features: {
                          'Leaf Shape': 'Palmate',
                          'Margin': 'Serrated',
                          'Size Range': '6-12cm',
                          'Key Indicators': 'Pointed lobes, radial venation'
                        }
                      }
                    ].map(({ species, features }) => (
                      <div key={species} className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">{species}</h4>
                        <div className="space-y-2">
                          {Object.entries(features).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="text-gray-600">{key}:</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Contextual Alert */}
      <Alert>
        <AlertDescription>
          <strong>Note for Professionals:</strong> This system is designed to augment, 
          not replace, expert knowledge. It's particularly valuable for rapid initial 
          assessment and handling large-scale surveys where traditional methods might 
          be time-prohibitive.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default LeafClassificationContent;