import { Button, Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { socket } from "../socket";
import MyButton from "../components/MyButton";

export default function Profile({ route }) {
  return (
    <View style={globalStyles.container}>
      <Text>Name: {route.params.name}</Text>
      <Text>Level: {route.params.level}</Text>
      <Text>Exp: {route.params.exp}</Text>
      <Text>Gold: {route.params.gold}</Text>
      <MyButton title="Log out" onPress={() => socket.emit("logout")} />
    </View>
  );
}
