import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TreePine } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DecisionTreeDetailsPage = ({ onBack }: { onBack: () => void }) => {
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
    
    h2, h3 {
      color: #166534;
      margin-top: 2em;
    }
    
    .intro {
      background: linear-gradient(to right, #f0fdf4, #dcfce7);
      padding: 2em;
      border-radius: 0.5em;
      margin: 2em 0;
    }
    
    .example {
      background: #f8fafc;
      padding: 1.5em;
      border-radius: 0.5em;
      margin: 1em 0;
      border-left: 4px solid #22c55e;
    }
    
    .decision-path {
      background: #f0fdf4;
      padding: 1em;
      border-radius: 0.5em;
      margin: 1em 0;
    }
    
    .decision-path ol {
      list-style-type: none;
      padding-left: 1em;
    }
    
    .decision-path ol li {
      margin: 0.5em 0;
      padding-left: 0;
    }
    
    .decision-path ol li:before {
      content: none;
    }
    
    .advantages, .disadvantages {
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
      content: "🌳";
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
      content: counter(list-counter) ". 🌳";
      width: 2.5em;
      left: -1em;
    }
  </style>
</head>
<body>
  <div class="content">
    <div class="intro">
      <p>
        Imagine you're a forester walking through a stand of trees, and you need to quickly assess 
        the health of individual trees to identify those that might need attention or removal. You 
        don't have time for detailed measurements on every single tree, so you rely on a series of 
        observations and quick judgments.
      </p>
    </div>

    <h2>Understanding Decision Trees</h2>
    <p>
      A Decision Tree is like a step-by-step guide or a flowchart that helps you make these decisions 
      based on a series of questions. It's a way of breaking down a complex decision into a series of 
      simpler choices.
    </p>

    <div class="example">
      <h3>Forestry Questions at Each Step (Nodes)</h3>
      <ul>
        <li>Starting at the root node: "Does the tree have any visible signs of disease or damage?"</li>
        <li>Branch 1: "Are there signs of insect infestation?"</li>
        <li>Branch 2: "Is the tree's crown showing signs of thinning or dieback?"</li>
      </ul>
    </div>

    <h3>Example Decision Paths</h3>
    <div class="decision-path">
      <h4>Path 1:</h4>
      <ol>
        <li>Question 1: Does the tree have visible signs of disease or damage? Answer: Yes.</li>
        <li>Question 2: Are there signs of insect infestation? Answer: Yes.</li>
        <li>Decision: "Tree requires removal due to insect infestation."</li>
      </ol>

      <h4>Path 2:</h4>
      <ol>
        <li>Question 1: Does the tree have visible signs of disease or damage? Answer: No.</li>
        <li>Question 2: Is the tree's crown showing signs of thinning or dieback? Answer: Yes.</li>
        <li>Decision: "Monitor tree for potential health issues."</li>
      </ol>
    </div>

    <h2>Practical Applications</h2>
    <div class="example">
      <h3>Forestry Examples</h3>
      <ul>
        <li>Classifying Forest Habitats based on soil moisture, elevation, and canopy cover</li>
        <li>Predicting the Success of Tree Planting in reforestation projects</li>
        <li>Identifying Trees Susceptible to Windthrow using height-to-diameter ratio</li>
      </ul>
    </div>

    <h2>Pros and Cons</h2>
    <div class="advantages">
      <h3>Advantages</h3>
      <ul>
        <li>Easy to Understand and Interpret: Intuitive tree structure</li>
        <li>Can Handle Different Types of Data: Both categorical and numerical</li>
        <li>Requires Little Data Preparation: Less sensitive to outliers</li>
        <li>Can Identify Important Factors: Reveals key decision points</li>
      </ul>
    </div>

    <div class="disadvantages">
      <h3>Disadvantages</h3>
      <ul>
        <li>Can Overfit the Data: May become too complex</li>
        <li>Can Be Unstable: Sensitive to small data changes</li>
        <li>Less Accurate Than Complex Models: Single trees have limitations</li>
      </ul>
    </div>

    <div class="summary">
      <h2>In a Nutshell</h2>
      <ul>
        <li>A Decision Tree is like a flowchart for making decisions</li>
        <li>It asks a series of forestry-related questions at each step (node)</li>
        <li>The answers guide you along branches to a final decision (leaf)</li>
        <li>The tree learns the best questions to ask based on your data</li>
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
              <TreePine className="h-8 w-8 text-green-600" />
              Decision Trees
            </h1>
            <p className="text-gray-600 mt-2">
              Understanding decision trees in forestry applications
            </p>
          </div>
        </motion.div>
      </div>

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

export default DecisionTreeDetailsPage; 