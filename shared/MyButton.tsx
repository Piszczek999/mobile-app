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
    <Pressable onPress={onPress}>
      <Tile
        colors={["#373", "#363"]}
        style={[style, { paddingHorizontal: 20, paddingVertical: 5 }]}
        {...props}
      >
        <Text style={[styles.title, textStyle]}>{children}</Text>
      </Tile>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: {
    textTransform: "uppercase",
    color: "lightgray",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
});
