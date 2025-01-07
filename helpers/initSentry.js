import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';

// Configure and initialize Sentry here
export const initSentry = () => {
  let sentryDSN =
    'https://753764f4208a4f429c2c21d20a45adf0@o359939.ingest.sentry.io/3578989';

  const appName =
    Constants && Constants.expoConfig && Constants.expoConfig.name
      ? Constants.expoConfig.name
      : 'Test app';
  if (appName.toLowerCase().includes('extra')) {
    sentryDSN =
      'https://179ccb307bf249eeafa60884b960924a@o359939.ingest.sentry.io/5806088';
  }
  console.log('sentryDSN', sentryDSN);

  Sentry.init({
    dsn: sentryDSN,
    debug: true,
    enableInExpoDevelopment: true, // Tracks errors in development mode too
    tracesSampleRate: 1.0, // Optional, but enabled for performance tracing (1.0 = capture 100% of transactions)
    integrations: [
      new Sentry.ReactNativeTracing({
        // We don’t need routingInstrumentation for managed Expo
        // enableUserInteractionTracing: true,
        tracingOrigins: ['https://www.toolsinfoweb.co.uk/'], // Specify your app’s origins if needed
      }),
    ],
  });
  console.log('Sentry initialized with DSN:', sentryDSN);
};
