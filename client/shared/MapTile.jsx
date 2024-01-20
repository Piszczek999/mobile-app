import { ImageBackground, Text, View } from "react-native";

export default function MapTile({ title, src, minLevel, characterLevel }) {
  return (
    <ImageBackground
      imageStyle={{ height: 100, borderRadius: 20 }}
      source={src}
      style={{ height: 100 }}
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
            color: characterLevel < minLevel ? "red" : "lightgray",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {minLevel} lv
        </Text>
        <Text style={{ color: "lightgray", fontSize: 30 }}>{title}</Text>
      </View>
    </ImageBackground>
  );
}
