import { Text, View } from "react-native";
import { globalStyles } from "../styles/global";

export default function Stats({ character }) {
  const { uid, name, level, exp, gold, weapon, armor, inventory } = character;

  return (
    <View style={{ ...globalStyles.frame, flexGrow: 1 }}>
      <Text style={{ color: "white" }}>Name: {name}</Text>
      <Text style={{ color: "white" }}>Level: {level}</Text>
      <Text style={{ color: "white" }}>Exp: {exp}</Text>
      <Text style={{ color: "white" }}>Gold: {gold}</Text>
    </View>
  );
}
