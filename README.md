1. Firebase Console Setup
1.Create a Project: Go to the Firebase Console and click Add Project.

2.Add Android App: Click the Android icon.

3.Register App: * Package Name: This must match the applicationId in your android/app/build.gradle (e.g., com.yourname.app).

4.Download Config: Download the google-services.json file.

5.Placement: Move google-services.json into your project at android/app/google-services.json.



2. Project Configuration
You must modify two Gradle files to allow Firebase to communicate with your Android app.

A. Project-level Gradle (android/build.gradle)
Add the Google Services dependency:

Gradle

buildscript {
    dependencies {
        // ... other dependencies
        classpath 'com.google.gms:google-services:4.4.0' 
    }
}


B. App-level Gradle (android/app/build.gradle)
Apply the plugin at the very bottom of the file:

Gradle

apply plugin: 'com.google.gms.google-services'


3. Installation
Install the necessary Firebase modules.

Bash
npm install @react-native-firebase/app @react-native-firebase/messaging
Note: If you are using Expo, run npx expo install @react-native-firebase/app @react-native-firebase/messaging.

4. Full Code Implementation


Background Handler (index.js or App.js)
The background handler must be defined outside of your component cycle to ensure the JS engine can wake up even when the app is closed.

JavaScript

import messaging from '@react-native-firebase/messaging';
import { ToastAndroid } from 'react-native';

// This handles messages when the app is in the background or quit state
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
  
  ToastAndroid.showWithGravity(
    `Background: ${remoteMessage.notification?.body}`,
    ToastAndroid.LONG,
    ToastAndroid.TOP // Displayed at the top
  );
});


Main Application (App.js)
JavaScript

import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ToastAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  
  useEffect(() => {
    // 1. Request Permissions
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging().getToken();
        console.log("FCM Token:", token); // Use this token to send test notifications
      }
    };

    requestPermission();

    // 2. Foreground Listener
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      ToastAndroid.showWithGravity(
        `Foreground: ${remoteMessage.notification?.body}`,
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FCM Toast System</Text>
      <Text>Listening for messages...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' }
});


5. Testing the Implementation
1.Get Token: Copy the FCM Token from your console logs.

2.Firebase Console: Go to Engage > Messaging.

3.Create Campaign: Choose "Notifications".

4.Send Test: Paste your token into the "Add registration token" field and hit "Test".

5.Observe: Your device should show the Toast at the top regardless of whether the app is open or closed.