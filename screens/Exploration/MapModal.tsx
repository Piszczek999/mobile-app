import {
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import mapImages from "../../assets/maps/mapImages";
import { explorationStart } from "../../socket";
import { Map } from "../../utils/types";
import MyButton from "../../shared/MyButton";
import Tile from "../../shared/Tile";
import { formatTime } from "../../utils/utils";
import ItemFrame from "../../shared/ItemFrame";

type Props = {
  map: Map | undefined;
  visible: boolean;
  setSelectedMap: React.Dispatch<React.SetStateAction<Map | undefined>>;
};

export default function MapModal({ visible, map, setSelectedMap }: Props) {
  if (!map) return;
  const { id, title, minLevel } = map;

  const handleStart = () => {
    explorationStart(map.id);
    setSelectedMap(undefined);
  };

  const handleClose = () => {
    setSelectedMap(undefined);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={handleClose}
    >
      <Pressable style={styles.background} onPress={handleClose}>
        <Pressable style={{ width: "80%" }}>
          <ImageBackground
            source={mapImages[id]}
            style={{ height: 100, width: "100%" }}
          ></ImageBackground>
          <Tile style={styles.modal} colors={["#666", "#444"]}>
            <View
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
              >
                Details:
              </Text>
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                {"Required level: " + map.minLevel}
              </Text>
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                {"Time: " + formatTime(map.duration)}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
              >
                Possible drop:
              </Text>
              <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
                {map.drop.map((item) => (
                  <ItemFrame key={item.id} item={item} />
                ))}
              </View>
            </View>
            <MyButton onPress={handleStart}>Start</MyButton>
          </Tile>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
});
