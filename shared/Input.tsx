import { TextInput, TextInputProps } from "react-native";
import Tile from "./Tile";

export default function Input({ ...props }: TextInputProps) {
  return (
    <Tile
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      colors={["#444", "#666"]}
      style={{ minWidth: 250 }}
    >
      <TextInput
        {...props}
        placeholderTextColor="lightgray"
        style={{
          minWidth: 250,
          borderColor: "black",
          borderWidth: 1,
          color: "white",
          fontSize: 16,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      />
    </Tile>
  );
}
