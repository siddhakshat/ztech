// LeadOps - Design System Tokens

export const designTokens = {
  // Colors
  colors: {
    bg_base: '#0A0E1A',
    bg_surface: '#111827',
    bg_elevated: '#1A2235',
    border_subtle: '#1F2937',
    text_primary: '#F8FAFC',
    text_secondary: '#94A3B8',
    text_muted: '#64748B',
    accent_neon: '#00F0A8',
    accent_cyan: '#22D3EE',
    accent_magenta: '#F471B5',
    status_danger: '#FF4D6D',
    status_warn: '#FBBF24',
    status_success: '#10B981',
  },

  // Typography
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '24px',
      xl: '32px',
    },
  },

  // Spacing
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  // Border Radius
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    full: '9999px',
  },

  // Animation
  animation: {
    duration: {
      hover: '180ms',
      filter: '240ms',
    },
    easing: {
      easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Glow effects
  glow: {
    cyan: {
      boxShadow: '0 0 24px 8px rgba(34, 211, 238, 0.08)',
    },
    neon: {
      boxShadow: '0 0 16px 4px rgba(0, 240, 168, 0.2)',
    },
  },
};

export const getAcceptRateColor = (rate: number) => {
  if (rate >= 65) return designTokens.colors.accent_neon;
  if (rate >= 40) return designTokens.colors.accent_cyan;
  return designTokens.colors.status_danger;
};

export const getVerdictLabel = (rate: number) => {
  if (rate >= 65) return 'Scale';
  if (rate >= 40) return 'Hold';
  return 'Cut';
};