
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.dd5ddc36551e4b0eb0b2e550c46624ec',
  appName: 'Shakthi Guard',
  webDir: 'dist',
  server: {
    url: 'https://dd5ddc36-551e-4b0e-b0b2-e550c46624ec.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    }
  }
};

export default config;
