// src/components/trees/TreeVisualizer.tsx

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTreeData } from '../../hooks/useTreeData';
import { TreeNode } from '../../utils/types';

interface TreeVisualizerProps {
  data: TreeNode;
  width?: number;
  height?: number;
  onNodeClick?: (node: TreeNode) => void;
}

export const TreeVisualizer: React.FC<TreeVisualizerProps> = ({
  data,
  width = 800,
  height = 600,
  onNodeClick
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { processedData, updateNode } = useTreeData(data);

  useEffect(() => {
    if (!svgRef.current || !processedData) return;

    // Clear previous rendering
    d3.select(svgRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 90, bottom: 30, left: 90 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create the tree layout
    const treeLayout = d3.tree<TreeNode>()
      .size([innerHeight, innerWidth]);

    // Creates hierarchy from data
    const root = d3.hierarchy(processedData);
    
    // Assigns the data to the tree layout
    const treeData = treeLayout(root);

    // Create the SVG container
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add links between nodes
    svg.selectAll('.link')
      .data(treeData.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkVertical()
        .x(d => d.x)
        .y(d => d.y))
      .style('fill', 'none')
      .style('stroke', '#ccc')
      .style('stroke-width', 2);

    // Add nodes
    const nodes = svg.selectAll('.node')
      .data(treeData.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .on('click', (event, d) => {
        event.stopPropagation();
        onNodeClick?.(d.data);
      });

    // Add circles for nodes
    nodes.append('circle')
      .attr('r', 10)
      .style('fill', d => d.data.confidence ? 
        d3.interpolateGreens(d.data.confidence) : '#fff')
      .style('stroke', '#2c6e49')
      .style('stroke-width', 2);

    // Add labels
    nodes.append('text')
      .attr('dy', '.35em')
      .attr('x', d => d.children ? -13 : 13)
      .style('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.value)
      .style('font-size', '12px')
      .style('font-family', 'Arial');

  }, [processedData, width, height, onNodeClick]);

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ minHeight: height }}
      />
    </div>
  );
};

// src/hooks/useTreeData.ts

import { useState, useCallback } from 'react';
import { TreeNode } from '../utils/types';

export const useTreeData = (initialData: TreeNode) => {
  const [processedData, setProcessedData] = useState<TreeNode>(initialData);

  const updateNode = useCallback((nodeId: string, updates: Partial<TreeNode>) => {
    const updateNodeRecursive = (node: TreeNode): TreeNode => {
      if (node.id === nodeId) {
        return { ...node, ...updates };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(updateNodeRecursive)
        };
      }
      return node;
    };

    setProcessedData(prev => updateNodeRecursive(prev));
  }, []);

  const calculateConfidence = useCallback((node: TreeNode): number => {
    if (!node.children) {
      return node.confidence || 1;
    }
    
    const childConfidences = node.children.map(calculateConfidence);
    return childConfidences.reduce((acc, curr) => acc + curr, 0) / childConfidences.length;
  }, []);

  return {
    processedData,
    updateNode,
    calculateConfidence
  };
};