import { StyleSheet, Text, View } from "react-native";
import { Item } from "../../utils/types";
import Tile from "../../shared/Tile";
import ItemFrame from "../../shared/ItemFrame";

export default function Inventory({ items }: { items: Item[] }) {
  return (
    <Tile colors={["#444", "#333"]} style={{ flex: 1, padding: 0 }}>
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
      <View
        style={{ display: "flex", flexDirection: "row", margin: 5, gap: 5 }}
      >
        {items.map((item) => (
          <ItemFrame key={item.id} item={item} />
        ))}
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
