import React from 'react';

/**
 * FestivePineGarland
 * Rich, dense, opulent Christmas pine garland featuring:
 * - Thick multi-layered evergreen sprays (shadow spruce, emerald cedar, bright frosted pine)
 * - Natural 3D textured pinecones with layered wooden scales and snow tips
 * - Plump, lustrous clusters of ruby red holly berries with high-gloss highlights
 * - Full, lush botanical overhang framing the bottom edge of the chocolate-and-gold ribbon
 *
 * 100% Static SVG, Zero JS timers, Zero filter loops.
 * Blazing fast, GPU-friendly 60 FPS mobile rendering.
 */

// 1. Natural 3D Pinecone with Realistic Overlapping Wood Scales
const NaturalPinecone: React.FC<{
  x: number;
  y: number;
  scale?: number;
  rotation?: number;
}> = ({ x, y, scale = 1, rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}>
    {/* Base shadow ellipse */}
    <ellipse cx="0" cy="8" rx="8" ry="12" fill="#140803" opacity="0.75" />

    {/* Layer 1 - Bottom / Base Scales */}
    <path
      d="M -5 16 C -2 19 2 19 5 16 C 3 14 -3 14 -5 16 Z"
      fill="#2A1408"
      stroke="#190B04"
      strokeWidth="0.5"
    />
    <path
      d="M -7.5 12 C -3 16 3 16 7.5 12 C 4.5 10 -4.5 10 -7.5 12 Z"
      fill="#3A1C0D"
      stroke="#220E05"
      strokeWidth="0.5"
    />

    {/* Layer 2 - Lower Mid Scales */}
    <path
      d="M -8.5 7.5 C -3.5 12 3.5 12 8.5 7.5 C 5 5 -5 5 -8.5 7.5 Z"
      fill="#4C2512"
      stroke="#2E1408"
      strokeWidth="0.5"
    />
    {/* Snow frost accents on scale tips */}
    <ellipse cx="-4" cy="8.5" rx="1.8" ry="0.6" fill="#FFF9F2" opacity="0.7" />
    <ellipse cx="4" cy="8.5" rx="1.8" ry="0.6" fill="#FFF9F2" opacity="0.7" />

    {/* Layer 3 - Middle Bracts */}
    <path
      d="M -9 2.5 C -3.5 7 3.5 7 9 2.5 C 5.5 0 -5.5 0 -9 2.5 Z"
      fill="#5E3017"
      stroke="#38190B"
      strokeWidth="0.5"
    />
    <ellipse cx="0" cy="4" rx="2.5" ry="0.7" fill="#FFF9F2" opacity="0.8" />
    <ellipse cx="-5.5" cy="3.5" rx="1.8" ry="0.6" fill="#FFF9F2" opacity="0.65" />
    <ellipse cx="5.5" cy="3.5" rx="1.8" ry="0.6" fill="#FFF9F2" opacity="0.65" />

    {/* Layer 4 - Upper Mid Scales */}
    <path
      d="M -8 -2.5 C -3 2 3 2 8 -2.5 C 5 -4.5 -5 -4.5 -8 -2.5 Z"
      fill="#703B1E"
      stroke="#44200E"
      strokeWidth="0.5"
    />
    <ellipse cx="-3.5" cy="-1.5" rx="2" ry="0.6" fill="#FFF9F2" opacity="0.75" />
    <ellipse cx="3.5" cy="-1.5" rx="2" ry="0.6" fill="#FFF9F2" opacity="0.75" />

    {/* Layer 5 - Upper Scales */}
    <path
      d="M -6.5 -7 C -2.5 -3 2.5 -3 6.5 -7 C 4 -9 -4 -9 -6.5 -7 Z"
      fill="#824724"
      stroke="#502712"
      strokeWidth="0.5"
    />
    <ellipse cx="0" cy="-5.5" rx="2.2" ry="0.6" fill="#FFF9F2" opacity="0.85" />

    {/* Layer 6 - Crown Scales */}
    <path
      d="M -4.5 -11 C -1.5 -8 1.5 -8 4.5 -11 C 2.5 -13 -2.5 -13 -4.5 -11 Z"
      fill="#96542D"
      stroke="#5C2F17"
      strokeWidth="0.5"
    />
    <ellipse cx="0" cy="-10" rx="1.5" ry="0.5" fill="#FFF9F2" opacity="0.9" />

    {/* Woody Stem at Top */}
    <path d="M 0 -11 L 0 -14" stroke="#2B150A" strokeWidth="1.2" strokeLinecap="round" />
  </g>
);

