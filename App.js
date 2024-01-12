import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [content, setContent] = useState("");
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.navbar}>
        <Button title="Profile" onPress={() => setContent("Profile")} />
        <Button title="Misje" onPress={() => setContent("Misje")} />
        <Button title="Sklep" onPress={() => setContent("Sklep")} />
        <Button title="Ranking" onPress={() => setContent("Ranking")} />
      </View>
      <Text style={styles.textColor.white}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#365486",
  },
  navbar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
    padding: 10,
    backgroundColor: "#0F1035",
    maxHeight: 50,
  },
  textColor: {
    white: {
      color: "white",
    },
    black: {
      color: "black",
    },
  },
});
