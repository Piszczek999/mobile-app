import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Fragment, useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { RootStackParamList } from "../Base";
import { FIELDS, MOUNTAINS } from "../images";
import { useCharacter } from "../shared/CharacterContext";
import MapModal from "../shared/MapModal";
import MapTile from "../shared/MapTile";
import Tile from "../shared/Tile";
import { globalStyles } from "../styles/global";
import { Map } from "../types";
import { useFocusEffect } from "@react-navigation/native";
import { socket } from "../socket";

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
  const { character } = useCharacter();
  if (!character) return;

  const { level, exploration } = character;
  const [selectedMap, setSelectedMap] = useState<Map | undefined>();

  useFocusEffect(
    useCallback(() => {
      socket.emit("receiveRewards");
    }, [character])
  );

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
