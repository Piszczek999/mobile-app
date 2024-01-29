import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { auth } from "./firebase";
import Exploration from "./screens/Exploration";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Login from "./shared/Login";
import TabBar from "./shared/TabBar";
import { handleAlert, login, logout, socket } from "./socket";
import { globalStyles } from "./styles/global";
import Icon from "react-native-vector-icons/FontAwesome";
import { Character } from "./types";
import { useCharacter } from "./shared/CharacterContext";

export type RootStackParamList = {
  Exploration: { icon: string; user: any };
  Home: { icon: string; user: any };
  Profile: { icon: string; user: any };
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const Base: React.FC = () => {
  const [logged, setLogged] = useState(false);
  const { character, setCharacter } = useCharacter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        login(token);
      } else {
        logout();
      }
    });
    socket.on("alert", handleAlert);
    socket.on("updateCharacter", handleUpdateCharacter);

    socket.on("logout", handleOnLogout);

    return () => {
      unsubscribe();
      socket.off("alert", handleAlert);
      socket.off("updateCharacter", handleUpdateCharacter);
      socket.off("logout", handleOnLogout);
    };
  }, [socket]);

  const screenOptions: BottomTabNavigationOptions = {
    headerStyle: globalStyles.screenHeader,
    headerTitleStyle: globalStyles.screenTitle,
  };

  const handleOnLogout = () => {
    setLogged(false);
    setCharacter(undefined);
  };

  const handleUpdateCharacter = (character: Character) => {
    setCharacter(character);
    setLogged(true);
    console.log("update");
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["email", "password"]);
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  if (!logged) return <Login />;

  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen
          name="Exploration"
          component={Exploration}
          initialParams={{ icon: "compass", user: character }}
          options={screenOptions}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          initialParams={{ icon: "home", user: character }}
          options={screenOptions}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          initialParams={{ icon: "compass", user: character }}
          options={({ navigation }) => ({
            ...screenOptions,
            headerRight: () => (
              <TouchableOpacity
                onPress={async () => {
                  await handleLogout();
                }}
                style={{ marginRight: 16 }}
              >
                <Icon name="sign-out" color="white" size={30} />
              </TouchableOpacity>
            ),
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Base;
