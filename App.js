import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native';
import messaging from "@react-native-firebase/messaging";
import { StatusBar } from 'expo-status-bar';

// 1. BACKGROUND/QUIT HANDLER
// Must be top-level (outside the App function)
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  const content = remoteMessage.notification?.body || "New Background Message";

  // Show toast at the top
  ToastAndroid.showWithGravity(
    `Background: ${content}`,
    ToastAndroid.LONG,
    ToastAndroid.TOP
  );
});

export default function App() {

  useEffect(() => {
    // 2. PERMISSION & TOKEN
    const initializeFCM = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging().getToken();
        console.log("Device Token:", token);
      }
    };

    initializeFCM();

    // 3. FOREGROUND LISTENER
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const title = remoteMessage.notification?.title || "Notification";
      const body = remoteMessage.notification?.body || "";

      ToastAndroid.showWithGravity(
        `${title}: ${body}`,
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
    });

    // 4. HANDLERS FOR WHEN USER CLICKS NOTIFICATION
    messaging().onNotificationOpenedApp((remoteMessage) => {
      ToastAndroid.show("App opened from background", ToastAndroid.SHORT);
    });

    messaging().getInitialNotification().then((remoteMessage) => {
      if (remoteMessage) {
        ToastAndroid.show("App opened from quit state", ToastAndroid.SHORT);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Toast Notification App</Text>
      <Text>Waiting for FCM messages...</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  }
});