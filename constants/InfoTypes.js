export const InfoTypes = {
  CALIBRATION_EXPIRY: 'calibrationExpiry',
  LTP_LOANS: 'ltpLoans',
  NEWS: 'news',
  NOTIFICATIONS: 'notifications',
  ODIS: 'odis',
  SERVICE_MEASURES: 'serviceMeasures',
};

export const InfoTypesAlertUnits = {
  CALIBRATION_EXPIRY: 'days',
  LTP_LOANS: 'days',
  NEWS: 'days',
  NOTIFICATIONS: 'days',
  ODIS: 'days',
  SERVICE_MEASURES: 'days',
};

export const InfoTypesAlertAges = {
  LTP_LOANS_RED_PERIOD: 2, // today plus 1 day
  LTP_LOANS_AMBER_PERIOD: 4, // 4 days including today
  NEWS_RED_PERIOD: 7,
  ODIS_RED_PERIOD: 7,
  SERVICE_MEASURES_RED_PERIOD: 3,
  SERVICE_MEASURES_AMBER_PERIOD: 8,
};
