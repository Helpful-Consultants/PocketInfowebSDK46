export const InfoTypes = {
  CALIBRATION_EXPIRY: 'calibrationExpiry',
  LTP_LOANS: 'ltpLoans',
  NEWS: 'news',
  NOTIFICATIONS: 'notifications',
  ODIS: 'odis',
  SERVICE_MEASURES: 'serviceMeasures',
};

export const InfoTypesAlertUnits = {
  CALIBRATION_EXPIRY: 'DAYS',
  LTP_LOANS: 'DAYS',
  NEWS: 'DAYS',
  NOTIFICATIONS: 'DAYS',
  ODIS: 'DAYS',
  SERVICE_MEASURES: 'DAYS',
  USER: 'MINUTES',
};

export const InfoTypesAlertAges = {
  LTP_LOANS_RED_PERIOD: 2, // today plus 1 day
  LTP_LOANS_AMBER_PERIOD: 4, // 4 days including today
  NEWS_RED_PERIOD: 7,
  ODIS_RED_PERIOD: 4,
  SERVICE_MEASURES_RED_PERIOD: 3,
  SERVICE_MEASURES_AMBER_PERIOD: 8,
  USER_CREDENTIALS: 60,
};
