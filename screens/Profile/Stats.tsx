import { Text, View } from "react-native";
import Tile from "../../shared/Tile";
import { Character } from "../../utils/types";

export default function Stats({ character }: { character: Character }) {
  const { uid, name, level, exp, gold, weapon, armor, inventory } = character;

  return (
    <View style={{ flexGrow: 1 }}>
      <Tile
        colors={["#777", "#555"]}
        style={{
          padding: 10,
          flexDirection: "column", // Ensure text components stack vertically
          flexGrow: 0,
          overflow: "hidden",
        }}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          {name}
        </Text>
        <Text style={{ color: "white", fontSize: 20 }}>Level: {level}</Text>
        <Text style={{ color: "white", fontSize: 20 }}>
          Gold: {Math.floor(gold)}
        </Text>
      </Tile>
    </View>
  );
}
