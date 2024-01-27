import { StyleSheet, Text, View } from "react-native";
import { Item } from "../types";
import Tile from "./Tile";

export default function Inventory({ items }: { items: Item[] }) {
  return (
    <Tile colors={["#555", "#444"]} style={{ flex: 1, padding: 0 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Tile colors={["#666", "#555"]} style={styles.tab}>
          <Text style={{ color: "white", textAlign: "center" }}>
            Ulepszacze
          </Text>
        </Tile>
        <Tile colors={["#666", "#555"]} style={styles.tab}>
          <Text style={{ color: "white", textAlign: "center" }}>
            Wyposażenie
          </Text>
        </Tile>
        <Tile colors={["#666", "#555"]} style={styles.tab}>
          <Text style={{ color: "white", textAlign: "center" }}>Inne</Text>
        </Tile>
      </View>
      <View>
        {/* {items.map((item) => (
          <View style={globalStyles.itemFrame}></View>
        ))} */}
      </View>
    </Tile>
  );
}

const styles = StyleSheet.create({
  tab: {
    flexGrow: 1,
    height: 40,
    width: 100,
    justifyContent: "center",
  },
});
