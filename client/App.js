import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Exploration from "./screens/Exploration";
import { useState } from "react";
import Login from "./screens/Login";
import { socket } from "./socket";
import Icon from "react-native-vector-icons/FontAwesome";
import Profile from "./screens/Profile";
import { StatusBar } from "expo-status-bar";
import { globalStyles } from "./styles/global";

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params.user);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            activeOpacity={0.9}
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              backgroundColor: isFocused ? "#0B3680" : "#00072D",
              justifyContent: "center",
              height: 50,
            }}
          >
            <Text
              style={{
                color: isFocused ? "lightgray" : "gray",
                textAlign: "center",
              }}
            >
              <Icon name={route.params.icon} size={35} />
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState();

  socket.on("alert", (message) => alert(message));
  socket.on("logged", (data) => {
    setUser(data);
    setLogged(true);
  });
  socket.on("logout", () => {
    setLogged(false);
    setUser(undefined);
  });

  if (!logged) return <Login />;

  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen
          name="Exploration"
          component={Exploration}
          initialParams={{ icon: "compass", user }}
          options={{
            headerStyle: globalStyles.screenHeader,
            headerTitleStyle: globalStyles.screenTitle,
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          initialParams={{ icon: "home", user }}
          options={{
            headerStyle: globalStyles.screenHeader,
            headerTitleStyle: globalStyles.screenTitle,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          initialParams={{ icon: "user", user }}
          options={{
            headerStyle: globalStyles.screenHeader,
            headerTitleStyle: globalStyles.screenTitle,
          }}
        />
      </Tab.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
