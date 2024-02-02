import {
  GestureResponderEvent,
  ImageBackground,
  Pressable,
  Text,
  View,
} from "react-native";
import itemImages from "../assets/items/itemImages";
import { DropItem, Item } from "../utils/types";
import Tile from "./Tile";

type Props = {
  item: Item | DropItem;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function ItemFrame({ item, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <Tile colors={["#666", "#555"]}>
        <ImageBackground
          source={itemImages[item.id]}
          style={{ height: 60, width: 60 }}
        >
          {isItem(item) && (
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
    </Pressable>
  );
}

function isItem(item: Item | DropItem): item is Item {
  return "count" in item;
}
