import { Text, View } from "react-native";
import Tile from "../../shared/Tile";
import { Character } from "../../utils/types";

export default function Stats({ character }: { character: Character }) {
  const { uid, name, level, exp, gold, equipment, inventory, stats } =
    character;

  return (
    <View style={{ flexGrow: 1 }}>
      <Tile
        colors={["#777", "#555"]}
        style={{
          padding: 10,
          flexDirection: "column",
          flexGrow: 0,
          overflow: "hidden",
        }}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          {name}
        </Text>
        <Text style={{ color: "gold", fontSize: 20 }}>
          Gold: {Math.floor(gold)}
        </Text>
        <Text style={{ color: "orange", fontSize: 20 }}>
          Attack: {Math.floor(stats.attack)}
        </Text>
        <Text style={{ color: "lightgray", fontSize: 20 }}>
          Defense: {Math.floor(stats.defense)}
        </Text>
      </Tile>
    </View>
  );
}
