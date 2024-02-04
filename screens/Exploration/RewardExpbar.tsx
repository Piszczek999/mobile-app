import { Text, View } from "react-native";
import { LEVELS } from "../../utils/constants";
import { Character } from "../../utils/types";
import { Fragment } from "react";

type Props = {
  character: Character;
  exp: number;
};

export default function RewardExpbar({ character: ch, exp }: Props) {
  const levelUp = ch.exp < exp;
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
        width: "100%",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {levelUp ? (
          <Fragment>
            <View
              style={{
                backgroundColor: "#d5c",
                width: `${(ch.exp / LEVELS[ch.level]) * 100}%`,
                height: "100%",
              }}
            ></View>
          </Fragment>
        ) : (
          <Fragment>
            <View
              style={{
                backgroundColor: "#a39",
                width: `${((ch.exp - exp) / LEVELS[ch.level]) * 100}%`,
                height: "100%",
              }}
            ></View>
            <View
              style={{
                backgroundColor: "#d5c",
                width: `${(exp / LEVELS[ch.level]) * 100}%`,
                height: "100%",
              }}
            ></View>
          </Fragment>
        )}
      </View>
      <Text
        style={{
          color: "white",
          fontSize: 20,
        }}
      >
        {"Level " + ch.level}
      </Text>
      {levelUp && (
        <Text
          style={{
            textAlign: "center",
            color: "yellow",
            fontSize: 20,
          }}
        >
          Level Up!
        </Text>
      )}
      <Text
        style={{
          textAlign: "right",
          color: "white",
          fontSize: 20,
        }}
      >
        {`+${Math.floor(exp)}`}
      </Text>
    </View>
  );
}
