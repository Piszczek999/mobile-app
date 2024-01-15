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

function MyTabBar({ state, descriptors, navigation }) {
  console.log(state);
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
            navigation.navigate(route.name);
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
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              backgroundColor: isFocused ? "black" : "white",
              justifyContent: "center",
              height: 40,
            }}
          >
            <Text
              style={{
                color: isFocused ? "white" : "black",
                textAlign: "center",
              }}
            >
              <Icon name={route.params.icon} size={30} />
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [logged, setLogged] = useState(true);

  socket.on("alert", (message) => alert(message));
  socket.on("logged", (data) => setLogged(true));

  if (!logged) return <Login />;

  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen
          name="Exploration"
          component={Exploration}
          initialParams={{ icon: "compass" }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          initialParams={{ icon: "home" }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          initialParams={{ icon: "user" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
