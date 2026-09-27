import React, { useState } from 'react';
import { Activity, Calculator, FlaskConical, Info, CheckCircle2, Sparkles } from 'lucide-react';

export const METABOLIC_TIERS = {
  measured: {
    key: 'measured',
    label: 'MEASURED',
    shortDesc: 'Empirical Biometric Telemetry',
    fullDesc: 'Direct empirical data captured by Apple Watch optical HR sensors, GPS, accelerometers, or clinical laboratory testing (e.g. Wingate blood lactate).',
    colorClasses: 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-emerald-500/20',
    dotColor: 'bg-emerald-500',
    icon: Activity
  },
  calculated: {
    key: 'calculated',
    label: 'CALCULATED',
    shortDesc: 'Deterministic Computation',
    fullDesc: 'Mathematical computations derived directly from measured biometric inputs (e.g. Heart Rate Reserve %, ACSM gross energy formulas, split pacing).',
    colorClasses: 'bg-sky-50 text-sky-800 border-sky-300 ring-sky-500/20',
    dotColor: 'bg-sky-500',
    icon: Calculator
  },
  modeled: {
    key: 'modeled',
    label: 'MODELED',
    shortDesc: 'Cellular Simulation',
    fullDesc: 'Physiological and biochemical simulations estimating cellular flux (e.g. Frayn substrate stoichiometry, ATP turnover, Krebs cycle intermediates).',
    colorClasses: 'bg-purple-50 text-purple-800 border-purple-300 ring-purple-500/20',
    dotColor: 'bg-purple-500',
    icon: FlaskConical
  }
};

export default function MetabolicTierBadge({ tier = 'modeled', size = 'sm', showLabel = true, className = '' }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const config = METABOLIC_TIERS[tier] || METABOLIC_TIERS.modeled;
  const Icon = config.icon;

  const sizeClasses = {
    xs: 'text-[9px] px-1.5 py-0.5 gap-1',
    sm: 'text-[10px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-bold'
  }[size] || 'text-[10px] px-2 py-0.5 gap-1.5';

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`inline-flex items-center font-mono font-extrabold uppercase rounded-md border tracking-wider transition-all duration-150 cursor-pointer shadow-2xs hover:brightness-95 ${config.colorClasses} ${sizeClasses}`}
        title={`${config.label}: ${config.shortDesc}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor} animate-pulse`} />
        <Icon className="w-3 h-3 opacity-80" />
        {showLabel && <span>{config.label}</span>}
      </button>

      {/* Floating Hover/Click Explainer Tooltip */}
      {showTooltip && (
        <div 
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 rounded-xl bg-stone-900 text-white text-left shadow-xl border border-stone-700 pointer-events-none animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center gap-1.5 font-bold text-xs pb-1 border-b border-stone-800">
            <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
            <span className="tracking-wider uppercase">{config.label}</span>
            <span className="text-[10px] text-stone-400 font-normal">({config.shortDesc})</span>
          </div>
          <p className="text-[11px] text-stone-300 font-sans font-normal leading-relaxed pt-1.5">
            {config.fullDesc}
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-stone-900" />
        </div>
      )}
    </div>
  );
}

/**
 * Explanatory Banner displaying all 3 scientific tiers
 */
export function MetabolicTierLegend({ className = '' }) {
  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs font-sans space-y-3 ${className}`}>
      <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <h4 className="text-xs sm:text-sm font-extrabold text-stone-900 tracking-tight">
            Scientific Integrity Architecture: The 3 Data Tiers
          </h4>
        </div>
        <span className="text-[10px] font-mono text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
          Peer-Reviewed Transparency
        </span>
      </div>

      <p className="text-xs text-stone-600 leading-relaxed font-normal">
        Optimus maintains strict scientific boundaries by categorizing all data into three distinct biological tiers:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
        {Object.values(METABOLIC_TIERS).map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.key} 
              className={`p-3 rounded-xl border space-y-1.5 transition ${item.colorClasses}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-extrabold text-xs uppercase flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${item.dotColor}`} />
                  {item.label}
                </span>
                <Icon className="w-3.5 h-3.5 opacity-70" />
              </div>
              <div className="text-[11px] font-bold text-stone-800">
                {item.shortDesc}
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed font-normal">
                {item.fullDesc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
