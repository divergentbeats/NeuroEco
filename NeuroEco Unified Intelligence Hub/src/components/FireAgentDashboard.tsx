import React, { useState } from 'react';
import { ArrowLeft, Flame, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MetricGauge } from './MetricGauge';
import { motion } from 'motion/react';
import { Scenario } from './ScenarioData';

interface FireAgentDashboardProps {
  onBack: () => void;
  scenario: Scenario;
}

export function FireAgentDashboard({ onBack, scenario }: FireAgentDashboardProps) {
  const [timeRange, setTimeRange] = useState<'hourly' | 'weekly' | 'monthly'>('hourly');
  const metrics = scenario.agentMetrics.fire;
  
  const riskData = [
    { sector: 'A', risk: Math.max(5, metrics.risk - 15) },
    { sector: 'B', risk: Math.max(8, metrics.risk - 10) },
    { sector: 'C', risk: metrics.risk },
    { sector: 'D', risk: Math.max(3, metrics.risk - 20) },
    { sector: 'E', risk: Math.max(10, metrics.risk - 8) },
  ];

  const hourlyData = [
    { time: '00:00', temp: metrics.temp - 8, humidity: 68 },
    { time: '04:00', temp: metrics.temp - 10, humidity: 72 },
    { time: '08:00', temp: metrics.temp - 6, humidity: 65 },
    { time: '12:00', temp: metrics.temp - 2, humidity: 55 },
    { time: '16:00', temp: metrics.temp, humidity: 52 },
    { time: '20:00', temp: metrics.temp - 4, humidity: 60 },
  ];

  const weeklyData = [
    { time: 'Mon', temp: metrics.temp - 5, humidity: 65 },
    { time: 'Tue', temp: metrics.temp - 4, humidity: 63 },
    { time: 'Wed', temp: metrics.temp - 2, humidity: 60 },
    { time: 'Thu', temp: metrics.temp - 1, humidity: 58 },
    { time: 'Fri', temp: metrics.temp, humidity: 55 },
    { time: 'Sat', temp: metrics.temp + 1, humidity: 54 },
    { time: 'Sun', temp: metrics.temp + 2, humidity: 52 },
  ];

  const monthlyData = [
    { time: 'Week 1', temp: metrics.temp - 8, humidity: 70 },
    { time: 'Week 2', temp: metrics.temp - 5, humidity: 67 },
    { time: 'Week 3', temp: metrics.temp - 2, humidity: 62 },
    { time: 'Week 4', temp: metrics.temp, humidity: 58 },
  ];

  const tempTrendData = timeRange === 'hourly' ? hourlyData : timeRange === 'weekly' ? weeklyData : monthlyData;
  const fireRisk = metrics.risk;

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="glass-panel p-6 mb-8 glow-orange">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-orange-400" />
            </button>
            <div className="flex items-center gap-3">
              <Flame className="w-8 h-8 text-orange-400" />
              <div>
                <h2 className="techno-text text-orange-400">Fire Agent — Thermal Intelligence</h2>
                <p className="text-sm text-white/60">Real-time fire risk assessment and ignition probability</p>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 rounded-lg bg-orange-500/20 border border-orange-500/40">
            <span className="text-sm text-orange-400 techno-text">ACTIVE</span>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Flame className="w-5 h-5 text-orange-400 mt-1" />
            <div>
              <div className="text-xs text-orange-400 mb-1 techno-text">AI INSIGHT</div>
              <p className="text-sm text-white/80">
                Temperature anomaly detected in Sector C with ignition probability at 21%. 
                Air Agent confirms rising PM2.5 levels — elevated smog event possible within 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fire Risk Warning */}
      {fireRisk > 20 && (
        <motion.div 
          className="glass-panel p-4 mb-6 bg-red-500/10 border-red-500/40 glow-orange"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <div>
              <div className="techno-text text-red-400 mb-1">🔥 Elevated Fire Risk Detected</div>
              <p className="text-sm text-white/70">
                Critical threshold exceeded in Sector C. Enhanced monitoring active. Fire suppression systems on standby.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Metrics */}
        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h3 className="techno-text text-white/80 mb-6">Current Metrics</h3>
            <div className="grid grid-cols-2 gap-6">
              <MetricGauge value={34} max={50} label="Temperature" unit="°C" color="#FF6B35" />
              <MetricGauge value={52} max={100} label="Humidity" unit="%" color="#FF6B35" />
              <MetricGauge value={68} max={100} label="Heat Index" unit="" color="#FF6B35" />
              <MetricGauge value={78} max={100} label="Dryness" unit="" color="#FF6B35" />
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="techno-text text-white/80 mb-4">Environmental Factors</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-sm text-white/70">Wind Speed</span>
                <span className="techno-text text-orange-400">15 km/h</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-sm text-white/70">Fuel Moisture</span>
                <span className="techno-text text-orange-400">12%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-sm text-white/70">Vegetation Density</span>
                <span className="techno-text text-orange-400">High</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="techno-text text-white/80 mb-4">Ignition Sources</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 rounded bg-white/5">
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="text-sm text-white/70">Industrial Activity: Medium</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-white/5">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-sm text-white/70">Electrical Grid: Normal</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-white/5">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-sm text-white/70">Human Activity: High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column - Charts */}
        <div className="col-span-2 space-y-6">
          <div className="glass-panel p-6">
            <h3 className="techno-text text-white/80 mb-6">Sector Risk Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="sector" stroke="#fff" opacity={0.6} />
                <YAxis stroke="#fff" opacity={0.6} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 107, 53, 0.3)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="risk" fill="#FF6B35" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-sm text-white/60">
                Sector C showing highest risk level at <span className="techno-text text-orange-400">{fireRisk}%</span>
              </p>
            </div>
          </div>

          <div className="glass-panel p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="techno-text text-white/80">Temperature & Humidity Trends</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setTimeRange('hourly')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    timeRange === 'hourly'
                      ? 'bg-orange-500/30 text-orange-400 techno-text'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  Hourly
                </button>
                <button
                  onClick={() => setTimeRange('weekly')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    timeRange === 'weekly'
                      ? 'bg-orange-500/30 text-orange-400 techno-text'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setTimeRange('monthly')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    timeRange === 'monthly'
                      ? 'bg-orange-500/30 text-orange-400 techno-text'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={tempTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#fff" opacity={0.6} />
                <YAxis stroke="#fff" opacity={0.6} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255, 107, 53, 0.3)',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="temp" stroke="#FF6B35" strokeWidth={3} dot={{ fill: '#FF6B35', r: 4 }} name="Temperature (°C)" />
                <Line type="monotone" dataKey="humidity" stroke="#00BFFF" strokeWidth={3} dot={{ fill: '#00BFFF', r: 4 }} name="Humidity (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-panel p-6">
            <h3 className="techno-text text-white/80 mb-4">AI Correlation Insights</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-white/5 border border-orange-500/20">
                <div className="text-xs text-white/50 mb-1">{new Date().toLocaleTimeString()}</div>
                <p className="text-sm text-white/80">
                  Temperature: {scenario.agentMetrics.fire.temp}°C (+5°C/hour trend)
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-orange-500/20">
                <div className="text-xs text-white/50 mb-1">{new Date(Date.now() - 180000).toLocaleTimeString()}</div>
                <p className="text-sm text-white/80">
                  Ignition likelihood up 12% due to sustained low moisture levels.
                </p>
              </div>

              {scenario.correlations.some(c => c.from === 'fire' || c.to === 'fire') && (
                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="text-xs text-cyan-400 techno-text">CROSS-DOMAIN ALERT</span>
                  </div>
                  <p className="text-sm text-white/80">
                    {scenario.correlations.find(c => c.from === 'fire' || c.to === 'fire')?.description}
                  </p>
                </div>
              )}

              <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <div className="text-xs text-orange-400 mb-1">Monitoring closely</div>
                <p className="text-xs text-white/60">Heat patterns stable for now. Continuous assessment active.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
