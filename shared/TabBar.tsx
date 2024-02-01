import { Pressable, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export type TabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

export default function TabBar({
  state,
  descriptors,
  navigation,
}: TabBarProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {state.routes.map((route: any, index: number) => {
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
            navigation.navigate(route.name, route.params?.user);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
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
              <Icon name={route.params?.icon} size={35} />
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
