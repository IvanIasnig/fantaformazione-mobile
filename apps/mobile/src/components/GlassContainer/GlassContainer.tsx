import { BlurView } from "expo-blur";
import React, { memo } from "react";
import { Platform, StyleSheet, View } from "react-native";
import styles from "./GlassContainer.styles";
import { GlassContainerProps } from "./GlassContainer.models";

const GlassContainer = ({
  children,
  style,
  intensity = 40,
  shadows = true,
  background = true,
  ...props
}: GlassContainerProps) => {
  const containerStyle = StyleSheet.flatten([
    styles.container,
    shadows && styles.shadows,
    background && styles.background,
    style,
  ]);

  if (Platform.OS === "ios")
    return (
      <BlurView
        {...props}
        style={containerStyle}
        intensity={intensity}
        tint="extraLight"
      >
        {children}
      </BlurView>
    );

  return (
    <View {...props} style={containerStyle}>
      {children}
    </View>
  );
};

export default memo(GlassContainer);
