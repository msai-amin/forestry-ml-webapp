import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trees, CheckSquare, Shuffle, Users, TreePine } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RandomForestDetailsPage = ({ onBack }: { onBack: () => void }) => {
  const content = `
<!DOCTYPE html>
<html>
<head>
  <style>
    .content {
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      color: #374151;
    }
    
    h1, h2, h3 {
      color: #166534;
      margin-top: 2em;
    }
    
    .intro {
      background: linear-gradient(to right, #f0fdf4, #dcfce7);
      padding: 2em;
      border-radius: 0.5em;
      margin: 2em 0;
    }
    
    .forester-example {
      background: #f8fafc;
      padding: 1.5em;
      border-radius: 0.5em;
      margin: 1em 0;
      border-left: 4px solid #22c55e;
    }
    
    .key-point {
      background: #f0fdf4;
      padding: 1em;
      border-radius: 0.5em;
      margin: 1em 0;
    }
    
    .example-list {
      background: #f1f5f9;
      padding: 1.5em;
      border-radius: 0.5em;
      margin: 1em 0;
    }
    
    ul {
      list-style-type: none;
      padding-left: 0;
    }
    
    li {
      margin: 0.8em 0;
      padding-left: 9em;
      position: relative;
      display: flex;
      align-items: flex-start;
      gap: 0.5em;
    }
    
    li:before {
      content: "🌲";
      position: absolute;
      left: -0.9em;
      top: 0.1em;
      flex-shrink: 0;
    }

    ol li {
      counter-increment: list-counter;
      padding-left: 10em;
    }

    ol li:before {
      content: counter(list-counter) ". 🌲";
      width: 2.5em;
      left: -1em;
    }
  </style>
</head>
<body>
  <div class="content">
    <div class="intro">
      <p>
        Imagine you're a forester trying to determine if a particular patch of forest is at high risk 
        for a bark beetle infestation. You have a lot of information about that patch: the dominant 
        tree species, the age of the trees, the density of the stand, the average temperature, the 
        amount of rainfall in the past year, and even the elevation.
      </p>
    </div>

    <h2>Each Decision Tree: A Forester with a Checklist</h2>
    <div class="forester-example">
      <p>
        Think of each individual decision tree in a Random Forest as a different experienced forester, 
        each with their own way of assessing the risk. Instead of just asking general questions, each 
        "forester" in our Random Forest follows a specific checklist of forestry-related questions.
      </p>
      <ul>
        <li>Forester 1's Checklist: Species susceptibility and tree age</li>
        <li>Forester 2's Checklist: Stand density and drought conditions</li>
      </ul>
    </div>

    <h2>The "Randomness" in a Forestry Context</h2>
    <div class="key-point">
      <h3>Random Selection of Forest Factors</h3>
      <ul>
        <li>Some foresters focus on species, age, and density</li>
        <li>Others examine temperature, rainfall, and elevation</li>
      </ul>
    </div>

    <h2>Forestry Applications</h2>
    <div class="example-list">
      <ul>
        <li>Predicting Tree Species from Satellite Imagery</li>
        <li>Assessing Forest Fire Risk</li>
        <li>Estimating Timber Volume</li>
        <li>Identifying Areas Suitable for Reforestation</li>
      </ul>
    </div>

    <h2>Why Foresters Find Random Forests Useful</h2>
    <div class="key-point">
      <ul>
        <li>Handles Complex Forest Data</li>
        <li>Robust to Noisy Data</li>
        <li>Provides Feature Importance</li>
        <li>Good Performance Without Extensive Tuning</li>
      </ul>
    </div>
  </div>
</body>
</html>
  `;

  return (
    <div className="space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="hover:bg-green-50"
          >
            <ArrowLeft className="h-5 w-5 text-green-600" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Trees className="h-8 w-8 text-green-600" />
              Random Forests
            </h1>
            <p className="text-gray-600 mt-2">
              Understanding ensemble learning in forestry applications
            </p>
          </div>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          { icon: Trees, label: "Decision Trees", value: "Multiple" },
          { icon: CheckSquare, label: "Feature Selection", value: "Random" },
          { icon: Shuffle, label: "Data Sampling", value: "Bootstrap" },
          { icon: Users, label: "Ensemble Method", value: "Voting" },
        ].map((stat, idx) => (
          <Card key={idx} className="bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <stat.icon className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Content */}
      <Card>
        <CardContent className="p-6">
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RandomForestDetailsPage; 