import { StyleSheet, View } from "react-native";
import Tile from "../../shared/Tile";

export default function Armor() {
  return (
    <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
      <View style={styles.armorColumn}>
        <Tile
          colors={["#666", "#555"]}
          style={{ width: 60, height: 60 }}
        ></Tile>
      </View>
      <View style={styles.armorColumn}>
        <Tile
          colors={["#666", "#555"]}
          style={{ width: 60, height: 60 }}
        ></Tile>
        <Tile
          colors={["#666", "#555"]}
          style={{ width: 60, height: 60 }}
        ></Tile>
        <Tile
          colors={["#666", "#555"]}
          style={{ width: 60, height: 60 }}
        ></Tile>
      </View>
      <View style={styles.armorColumn}>
        <Tile
          colors={["#666", "#555"]}
          style={{ width: 60, height: 60 }}
        ></Tile>
        <Tile
          colors={["#666", "#555"]}
          style={{ width: 60, height: 60 }}
        ></Tile>
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
