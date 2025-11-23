import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface AgentCardProps {
  name: string;
  metric: string;
  value: number;
  unit: string;
  data: number[];
  color: string;
  glowClass: string;
  onViewDashboard: () => void;
  riskLevel: 'low' | 'medium' | 'high';
}

export function AgentCard({ name, metric, value, unit, data, color, glowClass, onViewDashboard, riskLevel }: AgentCardProps) {
  const chartData = data.map((val, idx) => ({ value: val }));
  
  const riskColors = {
    low: 'bg-green-500/20 text-green-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    high: 'bg-red-500/20 text-red-400'
  };

  return (
    <div className={`glass-panel p-4 ${glowClass} transition-all hover:scale-105 cursor-pointer`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="techno-text text-sm mb-1">{name}</h4>
          <div className="text-xs text-white/60">{metric}</div>
        </div>
        <div className={`px-2 py-1 rounded text-xs ${riskColors[riskLevel]}`}>
          {riskLevel.toUpperCase()}
        </div>
      </div>
      
      <div className="mb-3">
        <div className="techno-text text-2xl" style={{ color }}>{value} <span className="text-sm text-white/60">{unit}</span></div>
      </div>

      <div className="h-12 mb-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button 
        onClick={onViewDashboard}
        className="w-full py-2 rounded-lg text-sm transition-all"
        style={{ 
          background: `linear-gradient(90deg, ${color}20, ${color}10)`,
          border: `1px solid ${color}40`,
          color: color
        }}
      >
        View Dashboard
      </button>
    </div>
  );
}
