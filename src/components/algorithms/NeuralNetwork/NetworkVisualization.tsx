import React, { useEffect, useRef } from 'react';

interface NetworkVisualizationProps {
  layers: number;
  neuronsPerLayer: number;
  accuracy: number;
}

const NetworkVisualization: React.FC<NetworkVisualizationProps> = ({
  layers,
  neuronsPerLayer,
  accuracy,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  // Calculate colors based on accuracy
  const getNodeColor = (layerIndex: number) => {
    const baseColor = accuracy > 0.8 ? 'rgb(34, 197, 94)' : 'rgb(59, 130, 246)';
    const opacity = 0.3 + (layerIndex / layers) * 0.7;
    return baseColor.replace(')', `, ${opacity})`);
  };

  // Particle system for data flow visualization
  class Particle {
    x: number;
    y: number;
    speed: number;
    progress: number;
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    size: number;

    constructor(fromX: number, fromY: number, toX: number, toY: number) {
      this.fromX = fromX;
      this.fromY = fromY;
      this.toX = toX;
      this.toY = toY;
      this.x = fromX;
      this.y = fromY;
      this.speed = 0.01 + Math.random() * 0.01;
      this.progress = 0;
      this.size = 2;
    }

    update() {
      this.progress += this.speed;
      if (this.progress >= 1) this.progress = 0;

      // Cubic bezier curve for smooth movement
      const t = this.progress;
      const cx = (this.fromX + this.toX) / 2;
      const cy = (this.fromY + this.toY) / 2 + 50; // Control point offset

      this.x = Math.pow(1-t, 2) * this.fromX + 2 * (1-t) * t * cx + Math.pow(t, 2) * this.toX;
      this.y = Math.pow(1-t, 2) * this.fromY + 2 * (1-t) * t * cy + Math.pow(t, 2) * this.toY;
    }

    draw(ctx: CanvasRenderingContext2D) {
      const alpha = Math.sin(this.progress * Math.PI);
      ctx.fillStyle = `rgba(${accuracy > 0.8 ? '34, 197, 94' : '59, 130, 246'}, ${alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * alpha, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const particles: Particle[] = [];
    const particlesPerConnection = 3;
    const inputNodes = 4;
    const outputNodes = 3;
    const allLayers = [inputNodes, ...Array(layers).fill(neuronsPerLayer), outputNodes];

    // Calculate node positions and create particles between them
    const layerWidth = canvas.offsetWidth / (allLayers.length - 1);
    for (let i = 0; i < allLayers.length - 1; i++) {
      const fromLayer = allLayers[i];
      const toLayer = allLayers[i + 1];
      const fromX = i * layerWidth + 40;
      const toX = (i + 1) * layerWidth + 40;

      for (let from = 0; from < Math.min(fromLayer, 6); from++) {
        for (let to = 0; to < Math.min(toLayer, 6); to++) {
          const fromY = (canvas.offsetHeight / (Math.min(fromLayer, 6) + 1)) * (from + 1);
          const toY = (canvas.offsetHeight / (Math.min(toLayer, 6) + 1)) * (to + 1);
          
          for (let p = 0; p < particlesPerConnection; p++) {
            particles.push(new Particle(fromX, fromY, toX, toY));
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw connection lines (faded)
      ctx.strokeStyle = 'rgba(156, 163, 175, 0.1)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < allLayers.length - 1; i++) {
        const fromLayer = allLayers[i];
        const toLayer = allLayers[i + 1];
        const fromX = i * layerWidth + 40;
        const toX = (i + 1) * layerWidth + 40;

        for (let from = 0; from < Math.min(fromLayer, 6); from++) {
          for (let to = 0; to < Math.min(toLayer, 6); to++) {
            const fromY = (canvas.offsetHeight / (Math.min(fromLayer, 6) + 1)) * (from + 1);
            const toY = (canvas.offsetHeight / (Math.min(toLayer, 6) + 1)) * (to + 1);
            
            ctx.beginPath();
            ctx.moveTo(fromX, fromY);
            ctx.lineTo(toX, toY);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [layers, neuronsPerLayer, accuracy]);

  // Generate static nodes
  const generateNodes = () => {
    const inputNodes = 4;
    const outputNodes = 3;
    const allLayers = [inputNodes, ...Array(layers).fill(neuronsPerLayer), outputNodes];
    
    return (
      <div className="flex justify-between items-center w-full h-64 px-8 relative z-10">
        {allLayers.map((nodeCount, layerIndex) => (
          <div
            key={layerIndex}
            className="flex flex-col justify-center items-center gap-2"
          >
            {Array(Math.min(nodeCount, 6)).fill(0).map((_, nodeIndex) => (
              <div
                key={nodeIndex}
                className="relative"
              >
                <div
                  className="w-4 h-4 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: getNodeColor(layerIndex),
                    boxShadow: `0 0 8px ${getNodeColor(layerIndex)}`,
                  }}
                />
                {nodeCount > 6 && nodeIndex === 3 && (
                  <div className="text-gray-500 text-xs mt-1">...</div>
                )}
              </div>
            ))}
            {layerIndex === 0 && (
              <div className="text-xs text-gray-500 mt-2">Input Layer</div>
            )}
            {layerIndex > 0 && layerIndex < allLayers.length - 1 && (
              <div className="text-xs text-gray-500 mt-2">Hidden Layer {layerIndex}</div>
            )}
            {layerIndex === allLayers.length - 1 && (
              <div className="text-xs text-gray-500 mt-2">Output Layer</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg border">
      <h3 className="text-lg font-semibold mb-4">Network Architecture</h3>
      <div className="relative" style={{ height: '16rem' }}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: 0 }}
        />
        {generateNodes()}
      </div>
    </div>
  );
};

export default NetworkVisualization; 