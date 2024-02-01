import { ImageBackground, Pressable, Text, View } from "react-native";
import itemImages from "../assets/items/itemImages";
import { Item } from "../utils/types";
import Tile from "./Tile";

type Props = {
  item: Item;
};

export default function ItemFrame({ item }: Props) {
  return (
    <Pressable>
      <Tile colors={["#666", "#555"]}>
        <ImageBackground
          source={itemImages[item.id]}
          style={{ height: 60, width: 60 }}
        >
          <View>
            <Text
              style={{
                textAlign: "right",
                color: "white",
              }}
            >
              {item.count}
            </Text>
          </View>
        </ImageBackground>
      </Tile>
    </Pressable>
  );
}
