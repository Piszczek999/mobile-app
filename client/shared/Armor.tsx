import { StyleSheet, View } from "react-native";
import Gradient from "./Gradient";

export default function Armor() {
  return (
    <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
      <View style={styles.armorColumn}>
        <Gradient
          colors={["#666", "#555"]}
          style={{ width: 60, height: 60 }}
        ></Gradient>
      </View>
      <View style={styles.armorColumn}>
        <Gradient
          colors={["#666", "#555"]}
          style={{ width: 60, height: 60 }}
        ></Gradient>
        <Gradient
          colors={["#666", "#555"]}
          style={{ width: 60, height: 60 }}
        ></Gradient>
        <Gradient
          colors={["#666", "#555"]}
          style={{ width: 60, height: 60 }}
        ></Gradient>
      </View>
      <View style={styles.armorColumn}>
        <Gradient
          colors={["#666", "#555"]}
          style={{ width: 60, height: 60 }}
        ></Gradient>
        <Gradient
          colors={["#666", "#555"]}
          style={{ width: 60, height: 60 }}
        ></Gradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  armorColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
  },
});
