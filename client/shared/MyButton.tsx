import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Gradient from "./Gradient";

type Props = {
  title: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
};

export default function MyButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Gradient colors={["#373", "#363"]}>
        <Text style={styles.title}>{title}</Text>
      </Gradient>
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
