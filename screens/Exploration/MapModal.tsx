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
import { useCharacter } from "../../shared/CharacterContext";
import { Fragment } from "react";

type Props = {
  map: Map | undefined;
  visible: boolean;
  setSelectedMap: React.Dispatch<React.SetStateAction<Map | undefined>>;
};

export default function MapModal({ visible, map, setSelectedMap }: Props) {
  const { character } = useCharacter();
  if (!map || !character) return;
  const { id, title, minLevel, requiredItem, dungeon } = map;
  let disabled = false;
  if (requiredItem) {
    const item = character.inventory.find(
      (item) => item.id === requiredItem.id
    );
    if (item && item.count >= requiredItem.count) disabled = false;
    else disabled = true;
  } else if (character.exploration) disabled = true;

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
          />
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
              {requiredItem && (
                <Fragment>
                  <Text
                    style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
                  >
                    Required Items:
                  </Text>

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 5,
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    <ItemFrame key={requiredItem.id} item={requiredItem} />
                  </View>
                </Fragment>
              )}
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
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 5,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {map.drop.map((item) => (
                  <ItemFrame key={item.id} item={item} />
                ))}
              </View>
            </View>
            <MyButton disabled={disabled} onPress={handleStart}>
              Start
            </MyButton>
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
