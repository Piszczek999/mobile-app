import { ImageBackground, Pressable } from "react-native";
import mapImages from "../../assets/maps/mapImages";
import { explorationStart } from "../../socket";
import { Map } from "../../utils/types";
import MyButton from "../../shared/MyButton";
import Tile from "../../shared/Tile";

type Props = {
  map: Map;
  setSelectedMap: React.Dispatch<React.SetStateAction<Map | undefined>>;
};

export default function MapModal({ map, setSelectedMap }: Props) {
  const { id, title, minLevel } = map;

  const handleStart = () => {
    explorationStart(map.id);
    setSelectedMap(undefined);
  };

  return (
    <Pressable
      onPress={() => setSelectedMap(undefined)}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Tile style={{ width: "90%" }} colors={["#666", "#555"]}>
        <ImageBackground
          source={mapImages[id]}
          style={{ height: 100, elevation: 5 }}
        ></ImageBackground>
        <MyButton onPress={handleStart}>Start</MyButton>
      </Tile>
    </Pressable>
  );
}
