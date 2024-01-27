import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Fragment, useEffect, useState } from "react";
import { View } from "react-native";
import { RootStackParamList } from "../App";
import { FIELDS, MOUNTAINS } from "../images";
import MapModal from "../shared/MapModal";
import MapTile from "../shared/MapTile";
import Tile from "../shared/Tile";
import { globalStyles } from "../styles/global";
import { Character, Map } from "../types";
import { explorationComplete } from "../socket";

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
  const character: Character = route.params.user;
  const { level, exploration } = character;
  const [selectedMap, setSelectedMap] = useState<Map | undefined>();

  const maps: { [key: string]: Map } = {
    fields: {
      id: "fields",
      title: "Fields",
      image: FIELDS,
      minLevel: 1,
      duration: 1,
    },
    mountains: {
      id: "mountains",
      title: "Mountains",
      image: MOUNTAINS,
      minLevel: 10,
      duration: 1,
    },
  };
  console.log("Exploration: ");
  console.log(character);

  useEffect(() => {
    console.log("update!");
  }, [character]);

  return (
    <Fragment>
      <StatusBar style="light" />
      <Tile style={globalStyles.container}>
        <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <MapTile
            characterLevel={level}
            map={maps.fields}
            setSelectedMap={setSelectedMap}
            exploration={exploration}
          />
          <MapTile
            characterLevel={level}
            map={maps.mountains}
            setSelectedMap={setSelectedMap}
            exploration={exploration}
          />
        </View>
      </Tile>
      {selectedMap && (
        <MapModal map={selectedMap} setSelectedMap={setSelectedMap} />
      )}
    </Fragment>
  );
}
