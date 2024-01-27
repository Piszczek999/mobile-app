import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Map } from "../types";

type Props = {
  map: Map;
  characterLevel: number;
  setSelectedMap: React.Dispatch<React.SetStateAction<Map | undefined>>;
};

export default function MapTile({
  map,
  characterLevel,
  setSelectedMap,
}: Props) {
  const { title, image, minLevel, duration } = map;

  return (
    <TouchableOpacity onPress={() => setSelectedMap(map)}>
      <ImageBackground
        imageStyle={{ borderRadius: 20 }}
        source={image}
        style={{ height: 100, opacity: characterLevel < minLevel ? 0.5 : 1 }}
      >
        <View style={styles.container}>
          <Text
            style={{
              textAlign: "right",
              color: characterLevel < minLevel ? "red" : "lightgray",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {minLevel} lv
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "lightgray", fontSize: 30 }}>{title}</Text>
            <Text
              style={{
                color: "lightgray",
                fontSize: 20,
                textAlign: "right",
                textAlignVertical: "bottom",
              }}
            >
              {duration + "min"}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "#00072D",
    paddingHorizontal: 5,
  },
});
