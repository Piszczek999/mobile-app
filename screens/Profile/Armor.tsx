import { StyleSheet, View } from "react-native";
import Tile from "../../shared/Tile";
import { useCharacter } from "../../shared/CharacterContext";
import ItemFrame from "../../shared/ItemFrame";

export default function Armor() {
  const { character } = useCharacter();
  if (!character) return;
  const { armor } = character;

  return (
    <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
      <View style={styles.armorColumn}>
        <Tile
          colors={["#666", "#555"]}
          style={{ width: 60, height: 60 }}
        ></Tile>
      </View>
      <View style={styles.armorColumn}>
        <Tile colors={["#666", "#555"]} style={{ width: 60, height: 60 }}>
          {armor.head && <ItemFrame item={armor.head} />}
        </Tile>
        <Tile colors={["#666", "#555"]} style={{ width: 60, height: 60 }}>
          {armor.chest && <ItemFrame item={armor.chest} />}
        </Tile>
        <Tile colors={["#666", "#555"]} style={{ width: 60, height: 60 }}>
          {armor.legs && <ItemFrame item={armor.legs} />}
        </Tile>
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
