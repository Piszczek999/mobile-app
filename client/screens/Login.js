import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { globalStyles } from "../styles/global";
import { useState } from "react";
import { socket } from "../socket";
import MyButton from "../components/MyButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = async () => {
    socket.emit("login", { email, password });
  };

  const handleRegister = async () => {
    socket.emit("register", { email, name, password });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={globalStyles.container}>
        {isRegister ? (
          <View style={styles.content}>
            <Text>Registration</Text>
            <View style={styles.center}>
              <Text>Name</Text>
              <TextInput
                style={globalStyles.input}
                keyboardType="default"
                onChangeText={setName}
              />
            </View>
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
                secureTextEntry
                onChangeText={setPassword}
              />
            </View>
            <Button
              title="Register"
              onPress={async () => await handleRegister()}
            />
            <Button title="Login" onPress={() => setIsRegister(false)} />
          </View>
        ) : (
          <View style={styles.content}>
            <Text style={{ ...globalStyles.h1, marginBottom: 40 }}>
              Logging in
            </Text>
            <View style={styles.center}>
              <Text style={globalStyles.h2}>Email</Text>
              <LinearGradient
                colors={["#0A2472", "#0B3680"]}
                style={{ borderRadius: 20 }}
              >
                <TextInput style={globalStyles.input} onChangeText={setEmail} />
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
                />
              </LinearGradient>
            </View>
            <MyButton title="Login" onPress={async () => await handleLogin()} />
            <MyButton title="Register" onPress={() => setIsRegister(true)} />
          </View>
        )}
      </View>
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
