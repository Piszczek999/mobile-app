import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { signOut } from "firebase/auth";
import { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { auth } from "../firebase";
import Armor from "../shared/Armor";
import Inventory from "../shared/Inventory";
import MyButton from "../shared/MyButton";
import Stats from "../shared/Stats";
import { globalStyles } from "../styles/global";

export default function Profile({ route }) {
  const character = route.params.user;
  const { uid, name, level, exp, gold, weapon, armor, inventory } = character;
  console.log(inventory);

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["email", "password"]);
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Fragment>
      <StatusBar style="light" />
      <View style={{ ...globalStyles.container, gap: 10 }}>
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <Stats character={character} />
          <Armor />
        </View>
        <Inventory items={inventory} />
        <MyButton title="Log out" onPress={async () => await handleLogout()} />
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({});
