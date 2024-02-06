import { ReactNode } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import Tile, { TileProps } from "./Tile";

type Props = {
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: ReactNode;
} & TileProps;

export default function MyButton({
  onPress,
  style,
  textStyle,
  children,
  ...props
}: Props) {
  return (
    <Tile
      colors={["#383", "#363"]}
      style={[style, { paddingHorizontal: 20, paddingVertical: 5 }]}
      {...props}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
      >
        <Text style={[styles.title, textStyle]}>{children}</Text>
      </Pressable>
    </Tile>
  );
}

const styles = StyleSheet.create({
  title: {
    textTransform: "uppercase",
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
});
