import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../styles/global";

export default function Inventory({ items }) {
  return (
    <View style={{ ...globalStyles.frame, flex: 1, padding: 0 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          borderBottomWidth: 2,
        }}
      >
        <View style={styles.tab}>
          <Text style={{ color: "white", textAlign: "center" }}>
            Ulepszacze
          </Text>
        </View>
        <View style={styles.tab}>
          <Text style={{ color: "white", textAlign: "center" }}>
            Wyposażenie
          </Text>
        </View>
        <View style={styles.tab}>
          <Text style={{ color: "white", textAlign: "center" }}>Inne</Text>
        </View>
      </View>
      <View>
        {/* {items.map((item) => (
          <View style={globalStyles.itemFrame}></View>
        ))} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    flexGrow: 1,
    backgroundColor: "#0B3680",
    height: 40,
    width: 100,
    justifyContent: "center",
  },
});
