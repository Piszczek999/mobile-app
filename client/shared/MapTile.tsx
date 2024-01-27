import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Exploration, Map } from "../types";
import { useEffect, useState } from "react";
import { explorationComplete } from "../socket";

type Props = {
  map: Map;
  characterLevel: number;
  exploration: Exploration;
  setSelectedMap: React.Dispatch<React.SetStateAction<Map | undefined>>;
};

export default function MapTile({
  map,
  characterLevel,
  exploration,
  setSelectedMap,
}: Props) {
  const [progress, setProgress] = useState(0);
  const { id, title, image, minLevel, duration } = map;
  const disabled = characterLevel < minLevel;
  const active = exploration?.mapId == id;

  useEffect(() => {
    if (active) {
      const intervalId = setInterval(() => {
        const elapsedTime = Date.now() - exploration.startTime;
        const currentProgress = Math.min(1, elapsedTime / exploration.duration);
        setProgress(currentProgress);

        if (currentProgress >= 1) {
          clearInterval(intervalId);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [exploration]);

  return (
    <Shadow startColor="#0002" offset={[2, 3]} stretch distance={5}>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled || active}
        onPress={() => setSelectedMap(map)}
      >
        <ImageBackground source={image} style={{ height: 100, flexGrow: 1 }}>
          <View style={styles.container}>
            <Text
              style={{
                textAlign: "right",
                color: disabled ? "#f22" : "lightgray",
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
          {(disabled || active) && (
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                width: `${(1 - progress) * 100}%`,
                left: `${progress * 100}%`,
              }}
            />
          )}
        </ImageBackground>
      </TouchableOpacity>
    </Shadow>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
});
