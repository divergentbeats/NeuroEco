import React, { useState, useEffect } from 'react';
import { Satellite, Wifi, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export function LiveDataWidget() {
  const [iotNodes, setIotNodes] = useState(48);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'recalibrating'>('synced');
  const [sensorDrift, setSensorDrift] = useState(1.8);
  const [networkStatus, setNetworkStatus] = useState<'stable' | 'fluctuating'>('stable');

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate realistic IoT variations
      const random = Math.random();
      
      if (random > 0.7) {
        // Occasional recalibration
        setIotNodes(46 + Math.floor(Math.random() * 3));
        setSyncStatus('recalibrating');
        setSensorDrift(2.1 + Math.random() * 0.5);
        setNetworkStatus('fluctuating');
      } else {
        // Normal operation
        setIotNodes(48);
        setSyncStatus('synced');
        setSensorDrift(1.6 + Math.random() * 0.4);
        setNetworkStatus('stable');
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel p-4 inline-block">
      <div className="text-xs techno-text text-cyan-400 mb-3">LIVE SYSTEM STATUS</div>
      
      <div className="space-y-2">
        <motion.div 
          className="flex items-center justify-between text-xs"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-center gap-2 text-white/60">
            <Activity className="w-3 h-3" />
            <span>IoT Nodes Active:</span>
          </div>
          <span className={`techno-text ${iotNodes === 48 ? 'text-green-400' : 'text-yellow-400'}`}>
            {iotNodes}/48
          </span>
        </motion.div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-white/60">
            <Satellite className="w-3 h-3" />
            <span>Satellite Sync:</span>
          </div>
          <span className={`techno-text ${syncStatus === 'synced' ? 'text-green-400' : 'text-yellow-400'}`}>
            {syncStatus === 'synced' ? '✓ Synced' : 'Recalibrating...'}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-white/60">
            <span>Sensor Drift:</span>
          </div>
          <span className="text-cyan-400 techno-text">
            ±{sensorDrift.toFixed(1)}%
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-white/60">
            <Wifi className="w-3 h-3" />
            <span>Network Status:</span>
          </div>
          <span className={`techno-text ${networkStatus === 'stable' ? 'text-green-400' : 'text-yellow-400'}`}>
            {networkStatus === 'stable' ? 'Stable' : 'Fluctuating'}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="text-xs text-white/40">
          Last refresh: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
