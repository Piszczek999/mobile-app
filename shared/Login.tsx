import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Fragment, useEffect, useState } from "react";
import { auth } from "../firebase";
import { globalStyles } from "../styles/global";
import Input from "./Input";
import MyButton from "./MyButton";
import Tile from "./Tile";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        alert("Password or email is incorrect");
      } else if (error.code === "auth/invalid-email") {
        alert("Email is incorrect");
      } else if (error.code === "auth/missing-email") {
        alert("Email is missing");
      } else if (error.code === "auth/missing-password") {
        alert("Password is missing");
      } else {
        alert("An error occurred during user creation.");
        console.error(error);
      }
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await storeCredentials();
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email is already in use.");
      } else if (error.code === "auth/missing-password") {
        alert("Type in password");
      } else if (error.code === "auth/invalid-email") {
        alert("Email is incorrect");
      } else if (error.code === "auth/admin-restricted-operation") {
        alert("Type in email and password");
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
        if (storedEmail && storedPassword) {
          setEmail(storedEmail);
          setPassword(storedPassword);
          try {
            await signInWithEmailAndPassword(auth, storedEmail, storedPassword);
          } catch (error: any) {
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
      <Pressable onPress={() => Keyboard.dismiss()}>
        <Tile style={globalStyles.container}>
          {isRegister ? (
            <View style={styles.content}>
              <Text style={{ ...globalStyles.h1, marginBottom: 40 }}>
                Create an account
              </Text>
              <Input
                textContentType="emailAddress"
                onChangeText={setEmail}
                placeholder="Email"
              />
              <Input
                secureTextEntry
                textContentType="password"
                onChangeText={setPassword}
                placeholder="Password"
              />
              <MyButton onPress={async () => await handleRegister()}>
                Sign In
              </MyButton>
              <MyButton onPress={() => setIsRegister(false)}>
                Log in instead
              </MyButton>
            </View>
          ) : (
            <View style={styles.content}>
              <Text style={{ ...globalStyles.h1, marginBottom: 40 }}>
                Log in
              </Text>
              <View style={styles.center}>
                <Input
                  textContentType="emailAddress"
                  onChangeText={setEmail}
                  placeholder="Email"
                />
              </View>
              <View style={styles.center}>
                <Input
                  secureTextEntry
                  textContentType="password"
                  onChangeText={setPassword}
                  placeholder="Password"
                />
              </View>
              <MyButton onPress={async () => await handleLogin()}>
                Sign in
              </MyButton>
              <MyButton onPress={() => setIsRegister(true)}>Register</MyButton>
            </View>
          )}
        </Tile>
      </Pressable>
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