// 2. High-Gloss Plump Ruby Holly Berries Cluster
const LustrousBerryCluster: React.FC<{
  x: number;
  y: number;
  scale?: number;
}> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {/* Woody brown berry stems */}
    <path d="M 0 6 Q -2 2 -5 0" fill="none" stroke="#2E170C" strokeWidth="1" strokeLinecap="round" />
    <path d="M 0 6 Q 2 2 5 -1" fill="none" stroke="#2E170C" strokeWidth="1" strokeLinecap="round" />
    <path d="M 0 6 Q 0 1 0 -6" fill="none" stroke="#2E170C" strokeWidth="1" strokeLinecap="round" />
    <path d="M 0 6 Q 3 5 7 6" fill="none" stroke="#2E170C" strokeWidth="1" strokeLinecap="round" />

    {/* Berry 1 - Lower Left */}
    <g transform="translate(-5, 0)">
      <circle cx="0" cy="0" r="4.2" fill="#800606" />
      <circle cx="0.4" cy="-0.4" r="3.7" fill="#B91C1C" />
      <circle cx="0.6" cy="-0.6" r="3" fill="#DC2626" />
      <circle cx="0.8" cy="-0.8" r="2" fill="#EF4444" />
      {/* Specular curved reflection */}
      <ellipse cx="-1.2" cy="-1.4" rx="1.2" ry="0.7" transform="rotate(-30 -1.2 -1.4)" fill="#FFFFFF" opacity="0.92" />
      <circle cx="1.6" cy="1.6" r="0.6" fill="#450A0A" />
    </g>

    {/* Berry 2 - Right */}
    <g transform="translate(5, -1)">
      <circle cx="0" cy="0" r="4.4" fill="#800606" />
      <circle cx="0.4" cy="-0.4" r="3.9" fill="#B91C1C" />
      <circle cx="0.6" cy="-0.6" r="3.2" fill="#DC2626" />
      <circle cx="0.8" cy="-0.8" r="2.1" fill="#EF4444" />
      <ellipse cx="-1.3" cy="-1.5" rx="1.3" ry="0.8" transform="rotate(-35 -1.3 -1.5)" fill="#FFFFFF" opacity="0.92" />
      <circle cx="1.7" cy="1.7" r="0.6" fill="#450A0A" />
    </g>

    {/* Berry 3 - Top Center */}
    <g transform="translate(0, -6)">
      <circle cx="0" cy="0" r="4.3" fill="#800606" />
      <circle cx="0.4" cy="-0.4" r="3.8" fill="#B91C1C" />
      <circle cx="0.6" cy="-0.6" r="3.1" fill="#E11D48" />
      <circle cx="0.8" cy="-0.8" r="2" fill="#F43F5E" />
      <ellipse cx="-1.2" cy="-1.4" rx="1.2" ry="0.7" transform="rotate(-30 -1.2 -1.4)" fill="#FFFFFF" opacity="0.95" />
      <circle cx="1.6" cy="1.6" r="0.6" fill="#450A0A" />
    </g>

    {/* Berry 4 - Flanking Accent */}
    <g transform="translate(7, 6)">
      <circle cx="0" cy="0" r="3.3" fill="#7F1D1D" />
      <circle cx="0.3" cy="-0.3" r="2.9" fill="#DC2626" />
      <circle cx="0.5" cy="-0.5" r="1.8" fill="#EF4444" />
      <ellipse cx="-0.9" cy="-1" rx="0.9" ry="0.5" transform="rotate(-30 -0.9 -1)" fill="#FFFFFF" opacity="0.9" />
    </g>
  </g>
);

