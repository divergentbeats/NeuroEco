import React, { useState, useEffect } from 'react';
import { Bot, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Scenario } from './ScenarioData';

interface NeuroBotProps {
  currentScenario: Scenario;
}

export function NeuroBot({ currentScenario }: NeuroBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentInsight, setCurrentInsight] = useState(0);

  // Generate context-aware insights based on the scenario
  const generateInsights = (scenario: Scenario) => {
    const insights = [
      `Currently analyzing ${scenario.name}. Risk level at ${scenario.globalRisk}% - ${scenario.globalRisk > 80 ? 'this is concerning' : 'monitoring closely'}.`,
      `${scenario.dominantAgents.length} dominant agents are showing elevated activity. ${scenario.dominantAgents.map(a => a.charAt(0).toUpperCase() + a.slice(1)).join(', ')} correlations detected.`,
      scenario.correlations.length > 2 
        ? `Multiple correlation pathways active - this suggests a cascade event is possible.`
        : `Primary correlation between ${scenario.correlations[0]?.from} and ${scenario.correlations[0]?.to} agents is the main concern right now.`,
      scenario.globalRisk > 85
        ? `We\'ve crossed the 85% threshold. I recommend viewing the reasoning engine to see the full analysis.`
        : `Situation ${scenario.globalRisk > 70 ? 'needs attention' : 'is manageable'} for now. Monitoring for pattern changes.`,
      `Historical pattern analysis: ${scenario.correlations[0]?.description.toLowerCase()}`
    ];
    return insights;
  };

  const insights = generateInsights(currentScenario);

  const nextInsight = () => {
    setCurrentInsight((prev) => (prev + 1) % insights.length);
  };

  // Reset insight when scenario changes
  useEffect(() => {
    setCurrentInsight(0);
  }, [currentScenario]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center glow-cyan hover:scale-110 transition-transform z-50"
      >
        <Bot className="w-8 h-8 text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-28 right-8 w-96 glass-panel p-6 glow-cyan z-50"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-cyan-400" />
                <h3 className="techno-text text-cyan-400">NeuroBot Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5 text-white/60 hover:text-white" />
              </button>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-4 min-h-[120px]">
              <p className="text-sm text-white/90 leading-relaxed">{insights[currentInsight]}</p>
            </div>

            <button
              onClick={nextInsight}
              className="w-full py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/30 transition-all text-sm"
            >
              Next Insight
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
