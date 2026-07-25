import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.fitfood',
  appName: '燃脂食堂',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    hostname: 'localhost'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: '#f0fdfa',
      androidSplashResourceName: 'splash',
      iosSplashResourceName: 'splash',
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#14b8a6',
    },
  },
};

export default config;
