import {
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import itemImages from "../assets/items/itemImages";
import { DropItem, Item } from "../utils/types";
import Tile from "./Tile";
import MyButton from "./MyButton";
import { Fragment } from "react";
import { socket } from "../socket";
import { useCharacter } from "./CharacterContext";

type Props = {
  item: Item | DropItem;
  visible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ItemModal({ visible, item, setModalVisible }: Props) {
  const { setCharacter } = useCharacter();

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleEquip = () => {
    socket.emit("equip", item);
    setModalVisible(false);
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
          <Tile style={styles.modal} colors={["#666", "#444"]}>
            <ImageBackground
              source={itemImages[item.id]}
              style={{ height: 60, width: 60 }}
            ></ImageBackground>
            <View
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 30, fontWeight: "bold" }}
              >
                {item.name}
              </Text>
              {isItem(item) && (
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  {item.type}
                </Text>
              )}
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {isItem(item) && item.bonuses && (
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  Armor: {item.bonuses.armor}
                </Text>
              )}
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {isItem(item) && item.type === "equipable" ? (
                <Fragment>
                  <MyButton onPress={handleEquip}>Equip</MyButton>
                </Fragment>
              ) : (
                <MyButton>Remove</MyButton>
              )}
            </View>
          </Tile>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function isItem(item: Item | DropItem): item is Item {
  return "count" in item;
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    padding: 10,
  },
});
