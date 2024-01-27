import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { auth } from "./firebase";
import Exploration from "./screens/Exploration";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Login from "./shared/Login";
import TabBar from "./shared/TabBar";
import { socket } from "./socket";
import { globalStyles } from "./styles/global";
import Icon from "react-native-vector-icons/FontAwesome";
import { Character } from "./types";

export type RootStackParamList = {
  Exploration: { icon: string; user: any };
  Home: { icon: string; user: any };
  Profile: { icon: string; user: any };
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [logged, setLogged] = useState(false);
  const [character, setCharacter] = useState<Character>();

  socket.on("alert", (message: any) => alert(message));
  socket.on("updateCharacter", (character: Character) => {
    setCharacter(character);
    setLogged(true);
  });
  socket.on("logout", () => {
    setLogged(false);
    setCharacter(undefined);
  });

  if (!logged) return <Login />;

  const screenOptions: BottomTabNavigationOptions = {
    headerStyle: globalStyles.screenHeader,
    headerTitleStyle: globalStyles.screenTitle,
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["email", "password"]);
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("App: ");
  console.log(character);

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

export default App;
