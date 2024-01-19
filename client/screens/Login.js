import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { globalStyles } from "../styles/global";
import { Fragment, useState } from "react";
import { socket } from "../socket";
import MyButton from "../components/MyButton";
import { StatusBar } from "expo-status-bar";

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
                <Text style={globalStyles.h2}>Name</Text>
                <LinearGradient
                  colors={["#0A2472", "#0B3680"]}
                  style={{ borderRadius: 20 }}
                >
                  <TextInput
                    style={globalStyles.input}
                    onChangeText={setName}
                  />
                </LinearGradient>
              </View>
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
