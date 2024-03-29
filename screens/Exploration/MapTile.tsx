import { Fragment, useEffect, useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import mapImages from "../../assets/maps/mapImages";
import { Exploration, Map } from "../../utils/types";
import { formatTimeSeconds } from "../../utils/utils";
import Icon5 from "react-native-vector-icons/FontAwesome5";

type Props = {
  map: Map;
  characterLevel: number;
  exploration: Exploration | null;
  setSelectedMap: React.Dispatch<React.SetStateAction<Map | undefined>>;
};

export default function MapTile({
  map,
  characterLevel,
  exploration,
  setSelectedMap,
}: Props) {
  const [progress, setProgress] = useState(0);
  const { id, title, minLevel, duration, dungeon } = map;
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
      }, 200);

      return () => clearInterval(intervalId);
    }
  }, [exploration]);

  return (
    <Pressable
      onPress={() => setSelectedMap(map)}
      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
    >
      <ImageBackground
        source={mapImages[id]}
        style={{ height: 100, flexGrow: 1 }}
      >
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
            {dungeon ? (
              <Text style={{ color: "lightgray", fontSize: 30 }}>
                <Fragment>
                  <Icon5 name="dungeon" size={30} />
                  {" " + title}
                </Fragment>
              </Text>
            ) : (
              <Text style={{ color: "lightgray", fontSize: 30 }}>{title}</Text>
            )}
            <Text
              style={{
                color: "lightgray",
                fontSize: 20,
                textAlign: "right",
                textAlignVertical: "bottom",
              }}
            >
              {Math.floor(duration / 60000) + "min"}
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
          ></View>
        )}

        {active && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              justifyContent: "center",
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 35 }}>
              {formatTimeSeconds(
                exploration.startTime + exploration.duration - Date.now()
              )}
            </Text>
          </View>
        )}
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
});
