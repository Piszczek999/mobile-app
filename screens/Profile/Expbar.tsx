import { Text, View } from "react-native";
import { LEVELS } from "../../utils/constants";
import { Character } from "../../utils/types";

type Props = {
  character: Character;
};

export default function Expbar({ character }: Props) {
  const { exp, level } = character;

  return (
    <View
      style={{
        height: 30,
        paddingHorizontal: 10,
        backgroundColor: "black",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: `${(exp / LEVELS[level]) * 100}%`,
          backgroundColor: "#a39",
          height: "100%",
          position: "absolute",
        }}
      ></View>
      <Text
        style={{
          color: "white",
          fontSize: 20,
        }}
      >
        {"Level " + level}
      </Text>
      <Text
        style={{
          textAlign: "right",
          color: "white",
          fontSize: 15,
        }}
      >
        {`${Math.floor(exp)}/${LEVELS[level]} (${(
          (exp / LEVELS[level]) *
          100
        ).toFixed(2)}%)`}
      </Text>
    </View>
  );
}
