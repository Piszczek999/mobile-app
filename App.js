import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "./shared/MyDrawer";

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
