import { StyleSheet, Text, View } from "react-native";
import { Item, ItemType } from "../../utils/types";
import Tile from "../../shared/Tile";
import ItemFrame from "../../shared/ItemFrame";
import { useState } from "react";
import InventoryFilterButton from "./InventoryFilterButton";

export default function Inventory({ items }: { items: Item[] }) {
  const [filter, setFiler] = useState<ItemType>("ingredient");

  return (
    <Tile colors={["#444", "#333"]} style={{ flex: 1, padding: 0 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <InventoryFilterButton
          active={filter === "ingredient"}
          onPress={() => setFiler("ingredient")}
          title="Ingredients"
        />
        <InventoryFilterButton
          active={filter === "equipable"}
          onPress={() => setFiler("equipable")}
          title="Equipable"
        />
        <InventoryFilterButton
          active={filter === "other"}
          onPress={() => setFiler("other")}
          title="Other"
        />
      </View>
      <View
        style={{ display: "flex", flexDirection: "row", margin: 5, gap: 5 }}
      >
        {items
          .filter((item) => item.type === filter)
          .map((item) => (
            <ItemFrame key={item.id} item={item} />
          ))}
      </View>
    </Tile>
  );
}
