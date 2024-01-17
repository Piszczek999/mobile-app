import { ImageBackground, Text, View } from "react-native";
import { globalStyles } from "../styles/global";

export default function Exploration({ route }) {
  return (
    <View style={globalStyles.container}>
      <ImageBackground
        imageStyle={{ height: 100, borderRadius: 20 }}
        source={require("../assets/plains.png")}
        style={{ margin: 10, height: 100 }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            borderWidth: 3,
            borderRadius: 20,
            borderColor: "#00072D",
            paddingHorizontal: 5,
          }}
        >
          <Text
            style={{
              textAlign: "right",
              color: "lightgray",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            1-30 lv
          </Text>
          <Text style={{ color: "lightgray", fontSize: 30 }}>Plains</Text>
        </View>
      </ImageBackground>
    </View>
  );
}
