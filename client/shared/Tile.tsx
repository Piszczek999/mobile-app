import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import React from "react";

export type TileProps = {
  colors?: string[];
  children?: React.ReactNode;
} & Omit<LinearGradientProps, "colors">; // all props except colors

export default function Tile({
  colors = ["#444", "#333"],
  children,
  ...props
}: TileProps) {
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      colors={colors}
      {...props}
    >
      {children}
    </LinearGradient>
  );
}
