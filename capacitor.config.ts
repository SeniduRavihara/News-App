import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'news.app',
  appName: 'news-app',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
