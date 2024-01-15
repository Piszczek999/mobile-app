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
import { useState } from "react";
import { socket } from "../socket";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    socket.emit("login", { email: email, password });
  };

  const handleRegister = async () => {
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
