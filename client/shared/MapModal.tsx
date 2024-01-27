import { ImageBackground, Text, TouchableOpacity } from "react-native";
import { Map } from "../types";
import Tile from "./Tile";
import MyButton from "./MyButton";
import { explorationStart } from "../socket";

type Props = {
  map: Map;
  setSelectedMap: React.Dispatch<React.SetStateAction<Map | undefined>>;
};

export default function MapModal({ map, setSelectedMap }: Props) {
  const { title, image, minLevel } = map;

  const handleStart = () => {
    explorationStart(map.id);
    setSelectedMap(undefined);
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
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
          source={image}
          style={{ height: 100, elevation: 5 }}
        ></ImageBackground>
        <MyButton onPress={handleStart}>Start</MyButton>
      </Tile>
    </TouchableOpacity>
  );
}
