import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import Profile from "../screens/Profile";
import Exploration from "../screens/Exploration";
import { Text, View } from "react-native";
import { globalStyles } from "../styles/global";

export default function MyDrawer() {
  const Drawer = createDrawerNavigator();

  const options = {
    headerStyle: globalStyles.screenHeader,
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <View style={globalStyles.drawerContainer}>
          <DrawerContentScrollView
            {...props}
            contentContainerStyle={globalStyles.drawerHeader}
          >
            <View>
              <Text style={globalStyles.drawerTitle}>Name</Text>
              <Text style={globalStyles.drawerTitle}>Level</Text>
            </View>
            <View style={globalStyles.drawerContainer}>
              <DrawerItemList {...props} />
            </View>
          </DrawerContentScrollView>
        </View>
      )}
    >
      <Drawer.Screen name="Profile" component={Profile} options={options} />
      <Drawer.Screen
        name="Exploration"
        component={Exploration}
        options={options}
      />
    </Drawer.Navigator>
  );
}
