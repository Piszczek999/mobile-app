import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { socket } from "./socket";
import Home from "./screens/Home";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default function App() {
  socket.on("alert", (message) => alert(message));

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
