import React, { useState, useEffect } from 'react';
import { ParentDashboard } from './components/ParentDashboard';
import { AirAgentDashboard } from './components/AirAgentDashboard';
import { WaterAgentDashboard } from './components/WaterAgentDashboard';
import { FireAgentDashboard } from './components/FireAgentDashboard';
import { WasteAgentDashboard } from './components/WasteAgentDashboard';
import { ReasoningOverview } from './components/ReasoningOverview';
import { SimulationView } from './components/SimulationView';
import { NeuroBot } from './components/NeuroBot';
import { scenarios } from './components/ScenarioData';

type View = 'parent' | 'air' | 'water' | 'fire' | 'waste' | 'reasoning' | 'simulation';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('parent');
  const [currentScenario, setCurrentScenario] = useState(0);
  const [agentStates, setAgentStates] = useState({
    air: true,
    water: true,
    fire: true,
    waste: true
  });
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [globalRiskIndex, setGlobalRiskIndex] = useState(scenarios[0].globalRisk);

  const handleToggleAgent = (agent: string) => {
    setAgentStates(prev => ({
      ...prev,
      [agent]: !prev[agent]
    }));
  };

  const handleStartSimulation = () => {
    setSimulationComplete(false);
    setCurrentView('simulation');
  };

  const handleSimulationComplete = () => {
    setIsSimulating(true);
    setSimulationComplete(true);
    setGlobalRiskIndex(scenarios[currentScenario].globalRisk);
    setCurrentView('parent');
    
    // Stop simulation animation after 10 seconds
    setTimeout(() => {
      setIsSimulating(false);
    }, 10000);
  };

  const handleScenarioChange = (scenarioIndex: number) => {
    setCurrentScenario(scenarioIndex);
    setGlobalRiskIndex(scenarios[scenarioIndex].globalRisk);
    setSimulationComplete(false);
  };

  const navigateToView = (view: string) => {
    setCurrentView(view as View);
  };

  const navigateBack = () => {
    setCurrentView('parent');
  };

  return (
    <div className="min-h-screen">
      {currentView === 'parent' && (
        <ParentDashboard
          onNavigate={navigateToView}
          onStartSimulation={handleStartSimulation}
          agentStates={agentStates}
          onToggleAgent={handleToggleAgent}
          isSimulating={isSimulating}
          simulationComplete={simulationComplete}
          globalRiskIndex={globalRiskIndex}
          currentScenario={currentScenario}
          onScenarioChange={handleScenarioChange}
        />
      )}
      
      {currentView === 'air' && (
        <AirAgentDashboard onBack={navigateBack} scenario={scenarios[currentScenario]} />
      )}
      
      {currentView === 'water' && (
        <WaterAgentDashboard onBack={navigateBack} scenario={scenarios[currentScenario]} />
      )}
      
      {currentView === 'fire' && (
        <FireAgentDashboard onBack={navigateBack} scenario={scenarios[currentScenario]} />
      )}
      
      {currentView === 'waste' && (
        <WasteAgentDashboard onBack={navigateBack} scenario={scenarios[currentScenario]} />
      )}
      
      {currentView === 'reasoning' && (
        <ReasoningOverview 
          onBack={navigateBack} 
          isSimulating={isSimulating}
          scenario={scenarios[currentScenario]}
        />
      )}
      
      {currentView === 'simulation' && (
        <SimulationView 
          onBack={navigateBack} 
          onComplete={handleSimulationComplete}
          scenario={scenarios[currentScenario]}
        />
      )}

      <NeuroBot currentScenario={scenarios[currentScenario]} />
    </div>
  );
}
