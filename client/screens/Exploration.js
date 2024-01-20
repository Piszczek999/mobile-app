import { ImageBackground, Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { Fragment } from "react";
import { StatusBar } from "expo-status-bar";
import MapTile from "../shared/MapTile";
import { MOUNTAINS, PLAINS } from "../images";

export default function Exploration({ route }) {
  const character = route.params.user;
  const { uid, name, level, exp, gold, weapon, armor, inventory } = character;

  return (
    <Fragment>
      <StatusBar style="light" />
      <View style={globalStyles.container}>
        <View style={{ display: "flex", gap: 10 }}>
          <MapTile
            characterLevel={level}
            title="Plains"
            src={PLAINS}
            minLevel={1}
          />
          <MapTile
            characterLevel={level}
            title="Mountains"
            src={MOUNTAINS}
            minLevel={10}
          />
        </View>
      </View>
    </Fragment>
  );
}
