import React, { useState } from 'react';
import { ZONES } from '../data/metabolismData';
import { AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { BarChart3, Flame, Droplet, Zap, Info, PieChart as PieIcon } from 'lucide-react';

export default function FuelCharts({ currentZoneId }) {
  const [chartMode, setChartMode] = useState('rate'); // 'rate', 'lactate', 'percentage', 'consumption'

  const activeZone = ZONES.find(z => z.id === currentZoneId) || ZONES[1];

  const chartData = [
    { name: 'Zone 1', hr: '50-60%', fatRate: 0.35, carbRate: 0.10, fatPct: 85, carbPct: 15, lactate: 1.1 },
    { name: 'Zone 2 (FATmax)', hr: '60-70%', fatRate: 0.65, carbRate: 0.25, fatPct: 75, carbPct: 25, lactate: 1.6 },
    { name: 'Zone 3', hr: '70-80%', fatRate: 0.45, carbRate: 0.70, fatPct: 45, carbPct: 55, lactate: 2.8 },
    { name: 'Zone 4', hr: '80-90%', fatRate: 0.15, carbRate: 1.40, fatPct: 15, carbPct: 85, lactate: 4.5 },
    { name: 'Zone 5', hr: '90-100%', fatRate: 0.02, carbRate: 2.20, fatPct: 2, carbPct: 98, lactate: 9.5 }
  ];

  // Pie chart data for active zone fuel consumption
  const pieData = [
    { name: 'Fat Consumption (9 kcal/g)', value: activeZone.fatOxidation, color: '#047857' },
    { name: 'Carb Consumption (4 kcal/g)', value: activeZone.carbOxidation, color: '#d97706' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 rounded-xl border border-stone-300 shadow-lg text-xs space-y-1 bg-white text-stone-900 font-sans">
          <div className="font-bold text-stone-900 border-b border-stone-200 pb-1 flex items-center justify-between gap-3">
            <span>{label || payload[0]?.name}</span>
            {payload[0]?.payload?.hr && <span className="text-[11px] text-emerald-800 font-semibold">HR: {payload[0]?.payload?.hr}</span>}
          </div>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 font-medium" style={{ color: entry.color || entry.payload?.color }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color || entry.payload?.color }}></span>
                {entry.name}:
              </span>
              <strong className="font-bold text-stone-900">{entry.value} {entry.unit || '%'}</strong>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="bg-stone-50 rounded-2xl p-5 md:p-6 border border-stone-200 shadow-xs mb-8 font-sans text-stone-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-700" />
            <h3 className="text-lg font-extrabold text-stone-900">Substrate & Fuel Consumption Charts</h3>
          </div>
          <p className="text-xs text-stone-700 font-medium mt-0.5">
            Real-time visual curves and consumption mix for Fat vs Carbohydrate fuel sources.
          </p>
        </div>

        {/* Mode Toggle Buttons */}
        <div className="flex flex-wrap items-center gap-1 bg-white p-1 rounded-xl border border-stone-300 shadow-xs">
          <button
            onClick={() => setChartMode('rate')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              chartMode === 'rate'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            🔥 Oxidation Rate (g/min)
          </button>
          
          <button
            onClick={() => setChartMode('percentage')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              chartMode === 'percentage'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            📊 Fuel Mix %
          </button>

          <button
            onClick={() => setChartMode('lactate')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              chartMode === 'lactate'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            🩸 Lactate Curve
          </button>

          <button
            onClick={() => setChartMode('consumption')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              chartMode === 'consumption'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            🥧 Current Donut Mix
          </button>
        </div>
      </div>

      {/* Main Chart Body */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-stone-200 shadow-xs mb-4">
        
        {/* MODE 1: FAT & CARB OXIDATION RATES */}
        {chartMode === 'rate' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-stone-800">
              <span>Fat Oxidation Rate (g/min) vs Carbohydrate Rate</span>
              <span className="text-emerald-800 font-extrabold">Zone 2 = Peak FatOx (0.65 g/min)</span>
            </div>

            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorFat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#047857" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#047857" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorCarb" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d97706" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#d97706" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                  <XAxis dataKey="name" stroke="#44403c" tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700 }} />
                  <YAxis stroke="#44403c" tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700 }} label={{ value: 'g / min', angle: -90, position: 'insideLeft', fill: '#1c1917', fontWeight: 700 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine x="Zone 2 (FATmax)" stroke="#047857" strokeDasharray="4 4" label={{ value: '⭐ FATmax Peak', fill: '#047857', fontWeight: 800, fontSize: 13 }} />
                  <Area type="monotone" dataKey="fatRate" name="Fat Oxidation (g/min)" stroke="#047857" strokeWidth={3} fillOpacity={1} fill="url(#colorFat)" />
                  <Area type="monotone" dataKey="carbRate" name="Carb Oxidation (g/min)" stroke="#d97706" strokeWidth={3} fillOpacity={1} fill="url(#colorCarb)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* MODE 2: FUEL MIX PERCENTAGE */}
        {chartMode === 'percentage' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-stone-800">
              <span>Substrate Contribution Percentage (%)</span>
              <span className="text-emerald-800 font-extrabold">Zone 2 = 75% Fat / 25% Carbs</span>
            </div>

            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} stackOffset="expand" margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                  <XAxis dataKey="name" stroke="#44403c" tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700 }} />
                  <YAxis stroke="#44403c" tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700 }} tickFormatter={(tick) => `${tick * 100}%`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="fatPct" name="Fat Fuel %" stackId="1" stroke="#047857" fill="#047857" fillOpacity={0.85} />
                  <Area type="monotone" dataKey="carbPct" name="Carb Fuel %" stackId="1" stroke="#d97706" fill="#d97706" fillOpacity={0.85} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* MODE 3: BLOOD LACTATE CURVE */}
        {chartMode === 'lactate' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-stone-800">
              <span>Blood Lactate Accumulation Curve (mmol/L)</span>
              <span className="text-emerald-800 font-extrabold">LT1 Aerobic Threshold (~1.5-2.0 mM)</span>
            </div>

            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                  <XAxis dataKey="name" stroke="#44403c" tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700 }} />
                  <YAxis stroke="#44403c" tick={{ fill: '#1c1917', fontSize: 12, fontWeight: 700 }} label={{ value: 'mmol / L', angle: -90, position: 'insideLeft', fill: '#1c1917', fontWeight: 700 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={2.0} label={{ value: 'LT1 Aerobic Threshold (2.0 mM)', fill: '#047857', fontWeight: 800, fontSize: 12 }} stroke="#047857" strokeDasharray="3 3" />
                  <ReferenceLine y={4.0} label={{ value: 'LT2 Anaerobic Threshold (4.0 mM)', fill: '#b91c1c', fontWeight: 800, fontSize: 12 }} stroke="#b91c1c" strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="lactate" name="Lactate (mM)" stroke="#0f766e" strokeWidth={4} dot={{ r: 6, fill: '#0f766e' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* MODE 4: CURRENT DONUT PIE MIX */}
        {chartMode === 'consumption' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3 p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div className="font-bold text-stone-900 text-sm border-b border-stone-200 pb-2">
                Active Zone {activeZone.id} Fuel Selection Breakdown
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-700"></span>
                  Fat Fuel Oxidation:
                </span>
                <span className="text-base font-mono">{activeZone.fatOxidation}%</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-600"></span>
                  Carbohydrate Fuel Oxidation:
                </span>
                <span className="text-base font-mono">{activeZone.carbOxidation}%</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Explanatory Footer */}
      <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs text-stone-800 flex items-start gap-3">
        <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed font-normal">
          <strong>Chart Interpretation:</strong> Zone 2 (60-70% HRmax) maximizes total grams of fat oxidized per minute (~0.65 g/min). Beyond Zone 2, carbohydrate oxidation skyrockets while fat oxidation drops sharply as pyruvate dehydrogenase turns away fatty acids.
        </p>
      </div>
    </section>
  );
}
