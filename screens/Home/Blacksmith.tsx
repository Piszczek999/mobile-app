import { View } from "react-native";
import { useCharacter } from "../../shared/CharacterContext";
import MyButton from "../../shared/MyButton";
import Tile from "../../shared/Tile";
import { globalStyles } from "../../styles/global";

export default function Blacksmith() {
  const { character } = useCharacter();
  if (!character) return;

  const { uid, name, level, exp, gold, inventory } = character;

  return (
    <Tile style={globalStyles.container}>
      <View style={{ flex: 1, gap: 10 }}>
        <MyButton>Blacksmith</MyButton>
      </View>
    </Tile>
  );
}
