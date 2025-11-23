import React, { useState, useEffect } from 'react';
import { ArrowLeft, Cpu, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'motion/react';
import { Scenario } from './ScenarioData';

interface ReasoningOverviewProps {
  onBack: () => void;
  isSimulating: boolean;
  scenario: Scenario;
}

export function ReasoningOverview({ onBack, isSimulating, scenario }: ReasoningOverviewProps) {
  const [insights, setInsights] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const insightMessages = scenario.reasoningInsights;

  useEffect(() => {
    if (isSimulating && currentStep < insightMessages.length) {
      const timer = setTimeout(() => {
        setInsights(prev => [...prev, insightMessages[currentStep]]);
        setCurrentStep(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSimulating, currentStep]);

  useEffect(() => {
    if (!isSimulating) {
      setInsights([]);
      setCurrentStep(0);
    }
  }, [isSimulating]);

  const riskData = [
    { agent: 'Air', risk: scenario.agentMetrics.air.aqi, color: '#00FFFF' },
    { agent: 'Water', risk: Math.round(scenario.agentMetrics.water.ph * 10), color: '#00BFFF' },
    { agent: 'Fire', risk: scenario.agentMetrics.fire.risk, color: '#FF6B35' },
    { agent: 'Waste', risk: scenario.agentMetrics.waste.capacity, color: '#00FF9D' },
  ];

  // Transform data for line chart - create time series data
  const lineChartData = [
    { time: 'T-60min', Air: scenario.agentMetrics.air.aqi - 15, Water: Math.round(scenario.agentMetrics.water.ph * 10) - 12, Fire: scenario.agentMetrics.fire.risk - 20, Waste: scenario.agentMetrics.waste.capacity - 18 },
    { time: 'T-45min', Air: scenario.agentMetrics.air.aqi - 10, Water: Math.round(scenario.agentMetrics.water.ph * 10) - 8, Fire: scenario.agentMetrics.fire.risk - 15, Waste: scenario.agentMetrics.waste.capacity - 12 },
    { time: 'T-30min', Air: scenario.agentMetrics.air.aqi - 6, Water: Math.round(scenario.agentMetrics.water.ph * 10) - 5, Fire: scenario.agentMetrics.fire.risk - 10, Waste: scenario.agentMetrics.waste.capacity - 8 },
    { time: 'T-15min', Air: scenario.agentMetrics.air.aqi - 2, Water: Math.round(scenario.agentMetrics.water.ph * 10) - 2, Fire: scenario.agentMetrics.fire.risk - 5, Waste: scenario.agentMetrics.waste.capacity - 3 },
    { time: 'Current', Air: scenario.agentMetrics.air.aqi, Water: Math.round(scenario.agentMetrics.water.ph * 10), Fire: scenario.agentMetrics.fire.risk, Waste: scenario.agentMetrics.waste.capacity },
  ];

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="glass-panel p-6 mb-8 glow-cyan">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-cyan-400" />
            </button>
            <div className="flex items-center gap-3">
              <Cpu className="w-8 h-8 text-cyan-400" />
              <div>
                <h2 className="techno-text text-cyan-400">NeuroCore — Central Reasoning Engine</h2>
                <p className="text-sm text-white/60">Multi-domain correlation and predictive analysis</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-cyan-400 techno-text">
              {isSimulating ? 'PROCESSING' : 'STANDBY'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6 mb-8">
        {/* 3D Node Map Visualization */}
        <div className="col-span-3 glass-panel p-6">
          <h3 className="techno-text text-white/80 mb-6">Neural Correlation Map</h3>
          
          <div className="relative h-96 flex items-center justify-center">
            <svg width="600" height="384" className="absolute">
              <defs>
                <filter id="reasoning-glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Central Core */}
              <g>
                <motion.circle
                  cx="300"
                  cy="192"
                  r="40"
                  fill="#FFFFFF"
                  opacity="0.2"
                  filter="url(#reasoning-glow)"
                  animate={isSimulating ? {
                    r: [40, 50, 40],
                    opacity: [0.2, 0.4, 0.2]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <circle cx="300" cy="192" r="40" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" />
                <text x="300" y="197" textAnchor="middle" fill="#FFF" className="text-sm techno-text">
                  NeuroCore
                </text>
              </g>

              {/* Agent Nodes */}
              {[
                { x: 300, y: 50, color: '#00FFFF', name: 'Air', id: 'air' },
                { x: 480, y: 192, color: '#00BFFF', name: 'Water', id: 'water' },
                { x: 300, y: 334, color: '#FF6B35', name: 'Fire', id: 'fire' },
                { x: 120, y: 192, color: '#00FF9D', name: 'Waste', id: 'waste' },
              ].map((agent, idx) => (
                <g key={agent.id}>
                  {/* Connection line */}
                  <motion.line
                    x1="300"
                    y1="192"
                    x2={agent.x}
                    y2={agent.y}
                    stroke={agent.color}
                    strokeWidth="2"
                    opacity="0.3"
                    filter="url(#reasoning-glow)"
                    animate={isSimulating ? {
                      opacity: [0.3, 0.8, 0.3],
                      strokeWidth: [2, 4, 2]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                  />
                  {/* Agent node */}
                  <motion.circle
                    cx={agent.x}
                    cy={agent.y}
                    r="30"
                    fill={agent.color}
                    opacity="0.2"
                    filter="url(#reasoning-glow)"
                    animate={isSimulating ? {
                      r: [30, 35, 30],
                      opacity: [0.2, 0.4, 0.2]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                  />
                  <circle cx={agent.x} cy={agent.y} r="30" fill="none" stroke={agent.color} strokeWidth="2" />
                  <text x={agent.x} y={agent.y + 5} textAnchor="middle" fill={agent.color} className="text-xs techno-text">
                    {agent.name}
                  </text>

                  {/* Data pulse animation */}
                  {isSimulating && (
                    <motion.circle
                      cx={agent.x}
                      cy={agent.y}
                      r="5"
                      fill={agent.color}
                      initial={{ cx: agent.x, cy: agent.y, r: 5, opacity: 1 }}
                      animate={{
                        cx: 300,
                        cy: 192,
                        r: 2,
                        opacity: 0
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.4 }}
                    />
                  )}
                </g>
              ))}
            </svg>
          </div>

          <div className="mt-4 text-center text-sm text-white/60">
            Real-time data flow visualization between agents and central reasoning core
          </div>
        </div>

        {/* Live Insight Log */}
        <div className="col-span-2 glass-panel p-6">
          <h3 className="techno-text text-white/80 mb-6">Live Insight Log</h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {isSimulating && insights.length === 0 && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-cyan-500/10">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-sm text-cyan-400">Initializing deductive analysis...</span>
              </div>
            )}
            
            {insights.map((insight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 rounded-lg bg-white/5 border border-cyan-500/30"
              >
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5" />
                  <div className="flex-1">
                    <div className="text-sm text-white/80">{insight}</div>
                    <div className="text-xs text-white/40 mt-1">
                      {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {!isSimulating && insights.length === 0 && (
              <div className="text-center py-8 text-white/40">
                <Activity className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">System in standby mode</p>
                <p className="text-xs mt-1">Reasoning engine will activate during simulation</p>
              </div>
            )}

            {!isSimulating && insights.length > 0 && (
              <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                <div className="text-xs text-green-400 mb-1">ANALYSIS COMPLETE</div>
                <div className="text-xs text-white/70">All reasoning steps processed successfully.</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Risk Comparison Chart */}
      <div className="glass-panel p-6 mb-6">
        <h3 className="techno-text text-white/80 mb-6">Multi-Agent Risk Trend Analysis</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />
            <XAxis 
              dataKey="time" 
              stroke="#A0AEC0" 
              style={{ fontSize: '12px' }}
              tick={{ fill: '#A0AEC0' }}
            />
            <YAxis 
              stroke="#A0AEC0" 
              style={{ fontSize: '12px' }}
              tick={{ fill: '#A0AEC0' }}
              label={{ value: 'Risk Level', angle: -90, position: 'insideLeft', fill: '#A0AEC0' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(8, 26, 60, 0.95)',
                border: '1px solid rgba(0, 255, 255, 0.4)',
                borderRadius: '8px',
                color: '#fff'
              }}
              labelStyle={{ color: '#00FFFF', fontWeight: 'bold', marginBottom: '8px' }}
              itemStyle={{ color: '#fff', padding: '4px 0' }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
              formatter={(value) => <span style={{ color: '#E2E8F0', fontSize: '13px' }}>{value} Agent</span>}
            />
            <Line 
              type="monotone" 
              dataKey="Air" 
              stroke="#00FFFF" 
              strokeWidth={3}
              dot={{ fill: '#00FFFF', r: 5, strokeWidth: 2, stroke: '#081A3C' }}
              activeDot={{ r: 7, fill: '#00FFFF', stroke: '#FFF', strokeWidth: 2 }}
              animationDuration={1500}
            />
            <Line 
              type="monotone" 
              dataKey="Water" 
              stroke="#00BFFF" 
              strokeWidth={3}
              dot={{ fill: '#00BFFF', r: 5, strokeWidth: 2, stroke: '#081A3C' }}
              activeDot={{ r: 7, fill: '#00BFFF', stroke: '#FFF', strokeWidth: 2 }}
              animationDuration={1500}
              animationBegin={200}
            />
            <Line 
              type="monotone" 
              dataKey="Fire" 
              stroke="#FF6B35" 
              strokeWidth={3}
              dot={{ fill: '#FF6B35', r: 5, strokeWidth: 2, stroke: '#081A3C' }}
              activeDot={{ r: 7, fill: '#FF6B35', stroke: '#FFF', strokeWidth: 2 }}
              animationDuration={1500}
              animationBegin={400}
            />
            <Line 
              type="monotone" 
              dataKey="Waste" 
              stroke="#00FF9D" 
              strokeWidth={3}
              dot={{ fill: '#00FF9D', r: 5, strokeWidth: 2, stroke: '#081A3C' }}
              activeDot={{ r: 7, fill: '#00FF9D', stroke: '#FFF', strokeWidth: 2 }}
              animationDuration={1500}
              animationBegin={600}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center text-sm text-white/50">
          Historical trend comparison showing risk escalation patterns across all agents
        </div>
      </div>

      {/* Summary Insight */}
      <div className="glass-panel p-6">
        <h3 className="techno-text text-white/80 mb-4">System Summary</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <div className="text-xs text-red-400 mb-2 techno-text">ACTIVE SCENARIO</div>
            <div className="text-2xl text-red-400 techno-text mb-1">{scenario.name}</div>
            <p className="text-sm text-white/70">
              {scenario.description}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
            <div className="text-xs text-orange-400 mb-2 techno-text">PREDICTIVE ALERT</div>
            <div className="text-2xl text-orange-400 techno-text mb-1">{scenario.globalRisk}% Risk</div>
            <p className="text-sm text-white/70">
              {scenario.alertMessage}
            </p>
          </div>
        </div>

        {/* Correlation Insights */}
        <div className="mt-6 space-y-3">
          <div className="text-sm techno-text text-cyan-400 mb-3">DETECTED CORRELATIONS</div>
          {scenario.correlations.map((corr, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-white/5 border border-cyan-500/20">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-white/80">
                  {corr.from.toUpperCase()} → {corr.to.toUpperCase()}
                </div>
                <div className="text-xs text-cyan-400 techno-text">{corr.strength}% strength</div>
              </div>
              <div className="text-xs text-white/60">{corr.description}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
          <div className="flex items-start gap-3">
            <Cpu className="w-5 h-5 text-cyan-400 mt-1" />
            <div>
              <div className="text-sm techno-text text-cyan-400 mb-1">REASONING ENGINE STATUS</div>
              <p className="text-sm text-white/70">
                Cross-referencing data from {scenario.dominantAgents.length} primary agents. 
                {scenario.correlations.length} correlation pathways identified and analyzed. 
                Predictive confidence level: {Math.min(95, scenario.globalRisk + 3)}%. 
                Pattern recognition cycle complete — monitoring for new developments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}