import { StyleSheet, View } from "react-native";
import TileWithShadow from "./TileWithShadow";

export default function Armor() {
  return (
    <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
      <View style={styles.armorColumn}>
        <TileWithShadow
          colors={["#666", "#555"]}
          style={{ width: 60, height: 60 }}
        ></TileWithShadow>
      </View>
      <View style={styles.armorColumn}>
        <TileWithShadow
          colors={["#666", "#555"]}
          style={{ width: 60, height: 60 }}
        ></TileWithShadow>
        <TileWithShadow
          colors={["#666", "#555"]}
          style={{ width: 60, height: 60 }}
        ></TileWithShadow>
        <TileWithShadow
          colors={["#666", "#555"]}
          style={{ width: 60, height: 60 }}
        ></TileWithShadow>
      </View>
      <View style={styles.armorColumn}>
        <TileWithShadow
          colors={["#666", "#555"]}
          style={{ width: 60, height: 60 }}
        ></TileWithShadow>
        <TileWithShadow
          colors={["#666", "#555"]}
          style={{ width: 60, height: 60 }}
        ></TileWithShadow>
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
