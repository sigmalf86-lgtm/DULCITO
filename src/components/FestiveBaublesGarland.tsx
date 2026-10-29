import React from 'react';

/**
 * FestiveBaublesGarland
 * Elegant hanging Christmas garland featuring:
 * - Hanging 3D Christmas Baubles ("bambalinas" in champagne gold, ruby red, pearl ivory, forest green)
 * - Little Christmas Trees ("arbolitos de navidad" with golden star, tiered pine branches and ornament beads)
 * - Golden Christmas Bells ("campanas" with ruby ribbon bow, fluted gold body and swinging clapper)
 * - Graceful swagging catenary golden cords
 * - Zero snowflakes, highly optimized SVG vector rendering for silky 60 FPS performance.
 */

// Ornate Fluted Golden Cap + Ring for Baubles
const BaubleCap: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    {/* Hanging Loop / Ring */}
    <circle
      cx="0"
      cy="-7"
      r="2.8"
      fill="none"
      stroke="url(#baubleGoldCapGrad)"
      strokeWidth="1"
    />
    {/* Crown Rim / Base */}
    <path
      d="M -4.2 -4.2 L 4.2 -4.2 L 3.5 0 L -3.5 0 Z"
      fill="url(#baubleGoldCapGrad)"
      stroke="#7A5200"
      strokeWidth="0.4"
    />
    {/* Fluted ridges */}
    <line x1="-2" y1="-4" x2="-1.6" y2="0" stroke="#FFF5B8" strokeWidth="0.5" />
    <line x1="0" y1="-4.2" x2="0" y2="0" stroke="#FFF5B8" strokeWidth="0.6" />
    <line x1="2" y1="-4" x2="1.6" y2="0" stroke="#7A5200" strokeWidth="0.5" />
  </g>
);

// Spherical 3D Bauble
type BaubleVariant = 'gold' | 'ruby' | 'pearl' | 'green';

interface BaubleProps {
  x: number;
  dropLength: number; // Vertical drop distance from top cord
  variant: BaubleVariant;
  radius?: number;
}

const BaubleItem: React.FC<BaubleProps> = ({ x, dropLength, variant, radius = 11 }) => {
  const capY = dropLength;
  const sphereY = dropLength + radius - 0.5;

  let gradientId = 'baubleGoldGrad';
  let rimColor = '#8A5807';
  if (variant === 'ruby') {
    gradientId = 'baubleRubyGrad';
    rimColor = '#5B0C18';
  } else if (variant === 'pearl') {
    gradientId = 'baublePearlGrad';
    rimColor = '#948370';
  } else if (variant === 'green') {
    gradientId = 'baubleGreenGrad';
    rimColor = '#0E3E1C';
  }

  return (
    <g transform={`translate(${x}, 0)`}>
      {/* Golden hanging thread from swag cord */}
      <line
        x1="0"
        y1="0"
        x2="0"
        y2={capY - 9.5}
        stroke="#E6B847"
        strokeWidth="0.85"
        strokeOpacity="0.85"
      />
      {/* Tiny gold attachment bead */}
      <circle cx="0" cy="0" r="1.1" fill="#FFDF73" stroke="#9E7314" strokeWidth="0.4" />

      {/* Cap & Hanging Ring */}
      <BaubleCap x={0} y={capY} />

      {/* 3D Spherical Bauble */}
      <circle
        cx="0"
        cy={sphereY}
        r={radius}
        fill={`url(#${gradientId})`}
        stroke={rimColor}
        strokeWidth="0.5"
      />

      {/* Glass / Satin Specular Curved Glint */}
      <ellipse
        cx="-3.2"
        cy={sphereY - 3.4}
        rx={radius * 0.32}
        ry={radius * 0.18}
        transform={`rotate(-28 -3.2 ${sphereY - 3.4})`}
        fill="#FFFFFF"
        opacity={variant === 'pearl' ? '0.75' : variant === 'ruby' ? '0.5' : '0.65'}
        filter="url(#baubleSoftGlow)"
      />

      {/* Subtle bottom-right bounce light */}
      <ellipse
        cx="3.5"
        cy={sphereY + 4}
        rx={radius * 0.4}
        ry={radius * 0.16}
        transform={`rotate(-35 3.5 ${sphereY + 4})`}
        fill="#FDF3B8"
        opacity={variant === 'ruby' ? '0.18' : '0.35'}
      />
    </g>
  );
};

// Little Festive Christmas Tree ("Arbolito de Navidad")
interface TreeProps {
  x: number;
  dropLength: number;
  scale?: number;
}

