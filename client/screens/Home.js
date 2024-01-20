import { Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { Fragment } from "react";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  const character = route.params.user;
  const { uid, name, level, exp, gold, weapon, armor, inventory } = character;

  return (
    <Fragment>
      <StatusBar style="light" />
      <View style={globalStyles.container}>
        <Text>Home Screen</Text>
      </View>
    </Fragment>
  );
}
