import { ReactNode } from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
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
    <TouchableOpacity onPress={onPress}>
      <Tile
        colors={["#373", "#363"]}
        style={[style, { paddingHorizontal: 10, paddingVertical: 5 }]}
        {...props}
      >
        <Text style={[styles.title, textStyle]}>{children}</Text>
      </Tile>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: {
    textTransform: "uppercase",
    color: "lightgray",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});
