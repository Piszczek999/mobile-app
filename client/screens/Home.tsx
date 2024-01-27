import { RouteProp } from "@react-navigation/native";
import { Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { Fragment } from "react";
import { StatusBar } from "expo-status-bar";
import { RootStackParamList } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";
import Tile from "../shared/Tile";

type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

export default function Home({ route, navigation }: Props) {
  const character = route.params.user;
  const { uid, name, level, exp, gold, weapon, armor, inventory } = character;

  return (
    <Fragment>
      <StatusBar style="light" />
      <Tile style={globalStyles.container}>
        <Text>Home Screen</Text>
      </Tile>
    </Fragment>
  );
}
