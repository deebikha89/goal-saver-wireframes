import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

export interface NotificationData {
  title: string;
  body: string;
  data?: any;
}

export class NotificationService {
  static async initialize() {
    if (!Capacitor.isNativePlatform()) {
      console.log('Not running on native platform, notifications disabled');
      return;
    }

    try {
      // Request permission for notifications
      const permission = await LocalNotifications.requestPermissions();
      
      if (permission.display === 'granted') {
        console.log('Local notifications permission granted');
      }

      // Initialize push notifications
      await PushNotifications.requestPermissions();
      await PushNotifications.register();

      // Listen for push notification registration
      PushNotifications.addListener('registration', (token) => {
        console.log('Push registration success, token: ', token.value);
      });

      // Listen for push notification errors
      PushNotifications.addListener('registrationError', (error) => {
        console.error('Error on registration: ', JSON.stringify(error));
      });

      // Listen for push notifications received
      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('Push received: ', JSON.stringify(notification));
      });

      // Listen for push notification tapped
      PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        console.log('Push action performed: ', JSON.stringify(notification));
      });

    } catch (error) {
      console.error('Error initializing notifications:', error);
    }
  }

  static async showTransactionNotification(type: 'credit' | 'debit', amount: number, goalName: string) {
    if (!Capacitor.isNativePlatform()) {
      // Fallback for web - show browser notification
      this.showWebNotification(type, amount, goalName);
      return;
    }

    const isCredit = type === 'credit';
    const title = isCredit ? '💰 Money Added!' : '💸 Money Withdrawn';
    const body = `${isCredit ? '+' : '-'}KD ${amount} ${isCredit ? 'added to' : 'withdrawn from'} ${goalName}`;

    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title,
            body,
            id: Date.now(),
            schedule: { at: new Date(Date.now() + 1000) }, // Show immediately
            sound: 'default',
            attachments: undefined,
            actionTypeId: "",
            extra: {
              type: 'transaction',
              transactionType: type,
              amount,
              goalName
            }
          }
        ]
      });
    } catch (error) {
      console.error('Error showing transaction notification:', error);
    }
  }

  static async schedulePaymentReminder(goalName: string, amount: number, reminderDate: Date) {
    if (!Capacitor.isNativePlatform()) {
      console.log('Payment reminder scheduled for web (limited functionality)');
      return;
    }

    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: '🎯 Goal Payment Reminder',
            body: `Time to add KD ${amount} to your ${goalName} goal!`,
            id: Date.now() + Math.random(),
            schedule: { at: reminderDate },
            sound: 'default',
            attachments: undefined,
            actionTypeId: "",
            extra: {
              type: 'reminder',
              goalName,
              amount,
              reminderDate: reminderDate.toISOString()
            }
          }
        ]
      });
    } catch (error) {
      console.error('Error scheduling payment reminder:', error);
    }
  }

  static async scheduleRecurringReminders(goalName: string, amount: number, frequency: 'weekly' | 'monthly') {
    if (!Capacitor.isNativePlatform()) {
      console.log('Recurring reminders scheduled for web (limited functionality)');
      return;
    }

    const now = new Date();
    const notifications: ScheduleOptions['notifications'] = [];

    // Schedule next 12 reminders
    for (let i = 1; i <= 12; i++) {
      const reminderDate = new Date(now);
      
      if (frequency === 'weekly') {
        reminderDate.setDate(now.getDate() + (i * 7));
      } else {
        reminderDate.setMonth(now.getMonth() + i);
      }

      notifications.push({
        title: '🎯 Regular Savings Reminder',
        body: `Time for your ${frequency} KD ${amount} contribution to ${goalName}!`,
        id: Date.now() + i,
        schedule: { at: reminderDate },
        sound: 'default',
        attachments: undefined,
        actionTypeId: "",
        extra: {
          type: 'recurring_reminder',
          goalName,
          amount,
          frequency,
          reminderDate: reminderDate.toISOString()
        }
      });
    }

    try {
      await LocalNotifications.schedule({ notifications });
      console.log(`Scheduled ${notifications.length} ${frequency} reminders for ${goalName}`);
    } catch (error) {
      console.error('Error scheduling recurring reminders:', error);
    }
  }

  private static showWebNotification(type: 'credit' | 'debit', amount: number, goalName: string) {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          const isCredit = type === 'credit';
          const title = isCredit ? '💰 Money Added!' : '💸 Money Withdrawn';
          const body = `${isCredit ? '+' : '-'}KD ${amount} ${isCredit ? 'added to' : 'withdrawn from'} ${goalName}`;
          
          new Notification(title, {
            body,
            icon: '/favicon.ico'
          });
        }
      });
    }
  }

  static async cancelAllReminders() {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    try {
      const pending = await LocalNotifications.getPending();
      if (pending.notifications && pending.notifications.length > 0) {
        await LocalNotifications.cancel({
          notifications: pending.notifications
        });
      }
    } catch (error) {
      console.error('Error canceling reminders:', error);
    }
  }

  static async getPendingNotifications() {
    if (!Capacitor.isNativePlatform()) {
      return [];
    }

    try {
      const result = await LocalNotifications.getPending();
      return result.notifications || [];
    } catch (error) {
      console.error('Error getting pending notifications:', error);
      return [];
    }
  }
}