import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface DialogueMessage {
  id: string;
  from: string;
  to: string;
  message: string;
  type: 'correlation' | 'confirmation' | 'alert' | 'update';
  confidence: number;
  timestamp: number;
  fromColor: string;
  toColor: string;
}

interface InterAgentDialogueProps {
  scenarioId: number;
  isSimulating: boolean;
}

export function InterAgentDialogue({ scenarioId, isSimulating }: InterAgentDialogueProps) {
  const [messages, setMessages] = useState<DialogueMessage[]>([]);
  const [activeMessage, setActiveMessage] = useState<DialogueMessage | null>(null);

  // Generate intelligent dialogue based on scenario
  const generateDialogue = (scenarioId: number): DialogueMessage[] => {
    const scenarios: Record<number, DialogueMessage[]> = {
      1: [ // Kitchen Ignition Prevention
        {
          id: '1-1',
          from: 'Air',
          to: 'Fire',
          message: 'Air → Fire: Methane spike detected at 4.8ppm. Your heat signature at 41°C creates ignition risk.',
          type: 'alert',
          confidence: 89,
          timestamp: 2000,
          fromColor: '#00FFFF',
          toColor: '#FF6B35'
        },
        {
          id: '1-2',
          from: 'Fire',
          to: 'Air',
          message: 'Fire → Air: Confirming your methane reading. My thermal sensors show rapid heat buildup near gas source.',
          type: 'confirmation',
          confidence: 91,
          timestamp: 4000,
          fromColor: '#FF6B35',
          toColor: '#00FFFF'
        },
        {
          id: '1-3',
          from: 'NeuroCore',
          to: 'All',
          message: 'NeuroCore: Cross-correlation confirmed. Methane + Heat = 91% ignition probability. Initiating preventive alert.',
          type: 'correlation',
          confidence: 91,
          timestamp: 6000,
          fromColor: '#FFFFFF',
          toColor: '#00FFFF'
        }
      ],
      2: [ // Factory Discharge Correlation
        {
          id: '2-1',
          from: 'Waste',
          to: 'Water',
          message: 'Waste → Water: Chemical overflow detected. Toxicity at 52%. Expect downstream contamination.',
          type: 'alert',
          confidence: 94,
          timestamp: 2000,
          fromColor: '#00FF9D',
          toColor: '#00BFFF'
        },
        {
          id: '2-2',
          from: 'Water',
          to: 'Waste',
          message: 'Water → Waste: Confirmed. pH dropping rapidly from 7.2 to 5.4. Your overflow is causing severe acidification.',
          type: 'confirmation',
          confidence: 96,
          timestamp: 4000,
          fromColor: '#00BFFF',
          toColor: '#00FF9D'
        },
        {
          id: '2-3',
          from: 'Air',
          to: 'Water',
          message: 'Air → Water: VOC spike detected above your contaminated zone. Benzene and toluene evaporating.',
          type: 'correlation',
          confidence: 78,
          timestamp: 6000,
          fromColor: '#00FFFF',
          toColor: '#00BFFF'
        },
        {
          id: '2-4',
          from: 'NeuroCore',
          to: 'All',
          message: 'NeuroCore: Three-domain cascade confirmed. Waste → Water → Air. Contamination risk 94%.',
          type: 'alert',
          confidence: 94,
          timestamp: 8000,
          fromColor: '#FFFFFF',
          toColor: '#FF6B35'
        }
      ],
      3: [ // City Drain Blockage Flood Risk
        {
          id: '3-1',
          from: 'Air',
          to: 'Water',
          message: 'Air → Water: Heavy rainfall incoming. 85mm in 2 hours. Prepare for volume surge.',
          type: 'update',
          confidence: 84,
          timestamp: 2000,
          fromColor: '#00FFFF',
          toColor: '#00BFFF'
        },
        {
          id: '3-2',
          from: 'Waste',
          to: 'Water',
          message: 'Waste → Water: Critical blockage detected. Drain capacity down to 28%. Cannot handle Air\'s rainfall forecast.',
          type: 'alert',
          confidence: 91,
          timestamp: 4000,
          fromColor: '#00FF9D',
          toColor: '#00BFFF'
        },
        {
          id: '3-3',
          from: 'Water',
          to: 'Waste',
          message: 'Water → Waste: Pressure sensors confirm your blockage. Basement backup imminent with Air\'s storm.',
          type: 'confirmation',
          confidence: 88,
          timestamp: 6000,
          fromColor: '#00BFFF',
          toColor: '#00FF9D'
        },
        {
          id: '3-4',
          from: 'NeuroCore',
          to: 'All',
          message: 'NeuroCore: Rainfall + Blockage + Pressure = 88% flood risk within 3 hours. Evacuation recommended.',
          type: 'alert',
          confidence: 88,
          timestamp: 8000,
          fromColor: '#FFFFFF',
          toColor: '#FF6B35'
        }
      ],
      4: [ // Landfill Combustion Alert
        {
          id: '4-1',
          from: 'Air',
          to: 'Fire',
          message: 'Air → Fire: Methane at 8.2% in subsurface pockets. Combustible range detected at your location.',
          type: 'alert',
          confidence: 89,
          timestamp: 2000,
          fromColor: '#00FFFF',
          toColor: '#FF6B35'
        },
        {
          id: '4-2',
          from: 'Fire',
          to: 'Air',
          message: 'Fire → Air: Three hot spots at 68°C confirm your methane reading. Subsurface combustion likely.',
          type: 'correlation',
          confidence: 87,
          timestamp: 4000,
          fromColor: '#FF6B35',
          toColor: '#00FFFF'
        },
        {
          id: '4-3',
          from: 'Waste',
          to: 'Fire',
          message: 'Waste → Fire: CO traces near your hot zones. Smoldering combustion beneath my surface layer.',
          type: 'confirmation',
          confidence: 85,
          timestamp: 6000,
          fromColor: '#00FF9D',
          toColor: '#FF6B35'
        },
        {
          id: '4-4',
          from: 'NeuroCore',
          to: 'All',
          message: 'NeuroCore: Methane + Heat + CO = 87% fire outbreak probability. Firefighting response required.',
          type: 'alert',
          confidence: 87,
          timestamp: 8000,
          fromColor: '#FFFFFF',
          toColor: '#FF6B35'
        }
      ],
      5: [ // Industrial Park Chain-Reaction
        {
          id: '5-1',
          from: 'Waste',
          to: 'Water',
          message: 'Waste → Water: EMERGENCY - Chemical breach at 64% toxicity. Heavy metals entering your system.',
          type: 'alert',
          confidence: 98,
          timestamp: 2000,
          fromColor: '#00FF9D',
          toColor: '#00BFFF'
        },
        {
          id: '5-2',
          from: 'Water',
          to: 'Fire',
          message: 'Water → Fire: pH crashed to 4.9 from Waste overflow. Chemical reaction generating heat at reservoir.',
          type: 'alert',
          confidence: 96,
          timestamp: 4000,
          fromColor: '#00BFFF',
          toColor: '#FF6B35'
        },
        {
          id: '5-3',
          from: 'Fire',
          to: 'Air',
          message: 'Fire → Air: Temperature at 52°C with methane release from Water\'s chemical reaction. Toxic fumes incoming.',
          type: 'alert',
          confidence: 94,
          timestamp: 6000,
          fromColor: '#FF6B35',
          toColor: '#00FFFF'
        },
        {
          id: '5-4',
          from: 'Air',
          to: 'NeuroCore',
          message: 'Air → NeuroCore: AQI at 168. Methane + VOCs + heavy metals from all three agents. Crisis confirmed.',
          type: 'alert',
          confidence: 96,
          timestamp: 8000,
          fromColor: '#00FFFF',
          toColor: '#FFFFFF'
        },
        {
          id: '5-5',
          from: 'NeuroCore',
          to: 'All',
          message: 'NeuroCore: CRITICAL - Complete cascade: Waste → Water → Fire → Air. Multi-agent crisis at 96%.',
          type: 'alert',
          confidence: 96,
          timestamp: 10000,
          fromColor: '#FFFFFF',
          toColor: '#FF0000'
        }
      ]
    };

    return scenarios[scenarioId] || [];
  };

  useEffect(() => {
    if (!isSimulating) {
      setMessages([]);
      setActiveMessage(null);
      return;
    }

    const dialogueSequence = generateDialogue(scenarioId);
    const timers: NodeJS.Timeout[] = [];

    dialogueSequence.forEach((msg) => {
      const timer = setTimeout(() => {
        setActiveMessage(msg);
        setMessages(prev => [...prev, msg]);
        
        // Clear active message after display duration
        setTimeout(() => {
          setActiveMessage(null);
        }, 3000);
      }, msg.timestamp);
      
      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [isSimulating, scenarioId]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-4 h-4" />;
      case 'confirmation': return <CheckCircle className="w-4 h-4" />;
      case 'correlation': return <TrendingUp className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'from-red-500/20 to-orange-500/20 border-red-500/40';
    if (confidence >= 80) return 'from-orange-500/20 to-yellow-500/20 border-orange-500/40';
    return 'from-cyan-500/20 to-blue-500/20 border-cyan-500/40';
  };

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {activeMessage && (
          <motion.div
            key={activeMessage.id}
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className={`p-4 rounded-lg bg-gradient-to-r ${getConfidenceColor(activeMessage.confidence)} border backdrop-blur-sm`}
          >
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ color: activeMessage.fromColor }}
              >
                {getIcon(activeMessage.type)}
              </motion.div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-sm font-bold"
                      style={{ color: activeMessage.fromColor }}
                    >
                      {activeMessage.from}
                    </span>
                    <span className="text-white/40">→</span>
                    <span 
                      className="text-sm font-bold"
                      style={{ color: activeMessage.toColor }}
                    >
                      {activeMessage.to}
                    </span>
                  </div>
                  
                  <motion.div 
                    className="flex items-center gap-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="h-1.5 w-16 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 to-orange-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${activeMessage.confidence}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <span className="text-xs text-white/60 techno-text">
                      {activeMessage.confidence}%
                    </span>
                  </motion.div>
                </div>
                
                <motion.p 
                  className="text-sm text-white/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {activeMessage.message}
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message History */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {messages.slice(-3).map((msg, idx) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.4, x: 0 }}
            className="p-2 rounded bg-white/5 border border-white/10"
          >
            <div className="flex items-center gap-2 text-xs">
              <span style={{ color: msg.fromColor }}>{msg.from}</span>
              <span className="text-white/30">→</span>
              <span style={{ color: msg.toColor }}>{msg.to}</span>
              <span className="text-white/40 ml-auto">{msg.confidence}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
