import { StyleSheet, Text, View } from "react-native";
import { Item } from "../types";
import Gradient from "./Gradient";

export default function Inventory({ items }: { items: Item[] }) {
  return (
    <Gradient colors={["#666", "#555"]} style={{ flex: 1, padding: 0 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Gradient colors={["#666", "#555"]} style={styles.tab}>
          <Text style={{ color: "white", textAlign: "center" }}>
            Ulepszacze
          </Text>
        </Gradient>
        <Gradient colors={["#666", "#555"]} style={styles.tab}>
          <Text style={{ color: "white", textAlign: "center" }}>
            Wyposażenie
          </Text>
        </Gradient>
        <Gradient colors={["#666", "#555"]} style={styles.tab}>
          <Text style={{ color: "white", textAlign: "center" }}>Inne</Text>
        </Gradient>
      </View>
      <View>
        {/* {items.map((item) => (
          <View style={globalStyles.itemFrame}></View>
        ))} */}
      </View>
    </Gradient>
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
