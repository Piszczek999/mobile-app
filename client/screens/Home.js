import { Text, View } from "react-native";
import { globalStyles } from "../styles/global";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <StatusBar style="light" />
      <View style={globalStyles.container}>
        <Text>Home Screen</Text>
      </View>
    </Fragment>
  );
}
