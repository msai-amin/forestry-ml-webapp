import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SVMDetailsPage = ({ onBack }: { onBack: () => void }) => {
  const content = `
<!DOCTYPE html>
<html>
<head>
  <style>
    .content {
      font-family: system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      color: #374151;
      max-width: 100%;
      margin: 0 auto;
    }
    
    h1, h2, h3 {
      color: #1e3a8a;
      margin-top: 2em;
    }
    
    h1 { font-size: 2.5em; }
    h2 { font-size: 2em; }
    h3 { font-size: 1.5em; }
    
    .math {
      background: #f8fafc;
      padding: 1em;
      border-radius: 0.5em;
      margin: 1em 0;
      font-family: monospace;
    }
    
    .note {
      background: #f0fdf4;
      border-left: 4px solid #22c55e;
      padding: 1em;
      margin: 1em 0;
    }
    
    ul, ol {
      padding-left: 2em;
      margin: 1em 0;
    }
    
    .section {
      margin: 2em 0;
      padding-bottom: 2em;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .subsection {
      margin: 2em 0;
      padding: 1em;
      background: #f8fafc;
      border-radius: 0.5em;
    }
    
    .summary {
      margin-top: 2em;
      padding: 1em;
      background: #f0f9ff;
      border-radius: 0.5em;
      border-left: 4px solid #3b82f6;
    }
    
    .summary ul {
      list-style-type: none;
      padding-left: 0;
    }
    
    .summary li {
      margin: 0.5em 0;
      padding-left: 1.5em;
      position: relative;
    }
    
    .summary li:before {
      content: "•";
      position: absolute;
      left: 0.5em;
      color: #3b82f6;
    }
  </style>
</head>
<body>
  <div class="content">
    <h1>Support Vector Machines in Forestry</h1>
    
    <div class="section">
      <p>
        Imagine you're a forest ranger soaring above a vast woodland in a helicopter, scanning miles of lush canopy. 
        Amid the green, you spot patches of diseased trees, areas of potential fire risk, and stands of different species. 
        You need a robust way to classify and predict these regions accurately. That's where Support Vector Machines (SVMs) 
        step in—acting as your dependable compass in the world of data-driven forest management.
      </p>
    </div>

    <div class="section">
      <h2>1. Why SVMs Matter</h2>
      <div class="note">
        <p>
          Picture a forest reserve at risk of invasive species spreading through the canopy. Rangers receive satellite 
          and drone imagery daily, inundated with massive amounts of tree canopy data. Manually identifying infestation 
          zones consumes precious time—time that could be spent mitigating damage.
        </p>
      </div>
    </div>

    <div class="section">
      <h2>2. Forest Analogies</h2>
      
      <div class="note">
        <h3>A Mushroom Sorting Analogy</h3>
        <p>
          Let's imagine you're trying to sort different types of mushrooms you found in the forest. 
          You have two main types: edible and poisonous. You've collected a bunch, and now you need 
          to separate them. You notice some key differences: edible ones are generally rounder and 
          have a lighter color, while poisonous ones are often flatter and darker.
        </p>
        <p>
          SVMs are like a super-smart sorting machine. You feed it examples of edible and poisonous 
          mushrooms, telling it which is which. The SVM then learns the best way to draw a line 
          (or a more complex boundary in higher dimensions) to separate the two groups.
        </p>
      </div>

      <div class="subsection">
        <h3>The "Hyperplane": The Perfect Dividing Line</h3>
        <p>
          In the mushroom example, the line you draw on the table is like the hyperplane in SVMs. 
          It's the decision boundary that separates the different categories. If you only have two 
          features (like roundness and color), the hyperplane is a simple line. If you have more 
          features (like stem thickness, cap texture, etc.), the hyperplane becomes a more complex, 
          higher-dimensional surface.
        </p>
        <div class="math">
          w₁x₁ + w₂x₂ + b = 0
        </div>
      </div>

      <div class="subsection">
        <h3>The "Margin": Giving Space for Error</h3>
        <p>
          Now, you could draw many lines that separate the edible and poisonous mushrooms. But some 
          lines are better than others. Imagine drawing a line very close to a poisonous mushroom. 
          What if you find a new mushroom that's very similar to that one? Your line might misclassify it.
        </p>
        <p>
          SVMs try to find the line that has the biggest "buffer zone" or margin around it. Think of 
          it like drawing two extra lines parallel to your main dividing line, one on each side.
        </p>
      </div>

      <div class="subsection">
        <h3>The "Kernel Trick": When a Straight Line Isn't Enough</h3>
        <p>
          Sometimes, you can't separate the mushrooms with a simple straight line. Imagine the edible 
          and poisonous mushrooms are mixed in a way that forms a circle within the other. A straight 
          line won't work.
        </p>
        <p>
          This is where the kernel trick comes in. It's like magically lifting the mushrooms off the 
          table and rearranging them in a way that can be separated by a straight line in this new, 
          higher dimension.
        </p>
        <div class="math">
          K(xi,xj) = (xiᵀxj + c)ᵈ<br>
          K(xi,xj) = exp(-2σ²||xi-xj||²)
        </div>
      </div>

      <div class="summary">
        <h3>In a nutshell:</h3>
        <ul>
          <li>SVMs are like smart sorters.</li>
          <li>They find the best dividing line (hyperplane) to separate different categories.</li>
          <li>They create a wide "buffer zone" (margin) for better reliability.</li>
          <li>Key examples closest to the buffer zone (support vectors) are crucial for defining the line.</li>
          <li>The kernel trick helps when a simple straight line isn't enough to separate the data.</li>
        </ul>
      </div>
    </div>

    <!-- Continue with other sections... -->
    
    <div class="section">
      <h2>Conclusion</h2>
      <p>
        Support Vector Machines offer a powerful, intuitive framework for classifying and predicting crucial forestry data. 
        From rapid disease detection to accurate biomass estimations, SVMs help protect and optimize precious forest 
        resources—turning raw data into actionable insights that safeguard our woodlands for generations to come.
      </p>
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
            className="hover:bg-blue-50"
          >
            <ArrowLeft className="h-5 w-5 text-blue-600" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Maximize2 className="h-8 w-8 text-blue-600" />
              Support Vector Machines
            </h1>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <Card>
        <CardContent className="p-6">
          <div 
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SVMDetailsPage; 