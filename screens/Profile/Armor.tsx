import { StyleSheet, View } from "react-native";
import { useCharacter } from "../../shared/CharacterContext";
import ItemFrame from "../../shared/ItemFrame";
import Tile from "../../shared/Tile";

export default function Armor() {
  const { character } = useCharacter();
  if (!character) return;
  const { equipment } = character;

  return (
    <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
      <View style={styles.armorColumn}>
        <Tile colors={["#666", "#555"]} style={{ width: 60, height: 60 }}>
          {equipment.weapon && <ItemFrame item={equipment.weapon} equiped />}
        </Tile>
      </View>
      <View style={styles.armorColumn}>
        <Tile colors={["#666", "#555"]} style={{ width: 60, height: 60 }}>
          {equipment.head && <ItemFrame item={equipment.head} equiped />}
        </Tile>
        <Tile colors={["#666", "#555"]} style={{ width: 60, height: 60 }}>
          {equipment.chest && <ItemFrame item={equipment.chest} equiped />}
        </Tile>
        <Tile colors={["#666", "#555"]} style={{ width: 60, height: 60 }}>
          {equipment.boots && <ItemFrame item={equipment.boots} equiped />}
        </Tile>
      </View>
      <View style={styles.armorColumn}>
        <Tile colors={["#666", "#555"]} style={{ width: 60, height: 60 }}>
          {equipment.shield && <ItemFrame item={equipment.shield} equiped />}
        </Tile>
        <Tile colors={["#666", "#555"]} style={{ width: 60, height: 60 }}>
          {equipment.bracelet && (
            <ItemFrame item={equipment.bracelet} equiped />
          )}
        </Tile>
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
