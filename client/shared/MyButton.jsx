import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function MyButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient colors={["#0B3680", "#0A2472"]} style={styles.button}>
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 3,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  title: {
    color: "lightgray",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
