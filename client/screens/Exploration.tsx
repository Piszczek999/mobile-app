import { RouteProp } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Fragment, useState } from "react";
import { View } from "react-native";
import { FIELDS, MOUNTAINS } from "../images";
import MapModal from "../shared/MapModal";
import MapTile from "../shared/MapTile";
import { globalStyles } from "../styles/global";
import { Map } from "../types";
import { RootStackParamList } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";
import Gradient from "../shared/Gradient";

type ExplorationScreenRouteProp = RouteProp<RootStackParamList, "Exploration">;

type ExplorationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Exploration"
>;

type Props = {
  route: ExplorationScreenRouteProp;
  navigation: ExplorationScreenNavigationProp;
};

export default function Exploration({ route, navigation }: Props) {
  const character = route.params.user;
  const { uid, name, level, exp, gold, weapon, armor, inventory } = character;
  const [selectedMap, setSelectedMap] = useState<Map | undefined>();

  const maps: { [key: string]: Map } = {
    fields: {
      title: "Fields",
      image: FIELDS,
      minLevel: 1,
      duration: 5,
    },
    mountains: {
      title: "Mountains",
      image: MOUNTAINS,
      minLevel: 10,
      duration: 10,
    },
  };

  return (
    <Fragment>
      <StatusBar style="light" />
      <Gradient style={globalStyles.container}>
        <View style={{ display: "flex", gap: 10 }}>
          <MapTile
            characterLevel={level}
            map={maps.fields}
            setSelectedMap={setSelectedMap}
          />
          <MapTile
            characterLevel={level}
            map={maps.mountains}
            setSelectedMap={setSelectedMap}
          />
        </View>
      </Gradient>
      {selectedMap && (
        <MapModal map={selectedMap} setSelectedMap={setSelectedMap} />
      )}
    </Fragment>
  );
}
