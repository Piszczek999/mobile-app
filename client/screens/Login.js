import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { globalStyles } from "../styles/global";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const storeEmail = async () => {
    try {
      await AsyncStorage.setItem("email", email);
    } catch (error) {
      console.error("Error storing email:", error);
      alert("Error! While saving email");
    }
  };

  useEffect(() => {
    const getEmail = async () => {
      try {
        const email = await AsyncStorage.getItem("email");
        setEmail(email);
      } catch (error) {
        console.error("Error loading credentials:", error);
        alert("Error while loading credentials!");
      }
    };
    getEmail();
  }, []);

  const handleLogin = async () => {
    await storeEmail();
    socket.emit("login", { email: email, password });
  };

  const handleRegister = async () => {
    await storeEmail();
    socket.emit("register", { email: email, password });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={globalStyles.container}>
        <View style={styles.center}>
          <Text>Email</Text>
          <TextInput
            style={globalStyles.input}
            keyboardType="default"
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.center}>
          <Text>Password</Text>
          <TextInput
            style={globalStyles.input}
            keyboardType="default"
            onChangeText={setPassword}
          />
        </View>
        <Button title="Log In" onPress={async () => await handleLogin()} />
        <Button title="Register" onPress={async () => await handleRegister()} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },
});
