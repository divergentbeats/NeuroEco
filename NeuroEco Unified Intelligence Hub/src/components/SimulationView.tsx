import React, { useState, useEffect } from 'react';
import { ArrowLeft, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Scenario } from './ScenarioData';

interface SimulationViewProps {
  onBack: () => void;
  onComplete: () => void;
  scenario: Scenario;
}

export function SimulationView({ onBack, onComplete, scenario }: SimulationViewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [thinkingPhase, setThinkingPhase] = useState(false);

  const steps = scenario.simulationSteps;

  useEffect(() => {
    if (isPlaying && currentStep < steps.length) {
      // Add "thinking" phase before each major step
      if (currentStep > 0 && currentStep % 2 === 0) {
        setThinkingPhase(true);
        setTimeout(() => setThinkingPhase(false), 1200);
      }
      
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 2800);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length) {
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  }, [isPlaying, currentStep, steps.length, onComplete]);

  const startSimulation = () => {
    setIsPlaying(true);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="glass-panel p-6 mb-8 glow-cyan">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-cyan-400" />
            </button>
            <div>
              <h2 className="techno-text text-cyan-400">Simulation Narrative View</h2>
              <p className="text-sm text-white/60">Scenario: {scenario.name}</p>
            </div>
          </div>
          {!isPlaying && (
            <button
              onClick={startSimulation}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/30 transition-all glow-cyan"
            >
              <PlayCircle className="w-5 h-5" />
              <span className="techno-text">Start Simulation</span>
            </button>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-white/20" />

          {/* Timeline steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <AnimatePresence key={step.id}>
                {currentStep >= index && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative flex items-start gap-6"
                  >
                    {/* Timeline node */}
                    <div className="relative z-10">
                      <motion.div
                        className="w-24 h-24 rounded-full flex items-center justify-center"
                        style={{
                          background: `radial-gradient(circle, ${step.color}40, ${step.color}10)`,
                          border: `2px solid ${step.color}`,
                          boxShadow: `0 0 20px ${step.color}60`
                        }}
                        animate={{
                          scale: currentStep === index ? [1, 1.1, 1] : 1,
                        }}
                        transition={{ duration: 1, repeat: currentStep === index ? Infinity : 0 }}
                      >
                        <div className="text-3xl">{step.icon}</div>
                      </motion.div>
                      
                      {/* Step number */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white/10 border border-white/30 flex items-center justify-center">
                        <span className="text-xs techno-text text-white/80">{step.id}</span>
                      </div>
                    </div>

                    {/* Content card */}
                    <motion.div
                      className={`flex-1 glass-panel p-6 ${step.isAlert ? 'bg-red-500/10 border-red-500/40' : ''}`}
                      style={{ borderColor: step.isAlert ? '#FF6B35' : `${step.color}40` }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-xs mb-1" style={{ color: `${step.color}` }}>
                            {step.agent}
                          </div>
                          <h3 className="techno-text text-xl mb-2" style={{ color: step.color }}>
                            {step.title}
                          </h3>
                        </div>
                        {currentStep === index && (
                          <motion.div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: step.color }}
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                      </div>
                      <p className="text-white/80">{step.description}</p>
                      
                      {step.isAlert && (
                        <motion.div
                          className="mt-4 p-3 rounded-lg bg-red-500/20 border border-red-500/40"
                          animate={{ opacity: [1, 0.8, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <div className="flex items-center gap-2">
                            <div className="text-2xl">⚠️</div>
                            <div>
                              <div className="techno-text text-red-400 mb-1">HIGH PRIORITY ALERT</div>
                              <div className="text-sm text-white/70">
                                {scenario.alertMessage}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div className="mt-3 text-xs text-white/40">
                        Timestamp: {new Date(Date.now() + index * 60000).toLocaleTimeString()}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>

          {/* Completion message */}
          {currentStep >= steps.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 glass-panel p-8 text-center glow-cyan"
            >
              <div className="text-4xl mb-4">✓</div>
              <h3 className="techno-text text-cyan-400 text-2xl mb-2">Simulation Complete</h3>
              <p className="text-white/70 mb-6">
                Multi-domain AI correlation analysis successfully demonstrated. 
                Predictive alert generated and distributed to all monitoring systems.
              </p>
              <div className="inline-block px-6 py-3 rounded-lg bg-cyan-500/20 border border-cyan-500/40">
                <div className="techno-text text-cyan-400">Final Risk Assessment: {scenario.globalRisk}%</div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Progress indicator */}
        {isPlaying && currentStep < steps.length && (
          <div className="mt-12 glass-panel p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Simulation Progress</span>
              <span className="text-sm text-cyan-400 techno-text">
                {currentStep} / {steps.length}
              </span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                initial={{ width: '0%' }}
                animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}