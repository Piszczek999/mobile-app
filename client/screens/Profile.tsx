import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../App";
import Armor from "../shared/Armor";
import Inventory from "../shared/Inventory";
import Stats from "../shared/Stats";
import Tile from "../shared/Tile";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Profile">;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};
export default function Profile({ route, navigation }: Props) {
  const character = route.params.user;
  const { uid, name, level, exp, gold, weapon, armor, inventory } = character;

  return (
    <Fragment>
      <StatusBar style="light" />
      <Tile style={{ flex: 1, padding: 5, gap: 10 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Stats character={character} />
          <Armor />
        </View>
        <Inventory items={inventory} />
      </Tile>
    </Fragment>
  );
}

const styles = StyleSheet.create({});