const ChristmasTreeItem: React.FC<TreeProps> = ({ x, dropLength, scale = 0.95 }) => {
  const treeY = dropLength + 11;

  return (
    <g transform={`translate(${x}, 0)`}>
      {/* Hanging thread */}
      <line
        x1="0"
        y1="0"
        x2="0"
        y2={treeY - 9}
        stroke="#E6B847"
        strokeWidth="0.85"
        strokeOpacity="0.85"
      />
      {/* Top golden suspension ring */}
      <circle
        cx="0"
        cy={treeY - 8}
        r="1.8"
        fill="none"
        stroke="url(#baubleGoldCapGrad)"
        strokeWidth="0.8"
      />

      {/* Tree Body */}
      <g transform={`translate(0, ${treeY}) scale(${scale})`}>
        {/* Soft shadow */}
        <ellipse cx="0" cy="9" rx="8" ry="2.6" fill="#3D2005" opacity="0.25" filter="url(#baubleSoftGlow)" />

        {/* Tree Trunk */}
        <rect x="-1.8" y="6.8" width="3.6" height="4" rx="0.8" fill="#5A2E0F" stroke="#3D1A04" strokeWidth="0.4" />

        {/* Tier 3 (Bottom bough) */}
        <path
          d="M 0 -1 L 8.5 7.5 L -8.5 7.5 Z"
          fill="url(#treeFoliageGrad)"
          stroke="#0B381B"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />

        {/* Tier 2 (Middle bough) */}
        <path
          d="M 0 -4 L 7 3.5 L -7 3.5 Z"
          fill="url(#treeFoliageGrad)"
          stroke="#0B381B"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />

        {/* Tier 1 (Top bough) */}
        <path
          d="M 0 -7 L 5.2 -0.5 L -5.2 -0.5 Z"
          fill="url(#treeFoliageGrad)"
          stroke="#0B381B"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />

        {/* Frost / snow decorative trim */}
        <path d="M -7.5 7.4 Q -3.8 5.8 0 7 Q 3.8 5.8 7.5 7.4" fill="none" stroke="#FFFFFF" strokeWidth="0.65" opacity="0.65" strokeLinecap="round" />
        <path d="M -6 3.4 Q -3 2.1 0 3 Q 3 2.1 6 3.4" fill="none" stroke="#FFFFFF" strokeWidth="0.55" opacity="0.65" strokeLinecap="round" />
        <path d="M -4.4 -0.6 Q -2 -1.4 0 -0.8 Q 2 -1.4 4.4 -0.6" fill="none" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.65" strokeLinecap="round" />

        {/* Tiny festive bauble ornament specks */}
        <circle cx="-3.6" cy="5.4" r="0.85" fill="#E11D48" />
        <circle cx="3.4" cy="5.8" r="0.85" fill="#FFDF73" />
        <circle cx="0" cy="4.2" r="0.75" fill="#FFFFFF" />
        <circle cx="-2.6" cy="1.6" r="0.8" fill="#FFDF73" />
        <circle cx="2.4" cy="1.5" r="0.8" fill="#E11D48" />
        <circle cx="0" cy="-2.4" r="0.7" fill="#FFDF73" />

        {/* Golden Apex Star */}
        <path
          d="M 0 -11 L 1.2 -8.5 L 3.8 -8.5 L 1.8 -7 L 2.5 -4.5 L 0 -6 L -2.5 -4.5 L -1.8 -7 L -3.8 -8.5 L -1.2 -8.5 Z"
          fill="url(#baubleGoldCapGrad)"
          stroke="#8A5807"
          strokeWidth="0.3"
          strokeLinejoin="round"
        />
        <circle cx="0" cy="-7.5" r="0.65" fill="#FFFBE6" />
      </g>
    </g>
  );
};

// Golden Christmas Bell with Ruby Ribbon Knot ("Campana Navideña")
interface BellProps {
  x: number;
  dropLength: number;
  scale?: number;
}

