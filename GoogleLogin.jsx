
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
// Note: You'll need to install react-native-vector-icons
import Icon from "react-native-vector-icons/FontAwesome"; 

export default function Auth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "35125841431-p27pj5og8tui6stimctnqt7q3696gga3.apps.googleusercontent.com",
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      const googleUser = userInfo.data.user;

      setUser({
        name: googleUser.name,
        email: googleUser.email,
        photo: googleUser.photo,
      });
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  const logout = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null);
    } catch (error) {
      console.log("LOGOUT ERROR:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.headerSection}>
        <Text style={styles.title}>{user ? "Welcome Back!" : "Let's Get Started"}</Text>
        <Text style={styles.subtitle}>
          {user ? "You are logged in as" : "Connect with your social accounts"}
        </Text>
      </View>

      <View style={styles.contentSection}>
        {user ? (
          <View style={styles.profileCard}>
            <Image source={{ uri: user.photo }} style={styles.avatar} />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            
            <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
              <Text style={styles.logoutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            {/* Google Button */}
            <TouchableOpacity style={styles.socialBtn} onPress={signIn}>
              <Icon name="google" size={20} color="#DB4437" style={styles.icon} />
              <Text style={styles.socialBtnText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Apple Button (Placeholder for UI) */}
            <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#000' }]}>
              <Icon name="apple" size={20} color="#FFF" style={styles.icon} />
              <Text style={[styles.socialBtnText, { color: '#FFF' }]}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  headerSection: {
    marginTop: 80,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A1A",
  },
  subtitle: {
    fontSize: 16,
    color: "#7D7D7D",
    marginTop: 8,
  },
  contentSection: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  profileCard: {
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 4, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#EFEFEF',
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#888",
    marginBottom: 25,
  },
  buttonContainer: {
    gap: 15,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  socialBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
  icon: {
    marginRight: 12,
  },
  logoutBtn: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: '600',
    fontSize: 16,
  }
});
