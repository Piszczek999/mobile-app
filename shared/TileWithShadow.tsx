import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Shadow } from "react-native-shadow-2";
import { TileProps } from "./Tile";

export default function TileWithShadow({
  colors = ["#444", "#333"],
  children,
  ...props
}: TileProps) {
  return (
    <Shadow startColor="#0005" offset={[2, 2]} stretch distance={3}>
      <LinearGradient
        start={{ x: 0.0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        colors={colors}
        {...props}
      >
        {children}
      </LinearGradient>
    </Shadow>
  );
}
