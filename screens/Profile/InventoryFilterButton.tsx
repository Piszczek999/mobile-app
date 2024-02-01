import React from "react";
import Tile from "../../shared/Tile";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

type Props = {
  title: string;
  active: boolean;
  onPress: (event: GestureResponderEvent) => void;
};

export default function InventoryFilterButton({
  active,
  onPress,
  title,
}: Props) {
  return (
    <Pressable onPress={onPress} style={styles.tab}>
      <Tile
        colors={active ? ["#444", "#333"] : ["#666", "#555"]}
        style={{ height: "100%", justifyContent: "center" }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>{title}</Text>
      </Tile>
    </Pressable>
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
