import {
  StackNavigationOptions,
  createStackNavigator,
} from "@react-navigation/stack";
import { useCharacter } from "../../shared/CharacterContext";
import Menu from "./Menu";
import Blacksmith from "./Blacksmith";
import Leaderboard from "./Leaderboard";

export default function Home() {
  const { character } = useCharacter();
  if (!character) return;

  const { uid, name, level, exp, gold, inventory } = character;

  type ParamList = {
    Menu: undefined;
    Blacksmith: undefined;
    Leaderboard: undefined;
  };

  const Stack = createStackNavigator<ParamList>();

  const screenOptions: StackNavigationOptions = {
    headerStyle: { backgroundColor: "#00072D" },
    headerTitleStyle: { color: "lightgray", fontSize: 30 },
    headerTintColor: "white",
  };

  return (
    <Stack.Navigator screenOptions={{ animationEnabled: false }}>
      <Stack.Screen name="Menu" component={Menu} options={screenOptions} />
      <Stack.Screen
        name="Blacksmith"
        component={Blacksmith}
        options={screenOptions}
      />
      <Stack.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
}
