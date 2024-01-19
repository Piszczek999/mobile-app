import { Button, Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { socket } from "../socket";
import MyButton from "../components/MyButton";
import { Fragment } from "react";

export default function Profile({ route }) {
  const { name, level, exp, gold } = route.params;
  return (
    <Fragment>
      <StatusBar style="light" />
      <View style={globalStyles.container}>
        <Text>Name: {name}</Text>
        <Text>Level: {level}</Text>
        <Text>Exp: {exp}</Text>
        <Text>Gold: {gold}</Text>
        <MyButton title="Log out" onPress={() => socket.emit("logout")} />
      </View>
    </Fragment>
  );
}
