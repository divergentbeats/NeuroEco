import React, { useState, useEffect } from 'react';
import { Activity, Cpu } from 'lucide-react';
import { NeuralNetworkMap } from './NeuralNetworkMap';
import { AgentCard } from './AgentCard';
import { LiveDataWidget } from './LiveDataWidget';
import { InterAgentDialogue } from './InterAgentDialogue';
import { motion, AnimatePresence } from 'motion/react';
import { scenarios } from './ScenarioData';

interface ParentDashboardProps {
  onNavigate: (view: string) => void;
  onStartSimulation: () => void;
  agentStates: Record<string, boolean>;
  onToggleAgent: (agent: string) => void;
  isSimulating: boolean;
  simulationComplete: boolean;
  globalRiskIndex: number;
  currentScenario: number;
  onScenarioChange: (index: number) => void;
}

export function ParentDashboard({ 
  onNavigate, 
  onStartSimulation, 
  agentStates, 
  onToggleAgent,
  isSimulating,
  simulationComplete,
  globalRiskIndex,
  currentScenario,
  onScenarioChange
}: ParentDashboardProps) {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [aiInsightIndex, setAiInsightIndex] = useState(0);
  const [simulationPhase, setSimulationPhase] = useState<'idle' | 'init' | 'reasoning' | 'complete'>('idle');

  const scenario = scenarios[currentScenario];

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // AI Insights auto-scroll
  useEffect(() => {
    if (isSimulating && scenario.aiInsights.length > 0) {
      const interval = setInterval(() => {
        setAiInsightIndex(prev => (prev + 1) % scenario.aiInsights.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isSimulating, scenario.aiInsights.length]);

  // Simulation phase management
  useEffect(() => {
    if (isSimulating) {
      setSimulationPhase('init');
      setTimeout(() => setSimulationPhase('reasoning'), 2000);
      setTimeout(() => setSimulationPhase('complete'), 6000);
    } else {
      setSimulationPhase('idle');
    }
  }, [isSimulating]);

  const agents = [
    { 
      id: 'parent', 
      name: 'NeuroCore', 
      color: '#FFFFFF', 
      active: true,
      x: 300,
      y: 200
    },
    { 
      id: 'air', 
      name: 'Air Agent', 
      color: '#00FFFF', 
      active: agentStates.air,
      x: 300,
      y: 80
    },
    { 
      id: 'water', 
      name: 'Water Agent', 
      color: '#00BFFF', 
      active: agentStates.water,
      x: 450,
      y: 200
    },
    { 
      id: 'fire', 
      name: 'Fire Agent', 
      color: '#FF6B35', 
      active: agentStates.fire,
      x: 300,
      y: 320
    },
    { 
      id: 'waste', 
      name: 'Waste Agent', 
      color: '#00FF9D', 
      active: agentStates.waste,
      x: 150,
      y: 200
    }
  ];

  const activeAgentCount = Object.values(agentStates).filter(Boolean).length;

  const agentCardsData = [
    {
      id: 'air',
      name: 'Air Agent',
      metric: 'Air Quality Index',
      value: scenario.agentMetrics.air.aqi,
      unit: 'AQI',
      data: scenario.agentMetrics.air.data,
      color: '#00FFFF',
      glowClass: 'glow-cyan',
      riskLevel: scenario.agentMetrics.air.riskLevel
    },
    {
      id: 'water',
      name: 'Water Agent',
      metric: 'pH Level',
      value: scenario.agentMetrics.water.ph,
      unit: 'pH',
      data: scenario.agentMetrics.water.data,
      color: '#00BFFF',
      glowClass: 'glow-blue',
      riskLevel: scenario.agentMetrics.water.riskLevel
    },
    {
      id: 'fire',
      name: 'Fire Agent',
      metric: 'Risk Level',
      value: scenario.agentMetrics.fire.risk,
      unit: '%',
      data: scenario.agentMetrics.fire.data,
      color: '#FF6B35',
      glowClass: 'glow-orange',
      riskLevel: scenario.agentMetrics.fire.riskLevel
    },
    {
      id: 'waste',
      name: 'Waste Agent',
      metric: 'Capacity',
      value: scenario.agentMetrics.waste.capacity,
      unit: '%',
      data: scenario.agentMetrics.waste.data,
      color: '#00FF9D',
      glowClass: 'glow-green',
      riskLevel: scenario.agentMetrics.waste.riskLevel
    }
  ];

  return (
    <div className="min-h-screen p-8">
      {/* Scenario Pagination - Top Center */}
      <div className="flex justify-center mb-6">
        <div className="glass-panel p-4 inline-flex gap-3">
          {scenarios.map((s, index) => (
            <motion.button
              key={s.id}
              onClick={() => onScenarioChange(index)}
              className={`px-6 py-3 rounded-lg transition-all ${
                currentScenario === index
                  ? 'bg-cyan-500/30 border-2 border-cyan-400 text-cyan-400'
                  : 'bg-white/5 border border-white/20 text-white/60 hover:bg-white/10'
              }`}
              animate={currentScenario === index ? {
                boxShadow: ['0 0 10px rgba(0,255,255,0.5)', '0 0 20px rgba(0,255,255,0.8)', '0 0 10px rgba(0,255,255,0.5)']
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="techno-text text-xs mb-1">{s.id}</div>
              <div className="text-sm">{s.title}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="glass-panel p-6 mb-8 glow-cyan">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="techno-text text-cyan-400 mb-2">NeuroEco Unified Intelligence Hub</h1>
            <p className="text-white/60 text-sm">Multi-Domain Environmental AI System</p>
          </div>
          <div className="flex gap-6 items-start">
            <div className="text-center">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-5 h-5 text-cyan-400" />
                <span className="text-sm text-white/60">Global Risk Index</span>
              </div>
              <motion.div 
                className="techno-text text-3xl text-cyan-400"
                animate={{ scale: isSimulating ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 1, repeat: isSimulating ? Infinity : 0 }}
              >
                {globalRiskIndex}%
              </motion.div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span className="text-sm text-white/60">Active Agents</span>
              </div>
              <div className="techno-text text-3xl text-cyan-400">{activeAgentCount}/4</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-white/60 mb-1">Last Updated</div>
              <div className="text-sm text-cyan-400">{lastUpdate.toLocaleTimeString()}</div>
            </div>
            <LiveDataWidget />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Panel - Agent Controls */}
        <div className="glass-panel p-6">
          <h3 className="techno-text text-cyan-400 mb-6">Agent Controls</h3>
          <div className="space-y-4">
            {Object.entries(agentStates).map(([agent, active]) => {
              const agentInfo = agentCardsData.find(a => a.id === agent);
              return (
                <div key={agent} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: agentInfo?.color, opacity: active ? 1 : 0.3 }}
                    />
                    <span className="techno-text text-sm" style={{ color: agentInfo?.color }}>
                      {agent.charAt(0).toUpperCase() + agent.slice(1)} Agent
                    </span>
                  </div>
                  <button
                    onClick={() => onToggleAgent(agent)}
                    className={`w-12 h-6 rounded-full transition-all ${
                      active ? 'bg-cyan-500' : 'bg-white/20'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-all ${
                        active ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          <button
            onClick={onStartSimulation}
            disabled={isSimulating}
            className={`w-full mt-6 py-3 rounded-lg techno-text transition-all ${
              isSimulating 
                ? 'bg-cyan-500/30 text-cyan-300 cursor-not-allowed' 
                : 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/30 glow-cyan'
            }`}
          >
            {simulationPhase === 'init' && 'Initializing...'}
            {simulationPhase === 'reasoning' && 'Analyzing correlations...'}
            {simulationPhase === 'complete' && 'Simulation Complete'}
            {simulationPhase === 'idle' && 'Run Simulation'}
          </button>

          {/* View Reasoning Engine Button - Appears after simulation */}
          <AnimatePresence>
            {simulationComplete && (
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={() => onNavigate('reasoning')}
                className="w-full mt-4 py-3 rounded-lg techno-text bg-purple-500/20 border border-purple-500/40 text-purple-400 hover:bg-purple-500/30 transition-all"
              >
                View Reasoning Engine
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Center - Neural Network Map */}
        <div className="glass-panel p-6">
          <h3 className="techno-text text-white/80 mb-4 text-center">Neural Network Map</h3>
          <NeuralNetworkMap 
            agents={agents} 
            isSimulating={isSimulating}
            onAgentClick={(id) => onNavigate(id)}
            scenario={scenario}
          />
        </div>

        {/* Right Panel - AI Insights Feed */}
        <div className="glass-panel p-6">
          <h3 className="techno-text text-cyan-400 mb-6">AI Insights Feed</h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {scenario.aiInsights.map((insight, idx) => (
              <AnimatePresence key={idx}>
                {(isSimulating && idx <= aiInsightIndex) || !isSimulating && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: idx === aiInsightIndex || !isSimulating ? 1 : 0.5, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-3 rounded-lg bg-white/5 border border-cyan-500/30"
                  >
                    <div className="flex items-start gap-2">
                      <div 
                        className="w-2 h-2 rounded-full mt-1.5" 
                        style={{ backgroundColor: insight.color }}
                      />
                      <div className="flex-1">
                        <div className="text-xs mb-1" style={{ color: insight.color }}>
                          {insight.agent}
                        </div>
                        <div className="text-sm text-white/80">{insight.message}</div>
                        <div className="text-xs text-white/40 mt-1">
                          {insight.timestamp}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>

          {/* Current Scenario Info */}
          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30">
            <div className="text-xs text-cyan-400 mb-2 techno-text">ACTIVE SCENARIO</div>
            <div className="text-sm text-white/90 mb-1">{scenario.name}</div>
            <div className="text-xs text-white/60">{scenario.description}</div>
          </div>
        </div>
      </div>

      {/* Agent Cards Grid */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="techno-text text-white/80">Agent Overview</h3>
          {isSimulating && (
            <motion.div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/40"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-xs text-cyan-400 techno-text">LIVE MONITORING</span>
            </motion.div>
          )}
        </div>
        <div className="grid grid-cols-4 gap-6">
          {agentCardsData.map(card => (
            <AgentCard
              key={card.id}
              {...card}
              onViewDashboard={() => onNavigate(card.id)}
            />
          ))}
        </div>
      </div>

      {/* Inter-Agent Communication Section */}
      <AnimatePresence>
        {isSimulating && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 20, height: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <div className="glass-panel p-6">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Cpu className="w-6 h-6 text-cyan-400" />
                </motion.div>
                <div>
                  <h3 className="techno-text text-cyan-400">Inter-Agent Communication</h3>
                  <p className="text-xs text-white/50">Real-time cross-domain correlation dialogue</p>
                </div>
              </div>
              <InterAgentDialogue 
                scenarioId={currentScenario + 1} 
                isSimulating={isSimulating}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 text-center text-xs text-white/40">
        Data Source: Simulated IoT Feeds | Powered by NeuroCore v1.0
      </div>
    </div>
  );
}