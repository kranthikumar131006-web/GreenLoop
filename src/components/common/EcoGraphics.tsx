import React from 'react';

/**
 * Hand-drawn & crisp SVG graphics precisely styled to match the storyboard
 */

export const GreenLoopLogo: React.FC<{ size?: number; className?: string }> = ({ size = 72, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Circular eco swirl */}
    <path
      d="M50 12 C 28 12, 12 30, 14 54 C 15 68, 25 82, 42 86 C 62 90, 84 78, 86 56 C 87 40, 80 26, 68 18"
      stroke="#2E7D4F"
      strokeWidth="7"
      strokeLinecap="round"
      fill="none"
    />
    {/* Central upward sprouting leaf */}
    <path
      d="M38 68 C 36 44, 48 24, 68 20 C 68 40, 56 62, 38 68 Z"
      fill="#43A047"
    />
    <path
      d="M38 68 C 46 54, 56 40, 68 20"
      stroke="#1B5E20"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Radiating sun / energy dashes matching storyboard splash */}
    <line x1="16" y1="36" x2="8" y2="34" stroke="#81C784" strokeWidth="3" strokeLinecap="round" />
    <line x1="84" y1="36" x2="92" y2="34" stroke="#81C784" strokeWidth="3" strokeLinecap="round" />
    <line x1="20" y1="20" x2="14" y2="14" stroke="#81C784" strokeWidth="3" strokeLinecap="round" />
    <line x1="80" y1="20" x2="86" y2="14" stroke="#81C784" strokeWidth="3" strokeLinecap="round" />
    <line x1="50" y1="6" x2="50" y2="1" stroke="#81C784" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const BookIsometricGraphic: React.FC<{ size?: number; className?: string }> = ({ size = 140, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Isometric book matching Screen 9 in storyboard */}
    <g transform="translate(10, 10)">
      {/* Back cover shadow */}
      <path
        d="M20 70 L80 110 L130 80 L70 40 Z"
        fill="#1E5C3B"
        opacity="0.3"
      />
      {/* Pages block */}
      <path
        d="M22 65 L82 105 L82 112 L22 72 Z"
        fill="#F4EFE6"
        stroke="#2E3A2F"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M82 105 L132 75 L132 82 L82 112 Z"
        fill="#EDE5D5"
        stroke="#2E3A2F"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Front cover top face */}
      <path
        d="M20 62 L80 22 L130 52 L70 92 Z"
        fill="#66BB6A"
        stroke="#2E3A2F"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Book spine */}
      <path
        d="M20 62 L70 92 L70 102 L20 72 Z"
        fill="#2E7D4F"
        stroke="#2E3A2F"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Front edge */}
      <path
        d="M70 92 L130 52 L130 60 L70 100 Z"
        fill="#388E3C"
        stroke="#2E3A2F"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Ribbon bookmark */}
      <path
        d="M85 25 L88 45 L94 40 L100 45 L97 25"
        fill="#F59E0B"
        stroke="#B45309"
        strokeWidth="1.5"
      />
    </g>
  </svg>
);

export const ReusableBottleGraphic: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 60 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Bottle cap */}
    <rect x="22" y="4" width="16" height="8" rx="2" fill="#5A6D7C" stroke="#263238" strokeWidth="2" />
    <rect x="25" y="12" width="10" height="6" fill="#78909C" stroke="#263238" strokeWidth="2" />
    {/* Bottle body */}
    <path
      d="M17 28 C 17 22, 22 18, 26 18 L 34 18 C 38 18, 43 22, 43 28 L 43 78 C 43 83, 39 86, 34 86 L 26 86 C 21 86, 17 83, 17 78 Z"
      fill="#81D4FA"
      stroke="#263238"
      strokeWidth="2.5"
    />
    {/* Water level and reflex */}
    <path
      d="M19 40 C 24 38, 36 42, 41 40 L 41 78 C 41 81, 38 84, 34 84 L 26 84 C 22 84, 19 81, 19 78 Z"
      fill="#4FC3F7"
    />
    <path
      d="M23 46 L 23 76"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* Eco leaf on bottle */}
    <circle cx="30" cy="58" r="8" fill="white" opacity="0.8" />
    <path
      d="M28 62 C 27 56, 31 54, 33 53 C 33 56, 31 60, 28 62 Z"
      fill="#2E7D4F"
    />
  </svg>
);

