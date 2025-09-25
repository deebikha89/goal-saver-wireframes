import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.6201aef49f0e4e6c96742005c2cd53d1',
  appName: 'goal-saver-wireframes',
  webDir: 'dist',
  server: {
    url: "https://6201aef4-9f0e-4e6c-9674-2005c2cd53d1.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav"
    }
  }
};

export default config;