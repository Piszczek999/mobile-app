import { Text, TextInputComponent, View } from "react-native";

export default function Exploration() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login</Text>
      <TextInputComponent keyboardType="default" />
      <Text>Password</Text>
      <TextInputComponent keyboardType="default" />
    </View>
  );
}
