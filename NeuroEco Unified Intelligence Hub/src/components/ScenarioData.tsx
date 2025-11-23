export interface Scenario {
  id: number;
  name: string;
  title: string;
  description: string;
  globalRisk: number;
  dominantAgents: string[];
  alertMessage: string;
  aiInsights: {
    timestamp: string;
    message: string;
    agent: string;
    color: string;
  }[];
  agentMetrics: {
    air: { aqi: number; co2: number; riskLevel: 'low' | 'medium' | 'high'; data: number[] };
    water: { ph: number; tds: number; riskLevel: 'low' | 'medium' | 'high'; data: number[] };
    fire: { risk: number; temp: number; riskLevel: 'low' | 'medium' | 'high'; data: number[] };
    waste: { capacity: number; toxicity: number; riskLevel: 'low' | 'medium' | 'high'; data: number[] };
  };
  simulationSteps: {
    id: number;
    agent: string;
    color: string;
    title: string;
    description: string;
    icon: string;
    isAlert?: boolean;
  }[];
  reasoningInsights: string[];
  correlations: {
    from: string;
    to: string;
    strength: number;
    description: string;
  }[];
}

export const scenarios: Scenario[] = [
  {
    id: 1,
    name: 'Kitchen Ignition Prevention',
    title: '🔥 Kitchen Ignition Prevention',
    description: 'Methane and temperature anomalies in restaurant kitchen',
    globalRisk: 91,
    dominantAgents: ['fire', 'air'],
    alertMessage: 'Ignition probability 91% - Critical methane and temperature anomaly detected',
    aiInsights: [
      { timestamp: '11:42', message: 'Running environmental scan across monitored facilities... focusing on commercial kitchens.', agent: 'NeuroCore', color: '#FFFFFF' },
      { timestamp: '11:44', message: 'Gas sensors picking up methane - concentration jumped from baseline 0.2ppm to 4.8ppm in under 3 minutes.', agent: 'Air', color: '#00FFFF' },
      { timestamp: '11:46', message: 'Temperature reading unusual for this time of day - 41°C near the stove area and climbing steadily.', agent: 'Fire', color: '#FF6B35' },
      { timestamp: '11:48', message: 'Cross-checking both signals... methane spike + rapid heat increase + confined space. Pattern matched to ignition precursors.', agent: 'NeuroCore', color: '#FFFFFF' },
      { timestamp: '11:50', message: 'Confidence recalculated at 91% - this fits historical gas ignition events. Immediate ventilation recommended.', agent: 'NeuroCore', color: '#FFFFFF' },
    ],
    agentMetrics: {
      air: { aqi: 72, co2: 520, riskLevel: 'high', data: [38, 42, 48, 56, 62, 68, 72] },
      water: { ph: 7.0, tds: 185, riskLevel: 'low', data: [7.0, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0] },
      fire: { risk: 91, temp: 41, riskLevel: 'high', data: [22, 28, 35, 52, 68, 82, 91] },
      waste: { capacity: 58, toxicity: 6, riskLevel: 'low', data: [55, 56, 56, 57, 57, 58, 58] }
    },
    simulationSteps: [
      {
        id: 1,
        agent: 'Air Agent',
        color: '#00FFFF',
        title: 'Methane Leak Detected',
        description: 'Gas sensors detect critical methane concentration spike from 0.2ppm to 4.8ppm in commercial kitchen. Leak source: compromised gas line near stove.',
        icon: '🌬️'
      },
      {
        id: 2,
        agent: 'Fire Agent',
        color: '#FF6B35',
        title: 'Temperature Anomaly',
        description: 'Thermal sensors register 41°C temperature near kitchen stove area. Heat signature increasing rapidly - unusual for normal cooking operations.',
        icon: '🔥'
      },
      {
        id: 3,
        agent: 'Parent AI',
        color: '#FFFFFF',
        title: 'Ignition Risk Correlation',
        description: 'NeuroCore cross-references methane buildup with temperature anomaly in confined space. Pattern matches historical ignition precursors.',
        icon: '🧠'
      },
      {
        id: 4,
        agent: 'Alert System',
        color: '#FF6B35',
        title: 'Critical Alert Issued',
        description: 'Kitchen Ignition Risk — Probability: 91%',
        icon: '⚠️',
        isAlert: true
      }
    ],
    reasoningInsights: [
      'Analyzing atmospheric composition in commercial kitchen environment...',
      'Air agent detects methane concentration spike from 0.2ppm to 4.8ppm within 3-minute window - likely gas line leak.',
      'Fire agent reports temperature anomaly: 41°C near stove area, significantly above normal cooking baseline.',
      'Cross-checking methane presence with elevated heat in confined space... this combination matches known ignition signatures.',
      'Historical pattern recognition: similar conditions preceded kitchen fire incident in January 2024.',
      'Confidence level recalculated at 91%. Immediate ventilation and gas shutoff recommended to prevent ignition.'
    ],
    correlations: [
      { from: 'air', to: 'fire', strength: 93, description: 'Methane concentration creates volatile ignition environment' },
      { from: 'fire', to: 'air', strength: 67, description: 'Elevated temperature increases gas expansion rate' }
    ]
  },
  {
    id: 2,
    name: 'Factory Discharge Correlation',
    title: '🏭 Factory Discharge Correlation',
    description: 'Toxic runoff between waste overflow, pH drop, and VOC spike',
    globalRisk: 94,
    dominantAgents: ['waste', 'water', 'air'],
    alertMessage: 'Contamination risk 94% - Multi-domain toxic cascade detected',
    aiInsights: [
      { timestamp: '09:15', message: 'Monitoring industrial zone... detecting unusual activity across multiple environmental markers.', agent: 'NeuroCore', color: '#FFFFFF' },
      { timestamp: '09:17', message: 'Waste overflow alarm triggered at chemical processing facility - containment at 97%, toxicity reading 52%.', agent: 'Waste', color: '#00FF9D' },
      { timestamp: '09:19', message: 'Water sensors downstream showing rapid acidification - pH just dropped from 7.2 to 5.4 in under 20 minutes.', agent: 'Water', color: '#00BFFF' },
      { timestamp: '09:21', message: 'I\'m detecting volatile organic compound spike in the air - benzene and toluene traces near the affected water source.', agent: 'Air', color: '#00FFFF' },
      { timestamp: '09:23', message: 'This is a clear cascade - Waste overflow contaminating Water, now evaporating VOCs into Air. Contamination risk: 94%.', agent: 'NeuroCore', color: '#FFFFFF' },
    ],
    agentMetrics: {
      air: { aqi: 78, co2: 485, riskLevel: 'high', data: [42, 48, 54, 62, 68, 74, 78] },
      water: { ph: 5.4, tds: 465, riskLevel: 'high', data: [7.2, 6.8, 6.4, 6.0, 5.8, 5.6, 5.4] },
      fire: { risk: 24, temp: 28, riskLevel: 'low', data: [18, 20, 21, 22, 23, 24, 24] },
      waste: { capacity: 97, toxicity: 52, riskLevel: 'high', data: [68, 74, 80, 86, 90, 94, 97] }
    },
    simulationSteps: [
      {
        id: 1,
        agent: 'Waste Agent',
        color: '#00FF9D',
        title: 'Chemical Waste Overflow',
        description: 'Industrial waste containment at chemical processing facility reaches 97% capacity. Toxicity levels at 52% - chemical signature shows heavy metals and organic solvents.',
        icon: '🗑️'
      },
      {
        id: 2,
        agent: 'Water Agent',
        color: '#00BFFF',
        title: 'Rapid Water Contamination',
        description: 'Downstream water sensors detect toxic runoff. pH plummets from 7.2 to 5.4 within 20 minutes - extreme acidification event.',
        icon: '💧'
      },
      {
        id: 3,
        agent: 'Air Agent',
        color: '#00FFFF',
        title: 'VOC Atmospheric Release',
        description: 'Volatile organic compounds (benzene, toluene) detected in air samples. Chemical vapors evaporating from contaminated water surface.',
        icon: '🌬️'
      },
      {
        id: 4,
        agent: 'Parent AI',
        color: '#FFFFFF',
        title: 'Cascade Pathway Identified',
        description: 'NeuroCore detects three-domain contamination cascade: Waste overflow → Water acidification → Air VOC release.',
        icon: '🧠'
      },
      {
        id: 5,
        agent: 'Alert System',
        color: '#FF6B35',
        title: 'Contamination Alert',
        description: 'Multi-Domain Toxic Cascade — Risk: 94%',
        icon: '⚠️',
        isAlert: true
      }
    ],
    reasoningInsights: [
      'Analyzing multi-domain contamination sequence at industrial facility...',
      'Waste containment breach detected - capacity at 97% with toxicity at 52%. Chemical signature indicates heavy metals and organic solvents.',
      'Toxic runoff has entered downstream water supply, causing severe pH drop from 7.2 to 5.4 within 20-minute period.',
      'Air monitoring reveals volatile organic compound spike - benzene and toluene detected near contaminated water source.',
      'Correlation pathway confirmed: Waste overflow → Water acidification → VOC evaporation into Air. Three domains now affected.',
      'Confidence level at 94%. This is a critical multi-agent cascade requiring immediate containment and evacuation protocols.'
    ],
    correlations: [
      { from: 'waste', to: 'water', strength: 96, description: 'Toxic overflow directly contaminating water supply with heavy metals' },
      { from: 'water', to: 'air', strength: 78, description: 'VOC evaporation from contaminated water surface' },
      { from: 'waste', to: 'air', strength: 58, description: 'Direct vapor emissions from overflow site' }
    ]
  },
  {
    id: 3,
    name: 'City Drain Blockage Flood Risk',
    title: '🌊 City Drain Blockage Flood Risk',
    description: 'Drain blockage and rising water pressure in apartment complex',
    globalRisk: 88,
    dominantAgents: ['water', 'waste', 'air'],
    alertMessage: 'Flood probability 88% - Basement flood forecast within 3 hours',
    aiInsights: [
      { timestamp: '07:10', message: 'Precipitation sensors showing heavy rainfall incoming... cross-checking with drainage infrastructure status.', agent: 'NeuroCore', color: '#FFFFFF' },
      { timestamp: '07:12', message: 'Storm forecast looks severe - 85mm rainfall expected in the next 2 hours. Humidity spiking to 98%.', agent: 'Air', color: '#00FFFF' },
      { timestamp: '07:14', message: 'Pressure sensors in apartment complex drainage showing abnormal readings - water backup detected in basement level.', agent: 'Water', color: '#00BFFF' },
      { timestamp: '07:16', message: 'Found the problem - debris blockage in main storm drain, capacity down to 28%. Water has nowhere to go.', agent: 'Waste', color: '#00FF9D' },
      { timestamp: '07:18', message: 'Combining rainfall forecast, blocked drainage, and rising pressure... flood probability 88% within 3 hours.', agent: 'NeuroCore', color: '#FFFFFF' },
    ],
    agentMetrics: {
      air: { aqi: 42, co2: 410, riskLevel: 'low', data: [40, 41, 41, 42, 42, 42, 42] },
      water: { ph: 7.3, tds: 235, riskLevel: 'high', data: [7.2, 7.2, 7.3, 7.3, 7.3, 7.3, 7.3] },
      fire: { risk: 12, temp: 20, riskLevel: 'low', data: [14, 13, 13, 12, 12, 12, 12] },
      waste: { capacity: 92, toxicity: 14, riskLevel: 'high', data: [72, 78, 82, 86, 88, 90, 92] }
    },
    simulationSteps: [
      {
        id: 1,
        agent: 'Air Agent',
        color: '#00FFFF',
        title: 'Heavy Rainfall Incoming',
        description: 'Weather sensors predict 85mm rainfall within 2 hours. Storm system approaching residential area with 98% humidity saturation.',
        icon: '🌬️'
      },
      {
        id: 2,
        agent: 'Water Agent',
        color: '#00BFFF',
        title: 'Water Pressure Anomaly',
        description: 'Pressure sensors in apartment complex basement detect abnormal water backup. Drainage system unable to handle volume.',
        icon: '💧'
      },
      {
        id: 3,
        agent: 'Waste Agent',
        color: '#00FF9D',
        title: 'Critical Drain Blockage',
        description: 'Main storm drain blockage identified - debris reducing capacity to 28%. Water accumulation accelerating rapidly.',
        icon: '🗑️'
      },
      {
        id: 4,
        agent: 'Parent AI',
        color: '#FFFFFF',
        title: 'Flood Risk Calculation',
        description: 'NeuroCore correlates rainfall forecast with blocked drainage and rising pressure. Predictive model shows basement flood within 3 hours.',
        icon: '🧠'
      },
      {
        id: 5,
        agent: 'Alert System',
        color: '#FF6B35',
        title: 'Flood Warning Issued',
        description: 'Basement Flood Predicted — Probability: 88% (3 hours)',
        icon: '⚠️',
        isAlert: true
      }
    ],
    reasoningInsights: [
      'Analyzing weather patterns and urban drainage infrastructure...',
      'Heavy storm system approaching - meteorological sensors predict 85mm rainfall within 2-hour window.',
      'Water pressure sensors in apartment complex basement show abnormal backup - drainage system overwhelmed.',
      'Waste management systems report critical blockage in main storm drain - capacity reduced to only 28%.',
      'Cross-referencing all factors: heavy rainfall + blocked drainage + rising water pressure in confined space.',
      'Flood probability calculated at 88% within 3-hour timeframe. Immediate basement evacuation and drain clearing required.'
    ],
    correlations: [
      { from: 'air', to: 'water', strength: 84, description: 'Heavy precipitation rapidly increasing water volume' },
      { from: 'waste', to: 'water', strength: 91, description: 'Blocked drainage preventing water dispersal' },
      { from: 'water', to: 'waste', strength: 62, description: 'Rising water backing up entire drainage system' }
    ]
  },
  {
    id: 4,
    name: 'Landfill Combustion Alert',
    title: '🔥 Landfill Combustion Alert',
    description: 'Methane buildup, surface heat, and CO traces at landfill',
    globalRisk: 87,
    dominantAgents: ['waste', 'fire', 'air'],
    alertMessage: 'Waste fire risk 87% - Methane and heat anomaly at landfill',
    aiInsights: [
      { timestamp: '13:20', message: 'Routine landfill monitoring... detecting some concerning thermal and atmospheric patterns.', agent: 'NeuroCore', color: '#FFFFFF' },
      { timestamp: '13:22', message: 'Methane sensors showing unusual buildup - concentration at 8.2% in subsurface pockets. That\'s well into combustible range.', agent: 'Air', color: '#00FFFF' },
      { timestamp: '13:24', message: 'Thermal imaging detecting hot spots on landfill surface - temperature zones reaching 68°C in three separate areas.', agent: 'Fire', color: '#FF6B35' },
      { timestamp: '13:26', message: 'Carbon monoxide traces detected near the hot zones - likely smoldering combustion already underway beneath the surface.', agent: 'Waste', color: '#00FF9D' },
      { timestamp: '13:28', message: 'Pattern matches subsurface landfill fires... methane + heat + CO = 87% probability of waste fire outbreak.', agent: 'NeuroCore', color: '#FFFFFF' },
    ],
    agentMetrics: {
      air: { aqi: 84, co2: 545, riskLevel: 'high', data: [48, 54, 60, 68, 74, 80, 84] },
      water: { ph: 7.1, tds: 195, riskLevel: 'low', data: [7.1, 7.1, 7.1, 7.1, 7.1, 7.1, 7.1] },
      fire: { risk: 87, temp: 68, riskLevel: 'high', data: [24, 32, 42, 54, 65, 78, 87] },
      waste: { capacity: 88, toxicity: 38, riskLevel: 'high', data: [76, 78, 81, 83, 85, 87, 88] }
    },
    simulationSteps: [
      {
        id: 1,
        agent: 'Air Agent',
        color: '#00FFFF',
        title: 'Methane Buildup Detected',
        description: 'Gas sensors detect methane concentration at 8.2% in subsurface pockets - well within combustible range (5-15%). Leak from decomposing organic waste.',
        icon: '🌬️'
      },
      {
        id: 2,
        agent: 'Fire Agent',
        color: '#FF6B35',
        title: 'Surface Heat Anomalies',
        description: 'Thermal imaging reveals three hot spots on landfill surface reaching 68°C. Heat signature indicates subsurface combustion.',
        icon: '🔥'
      },
      {
        id: 3,
        agent: 'Waste Agent',
        color: '#00FF9D',
        title: 'CO Traces Detected',
        description: 'Carbon monoxide sensors detect traces near thermal hot zones - evidence of smoldering combustion beneath landfill surface.',
        icon: '🗑️'
      },
      {
        id: 4,
        agent: 'Parent AI',
        color: '#FFFFFF',
        title: 'Combustion Risk Analysis',
        description: 'NeuroCore correlates methane buildup, surface heat, and CO traces. Pattern matches known landfill fire precursors.',
        icon: '🧠'
      },
      {
        id: 5,
        agent: 'Alert System',
        color: '#FF6B35',
        title: 'Fire Risk Alert',
        description: 'Landfill Combustion Risk — Probability: 87%',
        icon: '⚠️',
        isAlert: true
      }
    ],
    reasoningInsights: [
      'Analyzing landfill environmental conditions for combustion risk factors...',
      'Methane sensors show subsurface concentration at 8.2% - within combustible range of 5-15%.',
      'Thermal imaging reveals three distinct hot spots on landfill surface, temperatures reaching 68°C.',
      'Carbon monoxide traces detected near hot zones - strong indicator of active smoldering combustion beneath surface.',
      'Cross-referencing all three indicators: methane buildup + elevated heat + CO presence matches historical landfill fire patterns.',
      'Waste fire probability calculated at 87%. Immediate firefighting response and methane venting required to prevent surface outbreak.'
    ],
    correlations: [
      { from: 'air', to: 'fire', strength: 89, description: 'Methane concentration providing combustible fuel source' },
      { from: 'waste', to: 'fire', strength: 85, description: 'Decomposing organic matter generating heat and methane' },
      { from: 'fire', to: 'air', strength: 72, description: 'Subsurface combustion releasing CO and toxic gases' }
    ]
  },
  {
    id: 5,
    name: 'Industrial Park Chain-Reaction',
    title: '🚨 Industrial Park Chain-Reaction',
    description: 'Cascading events across all environmental domains',
    globalRisk: 96,
    dominantAgents: ['air', 'water', 'fire', 'waste'],
    alertMessage: 'Multi-agent crisis risk 96% - Complete environmental cascade detected',
    aiInsights: [
      { timestamp: '15:05', message: 'CRITICAL ALERT - Multiple simultaneous failures detected across industrial park. All four agents reporting anomalies.', agent: 'NeuroCore', color: '#FFFFFF' },
      { timestamp: '15:07', message: 'Chemical storage tank overflow in progress - toxicity at 64%, waste containment completely breached.', agent: 'Waste', color: '#00FF9D' },
      { timestamp: '15:09', message: 'Toxic runoff entering water treatment facility - pH crashing from 7.1 to 4.9. Distribution system compromised.', agent: 'Water', color: '#00BFFF' },
      { timestamp: '15:11', message: 'Chemical reaction initiated at contaminated water reservoir - methane release detected, temperature spiking to 52°C.', agent: 'Fire', color: '#FF6B35' },
      { timestamp: '15:13', message: 'Hazardous air quality alert - AQI jumped to 168. Multiple toxic compounds detected: methane, VOCs, heavy metal particulates.', agent: 'Air', color: '#00FFFF' },
      { timestamp: '15:15', message: 'Complete cascade confirmed - Waste overflow triggered Water contamination, ignited Fire risk, now poisoning Air. Crisis level: 96%.', agent: 'NeuroCore', color: '#FFFFFF' },
    ],
    agentMetrics: {
      air: { aqi: 168, co2: 612, riskLevel: 'high', data: [52, 68, 88, 108, 128, 148, 168] },
      water: { ph: 4.9, tds: 528, riskLevel: 'high', data: [7.1, 6.6, 6.0, 5.6, 5.2, 5.0, 4.9] },
      fire: { risk: 92, temp: 52, riskLevel: 'high', data: [22, 32, 42, 58, 72, 84, 92] },
      waste: { capacity: 99, toxicity: 64, riskLevel: 'high', data: [74, 80, 86, 90, 94, 97, 99] }
    },
    simulationSteps: [
      {
        id: 1,
        agent: 'Waste Agent',
        color: '#00FF9D',
        title: 'Chemical Storage Breach',
        description: 'Industrial chemical storage tank failure at industrial park. Containment breach releasing toxic materials - toxicity level 64%.',
        icon: '🗑️'
      },
      {
        id: 2,
        agent: 'Water Agent',
        color: '#00BFFF',
        title: 'Water System Contamination',
        description: 'Toxic overflow enters water treatment facility. pH crashes from 7.1 to 4.9 - extreme acidification affecting entire distribution network.',
        icon: '💧'
      },
      {
        id: 3,
        agent: 'Fire Agent',
        color: '#FF6B35',
        title: 'Heat Anomaly and Methane',
        description: 'Chemical reaction at contaminated water reservoir generates heat (52°C) and releases methane gas - ignition risk escalating.',
        icon: '🔥'
      },
      {
        id: 4,
        agent: 'Air Agent',
        color: '#00FFFF',
        title: 'Atmospheric Crisis',
        description: 'Multiple toxic compounds detected - methane, VOCs, heavy metal particulates. AQI at emergency level 168.',
        icon: '🌬️'
      },
      {
        id: 5,
        agent: 'Parent AI',
        color: '#FFFFFF',
        title: 'Complete Cascade Detection',
        description: 'NeuroCore identifies full environmental collapse: Waste → Water → Fire → Air. All four domains in critical failure state.',
        icon: '🧠'
      },
      {
        id: 6,
        agent: 'Alert System',
        color: '#FF0000',
        title: 'EMERGENCY PROTOCOL',
        description: 'Multi-Agent Environmental Crisis — Severity: 96%',
        icon: '🚨',
        isAlert: true
      }
    ],
    reasoningInsights: [
      'EMERGENCY: Analyzing complete multi-domain environmental cascade at industrial park...',
      'Initial trigger: Chemical storage tank breach - waste containment failure releasing toxic materials at 64% concentration.',
      'Cascade step 1: Toxic runoff enters water treatment facility, causing severe pH crash from 7.1 to 4.9 within minutes.',
      'Cascade step 2: Chemical reaction at contaminated reservoir generates heat (52°C) and methane release - fire risk now critical.',
      'Cascade step 3: Methane, VOCs, and heavy metal particulates contaminate atmosphere - AQI at emergency level 168.',
      'Complete four-domain cascade confirmed: Waste → Water → Fire → Air. Multi-agent crisis at 96% severity. IMMEDIATE evacuation and emergency containment protocols required.'
    ],
    correlations: [
      { from: 'waste', to: 'water', strength: 98, description: 'Chemical overflow directly contaminating water supply' },
      { from: 'water', to: 'fire', strength: 86, description: 'Chemical reaction in contaminated water generating heat and methane' },
      { from: 'fire', to: 'air', strength: 94, description: 'Heat and methane release creating toxic atmospheric conditions' },
      { from: 'waste', to: 'air', strength: 82, description: 'Direct vapor emissions from chemical breach' },
      { from: 'water', to: 'air', strength: 78, description: 'VOC evaporation from acidified water' }
    ]
  }
];