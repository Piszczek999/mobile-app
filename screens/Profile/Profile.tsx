import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../Base";
import Armor from "./Armor";
import { useCharacter } from "../../shared/CharacterContext";
import Inventory from "./Inventory";
import Stats from "./Stats";
import Tile from "../../shared/Tile";
import Expbar from "./Expbar";

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
  const { character } = useCharacter();
  if (!character) return;

  const { inventory } = character;

  return (
    <Fragment>
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
        <Expbar character={character} />
        <Inventory items={inventory} />
      </Tile>
    </Fragment>
  );
}

const styles = StyleSheet.create({});