const ChristmasBellItem: React.FC<BellProps> = ({ x, dropLength, scale = 0.95 }) => {
  const bellY = dropLength + 10;

  return (
    <g transform={`translate(${x}, 0)`}>
      {/* Hanging thread */}
      <line
        x1="0"
        y1="0"
        x2="0"
        y2={bellY - 9}
        stroke="#E6B847"
        strokeWidth="0.85"
        strokeOpacity="0.85"
      />
      {/* Top golden loop */}
      <circle
        cx="0"
        cy={bellY - 8}
        r="2"
        fill="none"
        stroke="url(#baubleGoldCapGrad)"
        strokeWidth="0.8"
      />

      <g transform={`translate(0, ${bellY}) scale(${scale})`}>
        {/* Soft shadow */}
        <ellipse cx="0" cy="9.2" rx="7.5" ry="2.4" fill="#3D2005" opacity="0.25" filter="url(#baubleSoftGlow)" />

        {/* Clapper / Badajo */}
        <line x1="0" y1="3.5" x2="0" y2="7.8" stroke="#8A5807" strokeWidth="1" />
        <circle cx="0" cy="8" r="1.6" fill="url(#baubleGoldCapGrad)" stroke="#6B4103" strokeWidth="0.4" />
        <circle cx="-0.4" cy="7.6" r="0.45" fill="#FFFFFF" opacity="0.8" />

        {/* Bell Body (fluted silhouette) */}
        <path
          d="M -3 -5 
             C -3 -7 3 -7 3 -5 
             C 3.2 -1 4.5 3 7.5 6 
             C 7.8 6.5 7.5 7.5 6.5 7.5 
             L -6.5 7.5 
             C -7.5 7.5 -7.8 6.5 -7.5 6 
             C -4.5 3 -3.2 -1 -3 -5 Z"
          fill="url(#bellGoldGrad)"
          stroke="#7A5200"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />

        {/* Bell rim flange ring */}
        <ellipse
          cx="0"
          cy="7"
          rx="7.2"
          ry="1.4"
          fill="url(#baubleGoldCapGrad)"
          stroke="#6B4103"
          strokeWidth="0.4"
        />
        {/* Inner rim shadow */}
        <ellipse cx="0" cy="7.2" rx="5.8" ry="0.9" fill="#422203" opacity="0.6" />

        {/* Specular Curved Highlight */}
        <path
          d="M -2.2 -4 C -2 -1 -3 3 -5 5.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.65"
          filter="url(#baubleSoftGlow)"
        />

        {/* Festive Red Ribbon Bow at the crown */}
        {/* Left loop */}
        <path d="M 0 -6.5 C -3 -9.5 -5 -6.5 -1.2 -5.8 Z" fill="#E11D48" stroke="#9F1239" strokeWidth="0.3" />
        {/* Right loop */}
        <path d="M 0 -6.5 C 3 -9.5 5 -6.5 1.2 -5.8 Z" fill="#E11D48" stroke="#9F1239" strokeWidth="0.3" />
        {/* Ribbon tails */}
        <path d="M -0.5 -5.8 Q -2.4 -3.5 -3.2 -1.8" fill="none" stroke="#E11D48" strokeWidth="0.75" strokeLinecap="round" />
        <path d="M 0.5 -5.8 Q 2.4 -3.5 3.2 -1.8" fill="none" stroke="#E11D48" strokeWidth="0.75" strokeLinecap="round" />
        {/* Ribbon knot center */}
        <circle cx="0" cy="-6.2" r="1.1" fill="#FFDF73" stroke="#9E7314" strokeWidth="0.3" />
      </g>
    </g>
  );
};

