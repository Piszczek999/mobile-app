import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MyButton from "../../shared/MyButton";
import Tile from "../../shared/Tile";
import { globalStyles } from "../../styles/global";

export default function Menu({ navigation }: any) {
  return (
    <Tile style={globalStyles.container}>
      <View style={{ flex: 1, gap: 10 }}>
        <MyButton onPress={() => navigation.navigate("Blacksmith")}>
          <MCIcon name="anvil" size={30} />
          {" Blacksmith"}
        </MyButton>
        <MyButton onPress={() => navigation.navigate("Leaderboard")}>
          <Icon name="trophy" size={30} />
          {" Leaderboard"}
        </MyButton>
        <MyButton>
          <Icon name="shopping-basket" size={25} />
          {" Shop"}
        </MyButton>
      </View>
    </Tile>
  );
}
