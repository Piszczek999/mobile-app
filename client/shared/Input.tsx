import { TextInput, TextInputProps } from "react-native";
import Gradient from "./Gradient";

export default function Input({ ...props }: TextInputProps) {
  return (
    <Gradient
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      colors={["#444", "#666"]}
    >
      <TextInput
        {...props}
        placeholderTextColor="lightgray"
        style={{
          width: 250,
          borderColor: "black",
          borderWidth: 1,
          color: "white",
          fontSize: 16,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      />
    </Gradient>
  );
}
