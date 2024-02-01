import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { Item } from "../types";

type Props = {
  item: Item;
};

export default function ItemFrame({ item }: Props) {
  return (
    <Shadow startColor="#0002" offset={[2, 3]} stretch distance={5}>
      <TouchableOpacity activeOpacity={0.8}>
        <ImageBackground
          source={require(`../assets/${item.id}.png`)}
          style={{ height: 50, width: 50, flexGrow: 1 }}
        >
          <View style={{ flex: 1 }}>
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
      </TouchableOpacity>
    </Shadow>
  );
}
