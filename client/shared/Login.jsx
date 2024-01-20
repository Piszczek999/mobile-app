import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Fragment, useEffect, useState } from "react";
import MyButton from "./MyButton";
import { auth } from "../firebase";
import { socket } from "../socket";
import { globalStyles } from "../styles/global";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  onAuthStateChanged(auth, (user) => {
    const handle = async () => {
      if (user) {
        const token = await user.getIdToken();
        socket.emit("login", token);
      } else {
        socket.emit("logout");
      }
    };
    handle();
  });

  const storeCredentials = async () => {
    try {
      await AsyncStorage.multiSet([
        ["email", email],
        ["password", password],
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await storeCredentials();
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        alert("Password or email is incorrect");
      } else if (error.code === "auth/invalid-email") {
        alert("Email is incorrect");
      } else {
        console.error(error);
      }
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await storeCredentials();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email is already in use.");
      } else if (error.code === "auth/missing-password") {
        alert("Type in password");
      } else if (error.code === "auth/invalid-email") {
        alert("Email is incorrect");
      } else {
        alert("An error occurred during user creation.");
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        setIsLoading(true);
        const credentials = await AsyncStorage.multiGet(["email", "password"]);
        const storedEmail = credentials[0][1];
        const storedPassword = credentials[1][1];
        setEmail(storedEmail);
        setPassword(storedPassword);
        if (storedEmail && storedPassword) {
          try {
            await signInWithEmailAndPassword(auth, storedEmail, storedPassword);
          } catch (error) {
            if (error.code === "auth/email-already-in-use") {
              alert("Email is already in use.");
            } else if (error.code === "auth/missing-password") {
              alert("Type in password");
            } else if (error.code === "auth/invalid-email") {
              alert("Email is incorrect");
            } else {
              alert("An error occurred during user creation.");
              console.error(error);
            }
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadCredentials();
  }, []);

  if (isLoading)
    return (
      <View style={globalStyles.container}>
        <View style={styles.content}>
          <ActivityIndicator size={100} />
        </View>
      </View>
    );

  return (
    <Fragment>
      <StatusBar style="light" />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={globalStyles.container}>
          {isRegister ? (
            <View style={styles.content}>
              <Text style={{ ...globalStyles.h1, marginBottom: 40 }}>
                Create an account
              </Text>
              <View style={styles.center}>
                <Text style={globalStyles.h2}>Email</Text>
                <LinearGradient
                  colors={["#0A2472", "#0B3680"]}
                  style={{ borderRadius: 20 }}
                >
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={setEmail}
                  />
                </LinearGradient>
              </View>
              <View style={styles.center}>
                <Text style={globalStyles.h2}>Password</Text>
                <LinearGradient
                  colors={["#0A2472", "#0B3680"]}
                  style={{ borderRadius: 20 }}
                >
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </LinearGradient>
              </View>
              <MyButton
                title="Create an account"
                onPress={async () => await handleRegister()}
              />
              <MyButton
                title="Already have an account?"
                onPress={() => setIsRegister(false)}
              />
            </View>
          ) : (
            <View style={styles.content}>
              <Text style={{ ...globalStyles.h1, marginBottom: 40 }}>
                Log in
              </Text>
              <View style={styles.center}>
                <Text style={globalStyles.h2}>Email</Text>
                <LinearGradient
                  colors={["#0A2472", "#0B3680"]}
                  style={{ borderRadius: 20 }}
                >
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={setEmail}
                    value={email}
                  />
                </LinearGradient>
              </View>
              <View style={styles.center}>
                <Text style={globalStyles.h2}>Password</Text>
                <LinearGradient
                  colors={["#0A2472", "#0B3680"]}
                  style={{ borderRadius: 20 }}
                >
                  <TextInput
                    style={globalStyles.input}
                    secureTextEntry
                    onChangeText={setPassword}
                    value={password}
                  />
                </LinearGradient>
              </View>
              <MyButton
                title="Sign in"
                onPress={async () => await handleLogin()}
              />
              <MyButton
                title="Create an account"
                onPress={() => setIsRegister(true)}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },
  content: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
