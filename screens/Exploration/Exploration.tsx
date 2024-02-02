import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Fragment, useCallback, useState } from "react";
import { View } from "react-native";
import { RootStackParamList } from "../../Base";
import { useCharacter } from "../../shared/CharacterContext";
import Tile from "../../shared/Tile";
import { socket } from "../../socket";
import { globalStyles } from "../../styles/global";
import { Map } from "../../utils/types";
import MapModal from "./MapModal";
import MapTile from "./MapTile";
import RewardModal from "./RewardModal";
import { maps } from "../../utils/constants";

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
  const { character, rewards, setRewards } = useCharacter();
  if (!character) return;

  const { level, exploration } = character;
  const [selectedMap, setSelectedMap] = useState<Map | undefined>();
  const [rewardVisible, setRewardVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (character.exploration?.completed) socket.emit("receiveRewards");
      if (rewards) setRewardVisible(true);
    }, [character, rewards])
  );

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
      <MapModal
        visible={!!selectedMap}
        map={selectedMap}
        setSelectedMap={setSelectedMap}
      />
      <RewardModal
        visible={rewardVisible}
        setRewardVisible={setRewardVisible}
      />
    </Fragment>
  );
}
