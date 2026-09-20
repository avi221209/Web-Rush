import React from 'react';

export interface LogoProps {
  variant?: 'full' | 'compact' | 'wordmark';
  theme?: 'light' | 'dark' | 'bronze';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  theme = 'light',
  size = 'md',
  className = '',
  onClick,
  showTagline = false
}) => {
  // Theme color mappings
  const textColor = theme === 'dark' ? 'text-[#F7F4EE]' : theme === 'bronze' ? 'text-[#A87532]' : 'text-[#171717]';
  const receiptFill = theme === 'dark' ? '#F7F4EE' : '#171717';
  const line1Stroke = '#A87532';
  const line2Stroke = theme === 'dark' ? '#171717' : '#F7F4EE';

  // Size mappings
  const sizeConfig = {
    sm: {
      markWidth: 22,
      markHeight: 25,
      textSize: 'text-sm sm:text-base',
      slashSize: 'text-xs sm:text-sm',
      gap: 'space-x-2'
    },
    md: {
      markWidth: 28,
      markHeight: 32,
      textSize: 'text-lg sm:text-xl',
      slashSize: 'text-base sm:text-lg',
      gap: 'space-x-2.5'
    },
    lg: {
      markWidth: 36,
      markHeight: 40,
      textSize: 'text-2xl sm:text-3xl',
      slashSize: 'text-xl sm:text-2xl',
      gap: 'space-x-3'
    }
  };

  const currentSize = sizeConfig[size];

  // Standalone Receipt Spark Mark SVG Component
  const ReceiptSparkMark = () => (
    <svg
      width={currentSize.markWidth}
      height={currentSize.markHeight}
      viewBox="0 0 32 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0 transition-transform group-hover:scale-105 duration-200"
      aria-hidden="true"
    >
      {/* Receipt Paper Body with Serrated Bottom Edge */}
      <path
        d="M 7 3 C 5.895 3 5 3.895 5 5 L 5 29.5 L 8 27 L 11 29.5 L 14 27 L 17 29.5 L 20 27 L 23 29.5 L 26 27 L 27 28 L 27 5 C 27 3.895 26.105 3 25 3 Z"
        fill={receiptFill}
      />

      {/* Micro Data Lines inside Receipt */}
      <line x1="9.5" y1="11" x2="16.5" y2="11" stroke={line1Stroke} strokeWidth="1.75" strokeLinecap="round" />
      <line x1="9.5" y1="16" x2="22.5" y2="16" stroke={line2Stroke} strokeOpacity={theme === 'dark' ? 0.4 : 0.5} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9.5" y1="21" x2="18.5" y2="21" stroke={line2Stroke} strokeOpacity={theme === 'dark' ? 0.25 : 0.3} strokeWidth="1.5" strokeLinecap="round" />

      {/* Discovery Spark Star (Warm Archival Gold/Bronze #A87532) */}
      <path
        d="M 22 2 C 22 4.5, 24.5 7, 27 7 C 24.5 7, 22 9.5, 22 12 C 22 9.5, 19.5 7, 17 7 C 19.5 7, 22 4.5, 22 2 Z"
        fill="#A87532"
      />
    </svg>
  );

  const LogoContent = () => (
    <div className={`inline-flex items-center ${currentSize.gap} group ${className}`}>
      {variant !== 'wordmark' && <ReceiptSparkMark />}

      {variant !== 'compact' && (
        <div className="flex flex-col">
          <div className="flex items-center font-bold tracking-tight">
            <span className={`font-serif ${textColor} ${currentSize.textSize}`}>
              LIFE
            </span>
            <span className={`font-mono text-[#A87532] ${currentSize.slashSize} mx-0.5 select-none font-bold`}>
              //
            </span>
            <span className={`font-serif ${textColor} ${currentSize.textSize}`}>
              RECEIPTS
            </span>
          </div>

          {showTagline && (
            <span className="text-[10px] font-mono text-[#77736C] tracking-wider uppercase -mt-0.5">
              Your Life, Reconstructed
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        type="button"
        className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171717] rounded-lg transition-opacity hover:opacity-90"
        aria-label="LIFE//RECEIPTS - Return to Overview"
      >
        <LogoContent />
      </button>
    );
  }

  return (
    <div aria-label="LIFE//RECEIPTS Brand Logo">
      <LogoContent />
    </div>
  );
};