// 3. Dense, Multi-Tier Pine & Cedar Spray
const DensePineSpray: React.FC<{
  x: number;
  y: number;
  scale?: number;
  flip?: boolean;
}> = ({ x, y, scale = 1, flip = false }) => (
  <g transform={`translate(${x}, ${y}) scale(${flip ? -scale : scale}, ${scale})`}>
    {/* Main arched woody branch stem */}
    <path
      d="M 0 0 Q 35 10 85 12"
      fill="none"
      stroke="#27140B"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <path
      d="M 25 6 Q 45 18 68 22"
      fill="none"
      stroke="#331A0E"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* TIER 1: Deep Background Spruce Foliage (Deep Forest Shadow) */}
    <g stroke="#091E10" strokeWidth="2.2" strokeLinecap="round">
      {/* Upward needles */}
      <line x1="8" y1="2" x2="16" y2="-12" />
      <line x1="14" y1="4" x2="24" y2="-11" />
      <line x1="20" y1="5" x2="33" y2="-10" />
      <line x1="28" y1="7" x2="43" y2="-9" />
      <line x1="36" y1="8" x2="53" y2="-8" />
      <line x1="44" y1="9" x2="63" y2="-7" />
      <line x1="52" y1="10" x2="73" y2="-6" />
      <line x1="62" y1="11" x2="84" y2="-5" />

      {/* Downward hanging needles */}
      <line x1="10" y1="3" x2="18" y2="17" />
      <line x1="16" y1="4" x2="26" y2="20" />
      <line x1="24" y1="6" x2="36" y2="22" />
      <line x1="32" y1="8" x2="47" y2="24" />
      <line x1="40" y1="9" x2="58" y2="24" />
      <line x1="50" y1="10" x2="70" y2="23" />
      <line x1="60" y1="11" x2="81" y2="21" />
      <line x1="70" y1="12" x2="90" y2="18" />

      {/* Secondary branchlet needles */}
      <line x1="30" y1="9" x2="40" y2="28" />
      <line x1="38" y1="13" x2="52" y2="30" />
      <line x1="48" y1="16" x2="64" y2="30" />
      <line x1="58" y1="19" x2="75" y2="28" />
    </g>

    {/* TIER 2: Rich Forest & Emerald Needles (Body of the Bough) */}
    <g stroke="#144621" strokeWidth="1.8" strokeLinecap="round">
      {/* Upward needles */}
      <line x1="6" y1="1" x2="14" y2="-9" />
      <line x1="12" y1="3" x2="22" y2="-8" />
      <line x1="18" y1="4" x2="30" y2="-7" />
      <line x1="25" y1="6" x2="39" y2="-6" />
      <line x1="33" y1="7" x2="49" y2="-5" />
      <line x1="41" y1="8" x2="59" y2="-4" />
      <line x1="50" y1="10" x2="69" y2="-3" />
      <line x1="58" y1="11" x2="79" y2="-2" />
      <line x1="68" y1="12" x2="88" y2="0" />

      {/* Downward hanging needles */}
      <line x1="8" y1="2" x2="15" y2="14" />
      <line x1="14" y1="4" x2="23" y2="17" />
      <line x1="22" y1="5" x2="33" y2="18" />
      <line x1="30" y1="7" x2="43" y2="20" />
      <line x1="38" y1="8" x2="54" y2="20" />
      <line x1="47" y1="10" x2="65" y2="19" />
      <line x1="56" y1="11" x2="76" y2="18" />
      <line x1="66" y1="12" x2="86" y2="15" />

      {/* Secondary branchlet */}
      <line x1="28" y1="8" x2="37" y2="24" />
      <line x1="36" y1="12" x2="48" y2="26" />
      <line x1="45" y1="15" x2="59" y2="26" />
      <line x1="54" y1="18" x2="70" y2="25" />
    </g>

    {/* TIER 3: Vibrant Pine Green Needles (Mid-Front Layer) */}
    <g stroke="#1E6B32" strokeWidth="1.4" strokeLinecap="round">
      <line x1="10" y1="2" x2="17" y2="-6" />
      <line x1="17" y1="4" x2="26" y2="-5" />
      <line x1="24" y1="5" x2="35" y2="-4" />
      <line x1="32" y1="7" x2="45" y2="-3" />
      <line x1="40" y1="8" x2="54" y2="-2" />
      <line x1="48" y1="9" x2="64" y2="-1" />
      <line x1="56" y1="11" x2="74" y2="1" />
      <line x1="66" y1="12" x2="83" y2="3" />

      {/* Downward needles */}
      <line x1="12" y1="3" x2="19" y2="12" />
      <line x1="19" y1="4" x2="28" y2="14" />
      <line x1="27" y1="6" x2="38" y2="16" />
      <line x1="35" y1="7" x2="48" y2="17" />
      <line x1="44" y1="9" x2="59" y2="17" />
      <line x1="53" y1="10" x2="70" y2="16" />
      <line x1="63" y1="11" x2="81" y2="14" />
    </g>

    {/* TIER 4: Frosted & Sun-Lit Golden Pine Needle Tips (Surface Luster) */}
    <g stroke="#3FA855" strokeWidth="1.1" strokeLinecap="round">
      <line x1="15" y1="3" x2="23" y2="-3" />
      <line x1="22" y1="5" x2="32" y2="-2" />
      <line x1="30" y1="6" x2="41" y2="-1" />
      <line x1="38" y1="8" x2="50" y2="0" />
      <line x1="46" y1="9" x2="60" y2="2" />
      <line x1="55" y1="10" x2="70" y2="4" />

      {/* Frosted downward tips */}
      <line x1="16" y1="3" x2="23" y2="10" />
      <line x1="24" y1="5" x2="33" y2="12" />
      <line x1="33" y1="7" x2="43" y2="13" />
      <line x1="42" y1="8" x2="54" y2="14" />
      <line x1="51" y1="10" x2="65" y2="13" />
    </g>

    {/* Subtle snow-dusted tips */}
    <g stroke="#EDF7ED" strokeWidth="0.8" strokeLinecap="round" opacity="0.75">
      <line x1="25" y1="-2" x2="32" y2="-2" />
      <line x1="43" y1="0" x2="50" y2="0" />
      <line x1="62" y1="2" x2="70" y2="4" />
      <line x1="35" y1="12" x2="43" y2="13" />
      <line x1="56" y1="13" x2="65" y2="13" />
    </g>
  </g>
);

