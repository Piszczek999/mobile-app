import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../styles/global";
import { Map } from "../types";

type Props = {
  map: Map;
  setSelectedMap: React.Dispatch<React.SetStateAction<Map | undefined>>;
};

export default function MapModal({ map, setSelectedMap }: Props) {
  const { title, image, minLevel } = map;

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
      <View style={{ width: "90%", ...globalStyles.frame }}>
        <ImageBackground
          imageStyle={{ borderRadius: 20 }}
          source={image}
          style={{ height: 100 }}
        ></ImageBackground>
        <Text>Hello</Text>
      </View>
    </TouchableOpacity>
  );
}
