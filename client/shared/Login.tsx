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
  ErrorFn,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Fragment, useEffect, useState } from "react";
import MyButton from "./MyButton";
import { auth } from "../firebase";
import { socket } from "../socket";
import { globalStyles } from "../styles/global";
import Gradient from "./Gradient";
import Input from "./Input";
import { FirebaseError } from "firebase/app";

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
      if (error! instanceof FirebaseError) {
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
    } catch (error) {
      if (error! instanceof FirebaseError) {
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
          } catch (error) {
            if (error! instanceof FirebaseError) {
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
        <Gradient style={globalStyles.container}>
          {isRegister ? (
            <View style={styles.content}>
              <Text style={{ ...globalStyles.h1, marginBottom: 40 }}>
                Create an account
              </Text>
              <Input onChangeText={setEmail} placeholder="Email" />
              <Input onChangeText={setPassword} placeholder="Password" />
              <MyButton
                title="Sign up"
                onPress={async () => await handleRegister()}
              />
              <MyButton
                title="Log in instead"
                onPress={() => setIsRegister(false)}
              />
            </View>
          ) : (
            <View style={styles.content}>
              <Text style={{ ...globalStyles.h1, marginBottom: 40 }}>
                Log in
              </Text>
              <View style={styles.center}>
                <Input onChangeText={setEmail} placeholder="Email" />
              </View>
              <View style={styles.center}>
                <Input onChangeText={setPassword} placeholder="Password" />
              </View>
              <MyButton
                title="Sign in"
                onPress={async () => await handleLogin()}
              />
              <MyButton title="Register" onPress={() => setIsRegister(true)} />
            </View>
          )}
        </Gradient>
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
