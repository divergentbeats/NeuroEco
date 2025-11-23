import React, { useState } from 'react';
import { ArrowLeft, Trash2, Camera, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MetricGauge } from './MetricGauge';
import { motion, AnimatePresence } from 'motion/react';
import { Scenario } from './ScenarioData';

interface WasteAgentDashboardProps {
  onBack: () => void;
  scenario: Scenario;
}

export function WasteAgentDashboard({ onBack, scenario }: WasteAgentDashboardProps) {
  const [disposalTriggered, setDisposalTriggered] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timeRange, setTimeRange] = useState<'hourly' | 'weekly' | 'monthly'>('hourly');
  const metrics = scenario.agentMetrics.waste;

  const hourlyData = [
    { time: '00:00', capacity: metrics.capacity - 12, toxicity: metrics.toxicity - 8 },
    { time: '04:00', capacity: metrics.capacity - 10, toxicity: metrics.toxicity - 6 },
    { time: '08:00', capacity: metrics.capacity - 6, toxicity: metrics.toxicity - 4 },
    { time: '12:00', capacity: metrics.capacity - 3, toxicity: metrics.toxicity - 2 },
    { time: '16:00', capacity: metrics.capacity - 1, toxicity: metrics.toxicity - 1 },
    { time: '20:00', capacity: metrics.capacity, toxicity: metrics.toxicity },
  ];

  const weeklyData = [
    { time: 'Mon', capacity: metrics.capacity - 15, toxicity: metrics.toxicity - 10 },
    { time: 'Tue', capacity: metrics.capacity - 12, toxicity: metrics.toxicity - 8 },
    { time: 'Wed', capacity: metrics.capacity - 9, toxicity: metrics.toxicity - 6 },
    { time: 'Thu', capacity: metrics.capacity - 6, toxicity: metrics.toxicity - 4 },
    { time: 'Fri', capacity: metrics.capacity - 3, toxicity: metrics.toxicity - 2 },
    { time: 'Sat', capacity: metrics.capacity - 1, toxicity: metrics.toxicity - 1 },
    { time: 'Sun', capacity: metrics.capacity, toxicity: metrics.toxicity },
  ];

  const monthlyData = [
    { time: 'Week 1', capacity: metrics.capacity - 18, toxicity: metrics.toxicity - 15 },
    { time: 'Week 2', capacity: metrics.capacity - 12, toxicity: metrics.toxicity - 10 },
    { time: 'Week 3', capacity: metrics.capacity - 6, toxicity: metrics.toxicity - 5 },
    { time: 'Week 4', capacity: metrics.capacity, toxicity: metrics.toxicity },
  ];

  const trendData = timeRange === 'hourly' ? hourlyData : timeRange === 'weekly' ? weeklyData : monthlyData;

  const projectionData = [
    { day: 'Day 1', level: Math.max(60, metrics.capacity - 12) },
    { day: 'Day 2', level: Math.max(65, metrics.capacity - 9) },
    { day: 'Day 3', level: Math.max(70, metrics.capacity - 6) },
    { day: 'Day 4', level: Math.max(75, metrics.capacity - 3) },
    { day: 'Day 5', level: Math.max(80, metrics.capacity) },
    { day: 'Day 6', level: Math.min(100, metrics.capacity + 3) },
    { day: 'Day 7', level: Math.min(100, metrics.capacity + 6) },
  ];

  const handleTriggerDisposal = () => {
    setShowConfirmation(true);
  };

  const confirmDisposal = () => {
    setDisposalTriggered(true);
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="glass-panel p-6 mb-8 glow-green">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-green-400" />
            </button>
            <div className="flex items-center gap-3">
              <Trash2 className="w-8 h-8 text-green-400" />
              <div>
                <h2 className="techno-text text-green-400">Waste Agent — EcoFlow Intelligence</h2>
                <p className="text-sm text-white/60">Real-time waste management and disposal optimization</p>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/40">
            <span className="text-sm text-green-400 techno-text">ACTIVE</span>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Trash2 className="w-5 h-5 text-green-400 mt-1" />
            <div>
              <div className="text-xs text-green-400 mb-1 techno-text">AI INSIGHT</div>
              <p className="text-sm text-white/80">
                Storage capacity nearing critical threshold at 82%. Recyclable material ratio declining. 
                Predicted overflow in 4 days with potential chemical leak risk detected.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Warning */}
      <motion.div 
        className="glass-panel p-4 mb-6 bg-red-500/10 border-red-500/40"
        animate={{ opacity: [1, 0.8, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-red-400" />
          <div>
            <div className="techno-text text-red-400 mb-1">Capacity Alert: 82%</div>
            <p className="text-sm text-white/70">
              Critical capacity threshold approaching. Immediate disposal action recommended within 96 hours.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Metrics */}
        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h3 className="techno-text text-white/80 mb-6">Current Metrics</h3>
            <div className="grid grid-cols-2 gap-6">
              <MetricGauge value={metrics.capacity} max={100} label="Fill Level" unit="%" color="#00FF9D" />
              <MetricGauge value={38} max={100} label="Recyclable" unit="%" color="#00FF9D" />
              <MetricGauge value={metrics.toxicity} max={100} label="Toxic" unit="%" color="#00FF9D" />
              <MetricGauge value={28} max={50} label="Temperature" unit="°C" color="#00FF9D" />
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="techno-text text-white/80 mb-4">Composition Analysis</h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Organic</span>
                  <span className="techno-text text-green-400">45%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400" style={{ width: '45%' }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Recyclable</span>
                  <span className="techno-text text-blue-400">38%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400" style={{ width: '38%' }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Toxic/Hazardous</span>
                  <span className="techno-text text-red-400">12%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-red-400" style={{ width: '12%' }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Other</span>
                  <span className="techno-text text-gray-400">5%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-400" style={{ width: '5%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="techno-text text-white/80 mb-4">Live Camera Feed</h3>
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-white/10">
              <Camera className="w-12 h-12 text-white/30" />
            </div>
            <div className="mt-3 text-xs text-white/50 text-center">
              Sector C Waste Storage - Camera 7
            </div>
          </div>
        </div>

        {/* Center Column - Charts & Projections */}
        <div className="col-span-2 space-y-6">
          <div className="glass-panel p-6">
            <h3 className="techno-text text-white/80 mb-6">Overflow Projection</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" stroke="#fff" opacity={0.6} />
                <YAxis stroke="#fff" opacity={0.6} domain={[70, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(0, 255, 157, 0.3)',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="level" stroke="#00FF9D" strokeWidth={3} dot={{ fill: '#00FF9D', r: 5 }} />
                {/* Critical threshold line */}
                <Line type="monotone" dataKey={() => 95} stroke="#FF6B35" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded" />
                <span className="text-sm text-white/60">Projected Fill Level</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-400 rounded" />
                <span className="text-sm text-white/60">Critical Threshold (95%)</span>
              </div>
            </div>
            <div className="mt-4 text-center p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm text-red-400 techno-text">
                Overflow Predicted: 4 Days (Nov 12, 2025)
              </p>
            </div>
          </div>

          <div className="glass-panel p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="techno-text text-white/80">Capacity & Toxicity Trends</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setTimeRange('hourly')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    timeRange === 'hourly'
                      ? 'bg-green-500/30 text-green-400 techno-text'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  Hourly
                </button>
                <button
                  onClick={() => setTimeRange('weekly')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    timeRange === 'weekly'
                      ? 'bg-green-500/30 text-green-400 techno-text'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setTimeRange('monthly')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    timeRange === 'monthly'
                      ? 'bg-green-500/30 text-green-400 techno-text'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#fff" opacity={0.6} />
                <YAxis stroke="#fff" opacity={0.6} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(0, 255, 157, 0.3)',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="capacity" stroke="#00FF9D" strokeWidth={3} dot={{ fill: '#00FF9D', r: 4 }} name="Capacity (%)" />
                <Line type="monotone" dataKey="toxicity" stroke="#FF6B35" strokeWidth={3} dot={{ fill: '#FF6B35', r: 4 }} name="Toxicity (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-panel p-6">
            <h3 className="techno-text text-white/80 mb-4">AI Correlation Insights</h3>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-sm techno-text text-blue-400">Water Agent Correlation</span>
                </div>
                <p className="text-sm text-white/70">
                  Runoff pattern analysis indicates waste discharge markers appearing in downstream water samples. 
                  Potential contamination pathway identified.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="text-sm techno-text text-yellow-400">Chemical Leak Risk</span>
                </div>
                <p className="text-sm text-white/70">
                  Toxic content at {metrics.toxicity}% with rising temperature. Risk of chemical vapor release if capacity exceeds 90%. 
                  {metrics.capacity > 85 ? ' Immediate action required.' : ' Monitoring closely.'}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-sm techno-text text-purple-400">Recycling Efficiency</span>
                </div>
                <p className="text-sm text-white/70">
                  Recyclable material ratio declining from 45% to 38% over past week. 
                  Optimization algorithms suggest sorting process adjustment.
                </p>
              </div>
            </div>
          </div>

          {/* Disposal Control */}
          <div className="glass-panel p-6">
            <h3 className="techno-text text-white/80 mb-4">Disposal Control</h3>
            
            {!disposalTriggered ? (
              <div>
                <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30 mb-4">
                  <p className="text-sm text-white/70 mb-2">
                    Emergency disposal protocol will initiate automated waste removal and processing sequence. 
                    This will reduce capacity by approximately 40% over 12 hours.
                  </p>
                  <div className="text-xs text-orange-400">
                    ⚠️ Ensure all safety protocols are verified before initiating.
                  </div>
                </div>

                <button
                  onClick={handleTriggerDisposal}
                  className="w-full py-3 rounded-lg bg-green-500/20 border border-green-500/40 text-green-400 hover:bg-green-500/30 transition-all techno-text"
                >
                  Trigger Emergency Disposal Routine
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-lg bg-green-500/10 border border-green-500/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm text-green-400 techno-text">DISPOSAL ROUTINE ACTIVE</span>
                </div>
                <div className="space-y-2 text-sm text-white/70">
                  <div>✓ Safety protocols verified</div>
                  <div>✓ Automated sorting initiated</div>
                  <div>✓ Transport sequence engaged</div>
                  <div className="flex items-center gap-2">
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-green-400"
                        initial={{ width: '0%' }}
                        animate={{ width: '45%' }}
                        transition={{ duration: 3 }}
                      />
                    </div>
                    <span className="text-green-400 techno-text">45%</span>
                  </div>
                </div>
                <div className="mt-4 text-xs text-white/50">
                  Estimated completion: 8.5 hours remaining
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel p-6 max-w-md glow-green"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="techno-text text-green-400 mb-4">Confirm Disposal Routine</h3>
              <p className="text-sm text-white/70 mb-6">
                Are you sure you want to initiate the emergency disposal routine? 
                This action will begin automated waste processing and cannot be cancelled once started.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 py-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDisposal}
                  className="flex-1 py-2 rounded-lg bg-green-500/20 border border-green-500/40 text-green-400 hover:bg-green-500/30 transition-all techno-text"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
