import { globalStyles } from "../styles/global";
import { StyleSheet, View } from "react-native";

export default function Armor() {
  return (
    <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
      <View style={styles.armorColumn}>
        <View style={globalStyles.itemFrame}></View>
      </View>
      <View style={styles.armorColumn}>
        <View style={globalStyles.itemFrame}></View>
        <View style={globalStyles.itemFrame}></View>
        <View style={globalStyles.itemFrame}></View>
      </View>
      <View style={styles.armorColumn}>
        <View style={globalStyles.itemFrame}></View>
        <View style={globalStyles.itemFrame}></View>
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
