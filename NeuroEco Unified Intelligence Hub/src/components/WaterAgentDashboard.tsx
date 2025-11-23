import React, { useState } from 'react';
import { ArrowLeft, Droplets, MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MetricGauge } from './MetricGauge';
import { Scenario } from './ScenarioData';

interface WaterAgentDashboardProps {
  onBack: () => void;
  scenario: Scenario;
}

export function WaterAgentDashboard({ onBack, scenario }: WaterAgentDashboardProps) {
  const [timeRange, setTimeRange] = useState<'hourly' | 'weekly' | 'monthly'>('hourly');
  const metrics = scenario.agentMetrics.water;
  const [sourceAreaFlagged, setSourceAreaFlagged] = useState(false);

  const hourlyData = [
    { time: '00:00', ph: metrics.data[0] - 0.2, tds: metrics.tds - 25 },
    { time: '04:00', ph: metrics.data[1], tds: metrics.tds - 18 },
    { time: '08:00', ph: metrics.data[2], tds: metrics.tds - 12 },
    { time: '12:00', ph: metrics.data[3], tds: metrics.tds - 8 },
    { time: '16:00', ph: metrics.data[4], tds: metrics.tds - 5 },
    { time: '20:00', ph: metrics.data[5], tds: metrics.tds },
  ];

  const weeklyData = [
    { time: 'Mon', ph: metrics.data[0], tds: metrics.tds - 20 },
    { time: 'Tue', ph: metrics.data[1], tds: metrics.tds - 15 },
    { time: 'Wed', ph: metrics.data[2], tds: metrics.tds - 12 },
    { time: 'Thu', ph: metrics.data[3], tds: metrics.tds - 8 },
    { time: 'Fri', ph: metrics.data[4], tds: metrics.tds - 5 },
    { time: 'Sat', ph: metrics.data[5], tds: metrics.tds - 2 },
    { time: 'Sun', ph: metrics.data[6], tds: metrics.tds },
  ];

  const monthlyData = [
    { time: 'Week 1', ph: metrics.ph + 0.3, tds: metrics.tds - 30 },
    { time: 'Week 2', ph: metrics.ph + 0.2, tds: metrics.tds - 20 },
    { time: 'Week 3', ph: metrics.ph + 0.1, tds: metrics.tds - 10 },
    { time: 'Week 4', ph: metrics.ph, tds: metrics.tds },
  ];

  const chartData = timeRange === 'hourly' ? hourlyData : timeRange === 'weekly' ? weeklyData : monthlyData;

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="glass-panel p-6 mb-8 glow-blue">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-blue-400" />
            </button>
            <div className="flex items-center gap-3">
              <Droplets className="w-8 h-8 text-blue-400" />
              <div>
                <h2 className="techno-text text-blue-400">Water Agent — Hydro Intelligence</h2>
                <p className="text-sm text-white/60">Real-time water quality monitoring and contamination detection</p>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/40">
            <span className="text-sm text-blue-400 techno-text">ACTIVE</span>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Droplets className="w-5 h-5 text-blue-400 mt-1" />
            <div>
              <div className="text-xs text-blue-400 mb-1 techno-text">AI INSIGHT</div>
              <p className="text-sm text-white/80">
                pH stable within normal range. TDS increasing gradually — possible contamination upstream detected. 
                Correlation with Waste Agent shows runoff traces increasing in downstream flow.
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
              <MetricGauge value={metrics.ph} max={14} label="pH Level" unit="pH" color="#00BFFF" />
              <MetricGauge value={metrics.tds} max={600} label="TDS" unit="ppm" color="#00BFFF" />
              <MetricGauge value={Math.min(10, 10 - (14 - metrics.ph) * 0.5)} max={10} label="Dissolved O₂" unit="mg/L" color="#00BFFF" />
              <MetricGauge value={Math.min(100, 45 + (7 - metrics.ph) * 5)} max={100} label="Flow Rate" unit="L/s" color="#00BFFF" />
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="techno-text text-white/80 mb-4">Additional Parameters</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-sm text-white/70">Temperature</span>
                <span className="techno-text text-blue-400">22°C</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-sm text-white/70">Turbidity</span>
                <span className="techno-text text-blue-400">4.2 NTU</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                <span className="text-sm text-white/70">Conductivity</span>
                <span className="techno-text text-blue-400">450 µS/cm</span>
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
                      ? 'bg-blue-500/30 text-blue-400 techno-text'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  Hourly
                </button>
                <button
                  onClick={() => setTimeRange('weekly')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    timeRange === 'weekly'
                      ? 'bg-blue-500/30 text-blue-400 techno-text'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setTimeRange('monthly')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    timeRange === 'monthly'
                      ? 'bg-blue-500/30 text-blue-400 techno-text'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="text-sm text-white/60 mb-3">pH Level</div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="time" stroke="#fff" opacity={0.6} />
                    <YAxis stroke="#fff" opacity={0.6} domain={[6.5, 7.5]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(0, 191, 255, 0.3)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="ph" stroke="#00BFFF" strokeWidth={3} dot={{ fill: '#00BFFF', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div>
                <div className="text-sm text-white/60 mb-3">Total Dissolved Solids (TDS)</div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="time" stroke="#fff" opacity={0.6} />
                    <YAxis stroke="#fff" opacity={0.6} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(0, 191, 255, 0.3)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="tds" stroke="#0099CC" strokeWidth={3} dot={{ fill: '#0099CC', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="techno-text text-white/80 mb-4">AI Correlation Insights</h3>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-sm techno-text text-green-400">Waste Agent Correlation</span>
                </div>
                <p className="text-sm text-white/70">
                  Runoff trace analysis indicates increased chemical markers matching Waste Agent sector C discharge patterns.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="text-sm techno-text text-yellow-400">Upstream Monitoring</span>
                </div>
                <p className="text-sm text-white/70">
                  TDS increase pattern suggests industrial activity upstream. Predictive models estimate 48-72h impact window.
                </p>
              </div>
            </div>
          </div>

          {/* Report Widget */}
          <div className="glass-panel p-6">
            <h3 className="techno-text text-white/80 mb-4">Detection Report</h3>
            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-400 mt-1" />
                  <div>
                    <div className="text-sm techno-text text-orange-400 mb-1">
                      Heavy Metal Traces Detected
                    </div>
                    <p className="text-sm text-white/70">Location: Sector 2, upstream monitoring station</p>
                    <p className="text-sm text-white/70 mt-1">Trace levels: Lead 0.008 mg/L, Mercury 0.003 mg/L</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSourceAreaFlagged(true)}
                disabled={sourceAreaFlagged}
                className={`w-full py-2 rounded-lg text-sm transition-all ${
                  sourceAreaFlagged
                    ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
                    : 'bg-orange-500/20 border border-orange-500/40 text-orange-400 hover:bg-orange-500/30'
                }`}
              >
                {sourceAreaFlagged ? '✓ Source Area Flagged on Neural Map' : 'Flag Source Area'}
              </button>
            </div>

            {sourceAreaFlagged && (
              <div className="mt-3 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                <p className="text-sm text-green-400">
                  Alert successfully transmitted to Parent AI. Sector 2 highlighted on neural network map.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
