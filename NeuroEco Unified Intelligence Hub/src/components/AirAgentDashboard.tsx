import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle, Wind, Cloud } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MetricGauge } from './MetricGauge';
import { Scenario } from './ScenarioData';

interface AirAgentDashboardProps {
  onBack: () => void;
  scenario: Scenario;
}

export function AirAgentDashboard({ onBack, scenario }: AirAgentDashboardProps) {
  const [timeRange, setTimeRange] = useState<'hourly' | 'daily' | 'monthly'>('hourly');
  const [alertAcknowledged, setAlertAcknowledged] = useState(false);

  const metrics = scenario.agentMetrics.air;

  const hourlyData = [
    { time: '00:00', aqi: metrics.data[0] - 4, co2: metrics.co2 - 18 },
    { time: '04:00', aqi: metrics.data[1], co2: metrics.co2 - 15 },
    { time: '08:00', aqi: metrics.data[2], co2: metrics.co2 - 10 },
    { time: '12:00', aqi: metrics.data[3], co2: metrics.co2 - 5 },
    { time: '16:00', aqi: metrics.data[4], co2: metrics.co2 - 2 },
    { time: '20:00', aqi: metrics.data[5], co2: metrics.co2 },
  ];

  const dailyData = [
    { time: 'Mon', aqi: metrics.data[0], co2: metrics.co2 - 20 },
    { time: 'Tue', aqi: metrics.data[1], co2: metrics.co2 - 15 },
    { time: 'Wed', aqi: metrics.data[2], co2: metrics.co2 - 12 },
    { time: 'Thu', aqi: metrics.data[3], co2: metrics.co2 - 8 },
    { time: 'Fri', aqi: metrics.data[4], co2: metrics.co2 - 5 },
    { time: 'Sat', aqi: metrics.data[5], co2: metrics.co2 - 2 },
    { time: 'Sun', aqi: metrics.data[6], co2: metrics.co2 },
  ];

  const monthlyData = [
    { time: 'Week 1', aqi: Math.round(metrics.aqi * 0.7), co2: metrics.co2 - 30 },
    { time: 'Week 2', aqi: Math.round(metrics.aqi * 0.8), co2: metrics.co2 - 22 },
    { time: 'Week 3', aqi: Math.round(metrics.aqi * 0.9), co2: metrics.co2 - 15 },
    { time: 'Week 4', aqi: metrics.aqi, co2: metrics.co2 },
  ];

  const chartData = timeRange === 'hourly' ? hourlyData : timeRange === 'daily' ? dailyData : monthlyData;

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
              <Wind className="w-8 h-8 text-cyan-400" />
              <div>
                <h2 className="techno-text text-cyan-400">Air Agent — Atmospheric Intelligence</h2>
                <p className="text-sm text-white/60">Real-time air quality monitoring and prediction</p>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40">
            <span className="text-sm text-cyan-400 techno-text">ACTIVE</span>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Cloud className="w-5 h-5 text-cyan-400 mt-1" />
            <div>
              <div className="text-xs text-cyan-400 mb-1 techno-text">AI INSIGHT</div>
              <p className="text-sm text-white/80">
                {scenario.name}: {scenario.aiInsights.find(i => i.agent === 'Air')?.message || 
                'Air quality monitoring systems active. Cross-domain correlation analysis ongoing.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Metrics */}
        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h3 className="techno-text text-white/80 mb-6">Current Metrics</h3>
            <div className="grid grid-cols-2 gap-6">
              <MetricGauge value={metrics.aqi} max={200} label="AQI" unit="AQI" color="#00FFFF" />
              <MetricGauge value={Math.round(metrics.aqi * 0.65)} max={100} label="PM2.5" unit="μg/m³" color="#00FFFF" />
              <MetricGauge value={metrics.co2} max={600} label="CO₂" unit="ppm" color="#00FFFF" />
              <MetricGauge value={Math.min(95, 100 - metrics.aqi * 0.4)} max={100} label="Humidity" unit="%" color="#00FFFF" />
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="techno-text text-white/80 mb-4">Additional Sensors</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-sm text-white/70">Wind Speed</span>
                <span className="techno-text text-cyan-400">12 km/h</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-sm text-white/70">Temperature</span>
                <span className="techno-text text-cyan-400">28°C</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-sm text-white/70">Pressure</span>
                <span className="techno-text text-cyan-400">1013 hPa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column - Charts */}
        <div className="col-span-2 space-y-6">
          <div className="glass-panel p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="techno-text text-white/80">Trend Analysis</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setTimeRange('hourly')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    timeRange === 'hourly'
                      ? 'bg-cyan-500/30 text-cyan-400 techno-text'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  Hourly
                </button>
                <button
                  onClick={() => setTimeRange('daily')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    timeRange === 'daily'
                      ? 'bg-cyan-500/30 text-cyan-400 techno-text'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setTimeRange('monthly')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    timeRange === 'monthly'
                      ? 'bg-cyan-500/30 text-cyan-400 techno-text'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="text-sm text-white/60 mb-3">Air Quality Index (AQI)</div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="time" stroke="#fff" opacity={0.6} />
                    <YAxis stroke="#fff" opacity={0.6} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(0, 255, 255, 0.3)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="aqi" stroke="#00FFFF" strokeWidth={3} dot={{ fill: '#00FFFF', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div>
                <div className="text-sm text-white/60 mb-3">CO₂ Concentration (ppm)</div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="time" stroke="#fff" opacity={0.6} />
                    <YAxis stroke="#fff" opacity={0.6} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(0, 255, 255, 0.3)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="co2" stroke="#00BFFF" strokeWidth={3} dot={{ fill: '#00BFFF', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="techno-text text-white/80 mb-4">Activity Log</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-white/5 border border-cyan-500/20">
                <div className="text-xs text-white/50 mb-1">{new Date().toLocaleTimeString()}</div>
                <p className="text-sm text-white/80">
                  CO₂ concentration increased +6% in the past hour — industrial activity elevated.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white/5 border border-cyan-500/20">
                <div className="text-xs text-white/50 mb-1">{new Date(Date.now() - 120000).toLocaleTimeString()}</div>
                <p className="text-sm text-white/80">
                  Wind stability is low today — pollutants may linger longer than usual.
                </p>
              </div>

              {scenario.correlations.some(c => c.from === 'air' || c.to === 'air') && (
                <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                    <span className="text-xs text-orange-400 techno-text">CROSS-DOMAIN ALERT</span>
                  </div>
                  <p className="text-sm text-white/80">
                    {scenario.correlations.find(c => c.from === 'air' || c.to === 'air')?.description}
                  </p>
                </div>
              )}

              <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                <div className="text-xs text-cyan-400 mb-1">Status check complete</div>
                <p className="text-xs text-white/60">All sensors operational. Next sweep in 60 seconds.</p>
              </div>
            </div>
          </div>

          {/* Live Feed */}
          <div className="glass-panel p-6">
            <h3 className="techno-text text-white/80 mb-4">Live Alert Feed</h3>
            <div className="space-y-3">
              {!alertAcknowledged ? (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 mt-1" />
                      <div>
                        <div className="text-sm techno-text text-red-400 mb-1">
                          Factory 7 Filter Malfunction
                        </div>
                        <p className="text-sm text-white/70">AQI spiked by 15% in sector B2. Immediate attention required.</p>
                        <div className="text-xs text-white/50 mt-2">2 minutes ago</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setAlertAcknowledged(true)}
                      className="px-3 py-1 rounded bg-red-500/20 text-red-400 text-xs hover:bg-red-500/30"
                    >
                      Acknowledge
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <div className="text-sm text-green-400">All alerts acknowledged</div>
                </div>
              )}
              
              <div className="p-4 rounded-lg bg-white/5">
                <div className="text-sm text-white/70 mb-1">Routine Sensor Calibration</div>
                <div className="text-xs text-white/50">15 minutes ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
