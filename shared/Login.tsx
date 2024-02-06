import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { globalStyles } from "../styles/global";
import Input from "./Input";
import MyButton from "./MyButton";
import Tile from "./Tile";

export default function Login({ loading }: { loading: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
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

  if (loading)
    return (
      <View style={globalStyles.container}>
        <View style={styles.content}>
          <ActivityIndicator size={100} />
        </View>
      </View>
    );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
              Sign Up
            </MyButton>
            <MyButton
              colors={["#44a", "#449"]}
              onPress={() => setIsRegister(false)}
            >
              Log in instead
            </MyButton>
          </View>
        ) : (
          <View style={styles.content}>
            <Text style={{ ...globalStyles.h1, marginBottom: 40 }}>Log in</Text>
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
            <MyButton
              colors={["#44a", "#449"]}
              onPress={() => setIsRegister(true)}
            >
              Register
            </MyButton>
          </View>
        )}
      </Tile>
    </TouchableWithoutFeedback>
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