export const HoodieGraphic: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M22 14 C 22 8, 38 8, 38 14"
      stroke="#1E3A8A"
      strokeWidth="2"
    />
    {/* Hoodie outline */}
    <path
      d="M18 16 L 8 26 L 14 32 L 18 26 L 18 52 L 42 52 L 42 26 L 46 32 L 52 26 L 42 16 C 37 13, 23 13, 18 16 Z"
      fill="#60A5FA"
      stroke="#1E3A8A"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Kangaroo pocket */}
    <path
      d="M24 36 L 36 36 L 38 46 L 22 46 Z"
      fill="#3B82F6"
      stroke="#1E3A8A"
      strokeWidth="2"
    />
  </svg>
);

export const NotebooksGraphic: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="12" y="10" width="36" height="42" rx="3" fill="#FDE68A" stroke="#92400E" strokeWidth="2.5" />
    <line x1="20" y1="10" x2="20" y2="52" stroke="#B45309" strokeWidth="2" />
    <line x1="26" y1="20" x2="42" y2="20" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
    <line x1="26" y1="28" x2="42" y2="28" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
    <line x1="26" y1="36" x2="36" y2="36" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CalculatorGraphic: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="14" y="8" width="32" height="46" rx="4" fill="#334155" stroke="#0F172A" strokeWidth="2.5" />
    {/* Screen */}
    <rect x="18" y="14" width="24" height="10" rx="1.5" fill="#A7F3D0" stroke="#064E3B" strokeWidth="1.5" />
    {/* Key grid */}
    <circle cx="21" cy="30" r="2" fill="#E2E8F0" />
    <circle cx="27" cy="30" r="2" fill="#E2E8F0" />
    <circle cx="33" cy="30" r="2" fill="#E2E8F0" />
    <circle cx="39" cy="30" r="2" fill="#F97316" />

    <circle cx="21" cy="36" r="2" fill="#E2E8F0" />
    <circle cx="27" cy="36" r="2" fill="#E2E8F0" />
    <circle cx="33" cy="36" r="2" fill="#E2E8F0" />
    <circle cx="39" cy="36" r="2" fill="#38BDF8" />

    <circle cx="21" cy="42" r="2" fill="#E2E8F0" />
    <circle cx="27" cy="42" r="2" fill="#E2E8F0" />
    <circle cx="33" cy="42" r="2" fill="#E2E8F0" />
    <circle cx="39" cy="42" r="2" fill="#38BDF8" />

    <rect x="21" y="47" width="14" height="3" rx="1" fill="#E2E8F0" />
  </svg>
);

export const StudyLampGraphic: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Clamp base */}
    <rect x="16" y="46" width="16" height="6" rx="2" fill="#475569" stroke="#1E293B" strokeWidth="2" />
    {/* Flexible neck */}
    <path
      d="M24 46 C 24 30, 36 28, 38 18"
      stroke="#1E293B"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    {/* Lamp shade */}
    <path
      d="M32 18 L 48 14 L 46 26 L 36 24 Z"
      fill="#F59E0B"
      stroke="#1E293B"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Light cone */}
    <path
      d="M38 25 L 48 42 L 32 42 Z"
      fill="#FEF08A"
      opacity="0.5"
    />
  </svg>
);

export const KavyaAvatar: React.FC<{ size?: number; className?: string }> = ({ size = 72, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`rounded-full ${className}`}
  >
    {/* Background circle */}
    <circle cx="40" cy="40" r="38" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="2.5" />
    {/* Hair back */}
    <path
      d="M24 36 C 24 20, 56 20, 56 36 L 58 60 C 58 64, 52 64, 50 56 L 50 48 L 30 48 L 30 56 C 28 64, 22 64, 22 60 Z"
      fill="#262626"
    />
    {/* Head & neck */}
    <rect x="36" y="44" width="8" height="10" fill="#E8B598" />
    <circle cx="40" cy="36" r="14" fill="#FBD5C2" />
    {/* Face details */}
    <circle cx="36" cy="36" r="1.5" fill="#1C1917" />
    <circle cx="44" cy="36" r="1.5" fill="#1C1917" />
    <path d="M38 41 C 39 43, 41 43, 42 41" stroke="#C2410C" strokeWidth="1.5" strokeLinecap="round" />
    {/* Fringe / front hair */}
    <path
      d="M26 32 C 30 24, 38 24, 44 26 C 50 24, 54 28, 54 32 C 48 30, 42 30, 36 33 C 32 35, 28 34, 26 32 Z"
      fill="#1C1917"
    />
    {/* Green shirt / top */}
    <path
      d="M26 64 C 26 54, 34 50, 40 50 C 46 50, 54 54, 54 64 Z"
      fill="#2E7D4F"
    />
    {/* Eco leaf pin */}
    <path
      d="M44 56 C 44 52, 48 50, 50 50 C 50 54, 48 56, 44 56 Z"
      fill="#A7F3D0"
    />
  </svg>
);
