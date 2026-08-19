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
    { name: 'Fat Consumption (9 kcal/g)', value: activeZone.fatOxidation, color: '#10b981' },
    { name: 'Carb Consumption (4 kcal/g)', value: activeZone.carbOxidation, color: '#f59e0b' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 rounded-xl border border-slate-700 shadow-xl text-xs space-y-1 bg-slate-900/95">
          <div className="font-bold text-slate-100 border-b border-slate-800 pb-1 flex items-center justify-between gap-3">
            <span>{label || payload[0]?.name}</span>
            {payload[0]?.payload?.hr && <span className="text-[10px] text-teal-400">HR: {payload[0]?.payload?.hr}</span>}
          </div>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5" style={{ color: entry.color || entry.payload?.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.payload?.color }}></span>
                {entry.name}:
              </span>
              <strong className="font-mono text-slate-200">{entry.value} {entry.unit || '%'}</strong>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="glass-panel rounded-2xl p-5 md:p-6 border border-slate-800 shadow-2xl mb-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-slate-100">Substrate & Fuel Consumption Charts</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time visual curves and consumption mix for Fat vs Carbohydrate fuel sources.
          </p>
        </div>

        {/* Mode Buttons */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setChartMode('rate')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              chartMode === 'rate'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Oxidation Rate (g/min)</span>
          </button>

          <button
            onClick={() => setChartMode('consumption')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              chartMode === 'consumption'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5 text-slate-950" />
            <span>Fuel Mix Donut (%)</span>
          </button>

          <button
            onClick={() => setChartMode('lactate')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              chartMode === 'lactate'
                ? 'bg-teal-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Droplet className="w-3.5 h-3.5" />
            <span>Lactate Curve (mM)</span>
          </button>
        </div>
      </div>

      {/* Graphical Chart Display Container */}
      <div className="w-full h-80 bg-slate-950/80 p-4 rounded-xl border border-slate-800/90 relative flex items-center justify-center">
        
        {/* CHART 1: Oxidation Rate */}
        {chartMode === 'rate' && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorFat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorCarb" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit=" g/m" />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} />
              <ReferenceLine x="Zone 2 (FATmax)" stroke="#34d399" strokeDasharray="4 4" label={{ value: '🔥 FATmax Peak (0.65 g/min)', fill: '#34d399', fontSize: 11, fontWeight: 'bold' }} />
              <Area type="monotone" dataKey="fatRate" name="Fat Oxidation Rate" unit="g/min" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorFat)" />
              <Area type="monotone" dataKey="carbRate" name="Carbohydrate Oxidation Rate" unit="g/min" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorCarb)" />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {/* CHART 2: Fuel Consumption Donut Pie Chart */}
        {chartMode === 'consumption' && (
          <div className="w-full h-full flex flex-col md:flex-row items-center justify-around gap-4">
            <div className="w-64 h-64 relative">
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
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-2xl font-extrabold text-emerald-400">{activeZone.fatOxidation}%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Fat Energy</span>
              </div>
            </div>

            {/* Consumption Side Breakdown Cards */}
            <div className="space-y-3 w-full max-w-sm">
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <div>
                    <span className="font-bold text-emerald-300 block">🥑 Fat Consumption</span>
                    <span className="text-slate-400 text-[10px]">High Efficiency (9 kcal/g)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-emerald-300 text-sm">{activeZone.fatOxidation}%</span>
                  <span className="block text-[10px] text-slate-400">~0.65 g/min</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <div>
                    <span className="font-bold text-amber-300 block">🍇 Glucose Consumption</span>
                    <span className="text-slate-400 text-[10px]">Glycogen Spared (4 kcal/g)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-amber-300 text-sm">{activeZone.carbOxidation}%</span>
                  <span className="block text-[10px] text-slate-400">~0.25 g/min</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* CHART 3: Blood Lactate Curve */}
        {chartMode === 'lactate' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit=" mM" domain={[0, 10]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} />
              <ReferenceLine y={2.0} stroke="#14b8a6" strokeDasharray="5 5" label={{ value: 'LT1 (Aerobic Threshold ~2.0 mM)', fill: '#14b8a6', fontSize: 10, fontWeight: 'bold' }} />
              <ReferenceLine y={4.0} stroke="#f43f5e" strokeDasharray="5 5" label={{ value: 'LT2 (Anaerobic Threshold ~4.0 mM)', fill: '#f43f5e', fontSize: 10, fontWeight: 'bold' }} />
              <Line type="monotone" dataKey="lactate" name="Blood Lactate Concentration" unit="mmol/L" stroke="#f43f5e" strokeWidth={3.5} dot={{ r: 6, fill: '#f43f5e' }} activeDot={{ r: 9 }} />
            </LineChart>
          </ResponsiveContainer>
        )}

      </div>

      <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-center gap-3">
        <Info className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          <strong>Fuel Consumption Ratio:</strong> In Zone 2, Fat Consumption accounts for <strong>{activeZone.fatOxidation}%</strong> of total energy, providing clean, high-density power at 9 kcal per gram!
        </span>
      </div>

    </section>
  );
}
