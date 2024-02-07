import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Exploration from "./screens/Exploration/Exploration";
import Home from "./screens/Home/Home";
import Profile from "./screens/Profile/Profile";
import { useCharacter } from "./shared/CharacterContext";
import Login from "./shared/Login";
import SettingsMenu from "./shared/SettingsMenu";
import TabBar from "./shared/TabBar";
import { handleAlert, login, logout, socket } from "./socket";
import { globalStyles } from "./styles/global";
import { Character, CharacterHead, Rewards } from "./utils/types";

export type RootStackParamList = {
  Exploration: { icon: string };
  Home: { icon: string };
  Profile: { icon: string };
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const Base: React.FC = () => {
  const [logged, setLogged] = useState(false);
  const { setCharacter, setRewards, setLeaderboard } = useCharacter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        login(token);
      } else {
        logout();
        setLoading(false);
      }
    });
    socket.on("alert", handleAlert);
    socket.on("updateCharacter", handleUpdateCharacter);
    socket.on("updateLeaderboard", handleUpdateLeaderboard);
    socket.on("rewards", handleRewards);
    socket.on("logout", handleOnLogout);

    return () => {
      unsubscribe();
      socket.off("alert", handleAlert);
      socket.off("updateCharacter", handleUpdateCharacter);
      socket.off("updateLeaderboard", handleUpdateLeaderboard);
      socket.off("rewards", handleRewards);
      socket.off("logout", handleOnLogout);
    };
  }, [socket]);

  const screenOptions: BottomTabNavigationOptions = {
    headerStyle: globalStyles.screenHeader,
    headerTitleStyle: globalStyles.screenTitle,
  };

  const handleRewards = (rewards: Rewards) => {
    setRewards(rewards);
  };

  const handleOnLogout = () => {
    setLogged(false);
    setCharacter(undefined);
  };

  const handleUpdateCharacter = (character: Character) => {
    setCharacter(character);
    setLogged(true);
    setLoading(false);
  };

  const handleUpdateLeaderboard = (leaderboard: CharacterHead[]) => {
    setLeaderboard(leaderboard);
  };

  if (!logged) return <Login loading={loading} />;

  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen
          name="Exploration"
          component={Exploration}
          initialParams={{ icon: "compass" }}
          options={screenOptions}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          initialParams={{ icon: "home" }}
          options={{ ...screenOptions, headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          initialParams={{ icon: "user" }}
          options={() => ({
            ...screenOptions,
            headerRight: () => <SettingsMenu />,
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Base;
