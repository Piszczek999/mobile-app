import { Text, View } from "react-native";
import { LEVELS } from "../../utils/constants";
import { Character } from "../../utils/types";

type Props = {
  character: Character;
};

export default function Expbar({ character }: Props) {
  const { exp, level } = character;

  return (
    <View style={{ height: 30, backgroundColor: "black" }}>
      <View
        style={{
          width: `${(exp / LEVELS[level]) * 100}%`,
          backgroundColor: "#a39",
          height: "100%",
        }}
      ></View>
      <Text
        style={{
          position: "absolute",
          left: 0,
          top: 3,
          color: "white",
          fontSize: 15,
        }}
      >
        {Math.floor(exp)}
      </Text>
      <Text
        style={{
          position: "absolute",
          left: "45%",
          color: "white",
          fontSize: 20,
        }}
      >
        {Math.floor((exp / LEVELS[level]) * 100)}%
      </Text>
      <Text
        style={{
          position: "absolute",
          right: 0,
          top: 3,
          color: "white",
          fontSize: 15,
        }}
      >
        {LEVELS[level]}
      </Text>
    </View>
  );
}
