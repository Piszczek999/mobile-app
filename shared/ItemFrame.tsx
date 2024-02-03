import { useState } from "react";
import { ImageBackground, Pressable, Text } from "react-native";
import itemImages from "../assets/items/itemImages";
import { DropItem, Item } from "../utils/types";
import ItemModal from "./ItemModal";
import Tile from "./Tile";

type Props = {
  item: Item | DropItem;
  equiped?: boolean;
};

export default function ItemFrame({ item, equiped }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  if (!item) return null;

  return (
    <Pressable onPress={() => setModalVisible(true)}>
      <Tile colors={["#666", "#555"]}>
        <ImageBackground
          source={itemImages[item.id]}
          style={{ height: 60, width: 60 }}
        >
          {isItem(item) && item.type !== "equipable" && (
            <Text
              style={{
                textAlign: "right",
                color: "white",
              }}
            >
              {item.count}
            </Text>
          )}
        </ImageBackground>
      </Tile>
      <ItemModal
        item={item}
        visible={modalVisible}
        setModalVisible={setModalVisible}
        equiped={equiped}
      />
    </Pressable>
  );
}

function isItem(item: Item | DropItem): item is Item {
  return "count" in item;
}