export const FestivePineGarland: React.FC<{ className?: string }> = ({ className = '' }) => {
  // Repeating motif unit: 160px wide
  // Contains 3 dense multi-tier pine sprays, 1 primary pinecone, 1 secondary companion pinecone, and 2 lustrous berry clusters
  const unitWidth = 160;
  const units = Array.from({ length: 15 });

  return (
    <div
      className={`absolute bottom-[-18px] sm:bottom-[-22px] md:bottom-[-26px] left-0 right-0 w-full overflow-hidden pointer-events-none select-none z-20 ${className}`}
      style={{ height: '48px' }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 2400 52"
        className="w-[2400px] h-[52px] max-w-none transform -translate-x-4 sm:-translate-x-2"
        preserveAspectRatio="xMinYMin meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Deep warm garland drop-shadow for dense 3D visual presence */}
          <filter id="densePineShadow" x="-10%" y="-15%" width="120%" height="140%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#140702" floodOpacity="0.85" />
          </filter>
        </defs>

        <g filter="url(#densePineShadow)">
          {/* 1. LAYER 1: Deep Continuous Dense Pine Boughs Foundation */}
          {units.map((_, i) => {
            const baseX = i * unitWidth;
            return (
              <React.Fragment key={`pine-boughs-${i}`}>
                {/* Left flowing main evergreen bough */}
                <DensePineSpray x={baseX} y={10} scale={1.05} flip={false} />
                {/* Center filler branch for thick lush body */}
                <DensePineSpray x={baseX + 45} y={13} scale={0.92} flip={false} />
                {/* Right flowing overlapping counter-branch */}
                <DensePineSpray x={baseX + 115} y={11} scale={1.02} flip={true} />
              </React.Fragment>
            );
          })}

          {/* 2. LAYER 2: Prominent Natural Pinecones and Lustrous Ruby Berries */}
          {units.map((_, i) => {
            const baseX = i * unitWidth;
            const isEven = i % 2 === 0;

            return (
              <React.Fragment key={`botanical-accents-${i}`}>
                {/* A. Primary Natural Textured Pinecone with Snow Tips */}
                <NaturalPinecone
                  x={baseX + (isEven ? 56 : 64)}
                  y={19}
                  scale={isEven ? 1.08 : 0.96}
                  rotation={isEven ? -16 : 14}
                />

                {/* B. Secondary Companion Small Pinecone tucked in foliage */}
                <NaturalPinecone
                  x={baseX + (isEven ? 134 : 124)}
                  y={22}
                  scale={isEven ? 0.78 : 0.84}
                  rotation={isEven ? 18 : -14}
                />

                {/* C. Primary Lustrous Ruby Holly Berry Cluster */}
                <LustrousBerryCluster
                  x={baseX + (isEven ? 96 : 88)}
                  y={17}
                  scale={1.05}
                />

                {/* D. Secondary Delicate Berry Pair nestled among needles */}
                <LustrousBerryCluster
                  x={baseX + (isEven ? 154 : 148)}
                  y={20}
                  scale={0.82}
                />
              </React.Fragment>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
