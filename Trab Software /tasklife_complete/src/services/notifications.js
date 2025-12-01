import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
  try {
    const settings = await Notifications.getPermissionsAsync();
    if (settings.status !== 'granted') {
      const request = await Notifications.requestPermissionsAsync();
      if (request.status !== 'granted') {
        return;
      }
    }
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      });
    }
  } catch (e) {
    console.log('Notification permission error', e);
  }
}

export async function scheduleNotification({ title, body, seconds = 5 }) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: { seconds }
  });
}