export const FestiveBaublesGarland: React.FC<{ className?: string }> = ({ className = '' }) => {
  // Rhythmic repeating segments of 240px:
  // 1. Arbolito de Navidad (Christmas Tree)
  // 2. Champagne Gold Bauble
  // 3. Campana Navideña (Christmas Bell)
  // 4. Deep Ruby Red Bauble
  // 5. Olive/Forest Green or Pearlescent Bauble
  // 6. Campana Navideña or Arbolito de Navidad
  const segmentWidth = 240;
  const totalSegments = 11; // 2640px covers wide screens smoothly

  return (
    <div
      className={`absolute top-0 left-0 right-0 w-full overflow-hidden pointer-events-none select-none z-20 ${className}`}
      style={{ height: '48px' }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 2640 48"
        className="w-[2640px] h-[48px] max-w-none transform -translate-x-3 sm:-translate-x-2"
        preserveAspectRatio="xMinYMin meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Champagne & Metallic Gold Bauble Shading */}
          <radialGradient id="baubleGoldGrad" cx="35%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#FFF9E0" />
            <stop offset="22%" stopColor="#F5D77F" />
            <stop offset="60%" stopColor="#D4A12B" />
            <stop offset="85%" stopColor="#9E6E10" />
            <stop offset="100%" stopColor="#5E4006" />
          </radialGradient>

          {/* Deep Cranberry / Ruby Red Bauble Shading */}
          <radialGradient id="baubleRubyGrad" cx="34%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#FFC2C2" />
            <stop offset="20%" stopColor="#E63956" />
            <stop offset="55%" stopColor="#B91C36" />
            <stop offset="85%" stopColor="#750E22" />
            <stop offset="100%" stopColor="#3C0510" />
          </radialGradient>

          {/* Pearlescent Cream / White Bauble Shading */}
          <radialGradient id="baublePearlGrad" cx="34%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#F9F6F0" />
            <stop offset="65%" stopColor="#E6DEC8" />
            <stop offset="88%" stopColor="#B8AB96" />
            <stop offset="100%" stopColor="#7C705D" />
          </radialGradient>

          {/* Sage & Forest Green Bauble Shading */}
          <radialGradient id="baubleGreenGrad" cx="34%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#D1F5DD" />
            <stop offset="22%" stopColor="#489C68" />
            <stop offset="58%" stopColor="#226B3E" />
            <stop offset="85%" stopColor="#134727" />
            <stop offset="100%" stopColor="#082312" />
          </radialGradient>

          {/* Metallic Gold Cap Gradient */}
          <linearGradient id="baubleGoldCapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B8" />
            <stop offset="40%" stopColor="#F0C555" />
            <stop offset="75%" stopColor="#C4911D" />
            <stop offset="100%" stopColor="#7D5505" />
          </linearGradient>

          {/* Golden Bell Body Gradient */}
          <linearGradient id="bellGoldGrad" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#FFF9E0" />
            <stop offset="25%" stopColor="#F5D77F" />
            <stop offset="55%" stopColor="#D4A12B" />
            <stop offset="85%" stopColor="#9E6E10" />
            <stop offset="100%" stopColor="#5E4006" />
          </linearGradient>

          {/* Evergreen Pine Foliage Gradient for Christmas Trees */}
          <linearGradient id="treeFoliageGrad" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="20%" stopColor="#15803D" />
            <stop offset="65%" stopColor="#166534" />
            <stop offset="100%" stopColor="#0B381B" />
          </linearGradient>

          {/* Hanging Golden String Wire Gradient */}
          <linearGradient id="garlandWireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4A737" />
            <stop offset="50%" stopColor="#FFF1AA" />
            <stop offset="100%" stopColor="#D4A737" />
          </linearGradient>

          {/* Soft Blur for Specular Glint */}
          <filter id="baubleSoftGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.4" />
          </filter>

          {/* Subtle Ambient Depth Shadow */}
          <filter id="baubleMasterShadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="1.8" stdDeviation="1.5" floodColor="#261203" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* 1. Golden Swag Cords (Curving gracefully across the ribbon) */}
        {Array.from({ length: totalSegments }).map((_, i) => {
          const x0 = i * segmentWidth;
          const xEnd = (i + 1) * segmentWidth;
          const xMid = x0 + segmentWidth / 2;
          return (
            <React.Fragment key={`swag-cord-${i}`}>
              {/* Cord shadow */}
              <path
                d={`M ${x0} 2 Q ${xMid} 10 ${xEnd} 2`}
                fill="none"
                stroke="#3D2005"
                strokeWidth="1.6"
                opacity="0.35"
              />
              {/* Shimmering Gold Cord */}
              <path
                d={`M ${x0} 1.5 Q ${xMid} 9.5 ${xEnd} 1.5`}
                fill="none"
                stroke="url(#garlandWireGrad)"
                strokeWidth="1.1"
              />
              {/* Delicate Gold Sparkle Dots on the Cord */}
              <circle cx={x0} cy="1.5" r="1.2" fill="#FFE885" stroke="#9A690B" strokeWidth="0.4" />
            </React.Fragment>
          );
        })}

        {/* 2. Hanging Baubles, Christmas Trees & Bells with Depth Shadow */}
        <g filter="url(#baubleMasterShadow)">
          {Array.from({ length: totalSegments }).map((_, i) => {
            const baseX = i * segmentWidth;
            const isEven = i % 2 === 0;

            return (
              <React.Fragment key={`bauble-group-${i}`}>
                {/* 1. Arbolito de Navidad */}
                <ChristmasTreeItem x={baseX + 18} dropLength={5} scale={0.92} />

                {/* 2. Champagne Gold Bauble */}
                <BaubleItem x={baseX + 54} dropLength={9} variant="gold" radius={10.5} />

                {/* 3. Campana Navideña con Lazo Rojo */}
                <ChristmasBellItem x={baseX + 90} dropLength={6} scale={0.94} />

                {/* 4. Deep Ruby Red Bauble */}
                <BaubleItem x={baseX + 126} dropLength={10.5} variant="ruby" radius={10.8} />

                {/* 5. Pearlescent Cream White / Emerald Green Bauble */}
                <BaubleItem
                  x={baseX + 162}
                  dropLength={9.5}
                  variant={isEven ? 'pearl' : 'green'}
                  radius={10.5}
                />

                {/* 6. Alternating Campana or Arbolito */}
                {isEven ? (
                  <ChristmasBellItem x={baseX + 198} dropLength={6.5} scale={0.92} />
                ) : (
                  <ChristmasTreeItem x={baseX + 198} dropLength={5.5} scale={0.9} />
                )}
              </React.Fragment>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
