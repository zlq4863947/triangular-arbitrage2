export const LogLevels = {
  Debug: 'Debug',
  Log: 'Log',
  Info: 'Info',
  Warn: 'Warn',
  Error: 'Error',
  Event: 'Event',
} as const;

export type LogLevels = typeof LogLevels[keyof typeof LogLevels];

export const LogLevelColors = {
  Debug: '#263238',
  Log: '#33691E',
  Info: '#01579B',
  Event: '#f601ff',
  Warn: '#BF360C',
  Error: '#B71C1C',
} as const;

export type LogLevelColors = typeof LogLevelColors[keyof typeof LogLevelColors];

export const tagColor = '#d06748';
export const dataColor = '#5abf2b';
