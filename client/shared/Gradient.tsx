import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import { StyleProp, ViewStyle } from "react-native";

type Props = {
  colors?: string[];
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
} & Omit<LinearGradientProps, "colors">; // all props except colors

export default function Gradient({
  colors = ["#444", "#333"],
  style,
  children,
  ...props
}: Props) {
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      colors={colors}
      style={[style, { elevation: 5 }]}
      {...props}
    >
      {children}
    </LinearGradient>
  );
}
