import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Scenario } from './ScenarioData';

interface Agent {
  id: string;
  name: string;
  color: string;
  active: boolean;
  x: number;
  y: number;
}

interface NeuralNetworkMapProps {
  agents: Agent[];
  isSimulating: boolean;
  onAgentClick: (id: string) => void;
  scenario: Scenario;
}

export function NeuralNetworkMap({ agents, isSimulating, onAgentClick, scenario }: NeuralNetworkMapProps) {
  const [pulseAgents, setPulseAgents] = useState<string[]>([]);
  const [zoom, setZoom] = useState(1);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        const activeAgents = agents.filter(a => a.active && a.id !== 'parent');
        if (activeAgents.length > 0) {
          const randomAgent = activeAgents[Math.floor(Math.random() * activeAgents.length)];
          setPulseAgents(prev => [...prev, randomAgent.id]);
          setTimeout(() => {
            setPulseAgents(prev => prev.filter(id => id !== randomAgent.id));
          }, 1000);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isSimulating, agents]);

  // Gentle orbit animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 0.02);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const centerX = 300;
  const centerY = 200;

  // Calculate orbital positions with gentle movement
  const getOrbitPosition = (agent: Agent) => {
    if (agent.id === 'parent') {
      return { x: centerX, y: centerY };
    }

    const baseX = agent.x - centerX;
    const baseY = agent.y - centerY;
    const radius = Math.sqrt(baseX * baseX + baseY * baseY);
    const angle = Math.atan2(baseY, baseX);
    
    // Gentle orbital motion
    const orbitOffset = time * 0.3;
    const newAngle = angle + orbitOffset;
    
    // Zoom effect - nodes move outward when zoomed
    const zoomRadius = radius * zoom;
    
    return {
      x: centerX + Math.cos(newAngle) * zoomRadius,
      y: centerY + Math.sin(newAngle) * zoomRadius
    };
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.max(0.6, Math.min(1.4, prev + delta)));
  };

  // Get correlation strength for line opacity
  const getCorrelationStrength = (agentId: string) => {
    const correlation = scenario.correlations.find(
      c => c.from === agentId || c.to === agentId
    );
    return correlation ? correlation.strength / 100 : 0.3;
  };

  // Get adaptive glow color based on global risk
  const getAdaptiveGlowColor = () => {
    const risk = scenario.globalRisk;
    if (risk >= 90) return { start: 'rgba(255,0,0,0.8)', end: 'rgba(255,107,53,0)' }; // Red alert
    if (risk >= 80) return { start: 'rgba(255,107,53,0.8)', end: 'rgba(255,165,0,0)' }; // Orange warning
    if (risk >= 70) return { start: 'rgba(255,200,0,0.8)', end: 'rgba(255,200,0,0)' }; // Yellow caution
    return { start: 'rgba(0,255,255,0.8)', end: 'rgba(0,255,255,0)' }; // Cyan calm
  };

  const adaptiveGlow = getAdaptiveGlowColor();

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg 
        width="600" 
        height="400" 
        className="cursor-move"
        onWheel={handleWheel}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <radialGradient id="neuralGlow">
            <stop offset="0%" stopColor={adaptiveGlow.start} />
            <stop offset="100%" stopColor={adaptiveGlow.end} />
          </radialGradient>
        </defs>

        {/* Background neural particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.circle
            key={`particle-${i}`}
            r="1"
            fill="rgba(0,255,255,0.3)"
            initial={{
              cx: Math.random() * 600,
              cy: Math.random() * 400,
              opacity: 0.3
            }}
            animate={{
              cx: [Math.random() * 600, Math.random() * 600],
              cy: [Math.random() * 400, Math.random() * 400],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}

        {/* Connection lines */}
        {agents.filter(a => a.id !== 'parent' && a.active).map(agent => {
          const pos = getOrbitPosition(agent);
          const correlationStrength = getCorrelationStrength(agent.id);
          
          return (
            <g key={`line-${agent.id}`}>
              <motion.line
                x1={centerX}
                y1={centerY}
                x2={pos.x}
                y2={pos.y}
                stroke={agent.color}
                strokeWidth="2"
                opacity={pulseAgents.includes(agent.id) || isSimulating ? correlationStrength * 1.2 : correlationStrength * 0.5}
                filter="url(#glow)"
                animate={pulseAgents.includes(agent.id) ? {
                  strokeWidth: [2, 4, 2],
                  opacity: [correlationStrength * 0.5, correlationStrength * 1.5, correlationStrength * 0.5]
                } : {}}
                transition={{ duration: 1 }}
              />
              
              {/* Data flow particles */}
              {isSimulating && (
                <motion.circle
                  r="3"
                  fill={agent.color}
                  filter="url(#glow)"
                  initial={{ cx: pos.x, cy: pos.y }}
                  animate={{
                    cx: [pos.x, centerX],
                    cy: [pos.y, centerY],
                    opacity: [1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Agent nodes */}
        {agents.map(agent => {
          const isParent = agent.id === 'parent';
          const radius = isParent ? 30 : 25;
          const pos = isParent ? { x: centerX, y: centerY } : getOrbitPosition(agent);
          
          return (
            <g key={agent.id} onClick={() => !isParent && onAgentClick(agent.id)}>
              {/* Outer glow ring */}
              {agent.active && (
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r={radius + 10}
                  fill="url(#neuralGlow)"
                  opacity="0"
                  animate={isSimulating || isParent ? {
                    r: [radius + 10, radius + 20, radius + 10],
                    opacity: [0, 0.3, 0]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              
              {/* Main glow circle */}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={radius}
                fill={agent.active ? agent.color : '#444'}
                opacity={agent.active ? '0.3' : '0.1'}
                filter="url(#glow)"
                animate={agent.active && (isSimulating || isParent) ? {
                  r: [radius, radius + 5, radius],
                  opacity: [0.3, 0.5, 0.3]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Border circle */}
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                r={radius}
                fill="none"
                stroke={agent.active ? agent.color : '#666'}
                strokeWidth="2"
                opacity={agent.active ? '0.8' : '0.3'}
                className={!isParent ? 'cursor-pointer hover:opacity-100' : ''}
                animate={pulseAgents.includes(agent.id) ? {
                  r: [radius, radius + 3, radius],
                  strokeWidth: [2, 3, 2]
                } : {}}
                transition={{ duration: 0.3 }}
              />
              
              {/* Agent label */}
              <text
                x={pos.x}
                y={pos.y + 50}
                textAnchor="middle"
                fill={agent.active ? agent.color : '#666'}
                className="text-xs techno-text pointer-events-none"
              >
                {agent.name}
              </text>
            </g>
          );
        })}

        {/* Center burst effect during simulation complete */}
        {isSimulating && (
          <motion.circle
            cx={centerX}
            cy={centerY}
            r="5"
            fill="#FFFFFF"
            initial={{ opacity: 0, r: 5 }}
            animate={{
              opacity: [0, 1, 0],
              r: [5, 50, 5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity
            }}
          />
        )}
      </svg>
      
      <div className="text-center mt-2 text-xs text-white/60">
        Scroll to zoom • {zoom.toFixed(1)}x magnification
      </div>
    </div>
  );
}