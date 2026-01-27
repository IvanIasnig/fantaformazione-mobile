import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  PressableTabProps,
  TAB_BAR_ICON_MAP,
} from "./PressableBottomTab.models";
import styles from "./PressableBottomTab.styles";
import { COLORS } from "@src/styles/colors";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const PressableBottomTab = ({
  routeName,
  isFocused,
  ...props
}: PressableTabProps) => {
  const { t } = useTranslation();

  const AnimatedIcon = useMemo(
    () => Animated.createAnimatedComponent(TAB_BAR_ICON_MAP[routeName]),
    [routeName],
  );

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(isFocused ? 1.1 : 1) }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: withTiming(isFocused ? COLORS.BLUE : COLORS.BLACK, {
      duration: 200,
    }),
    opacity: withTiming(isFocused ? 1 : 0.6, { duration: 200 }),
  }));

  const animatedProps = useAnimatedProps(() => ({
    color: withTiming(isFocused ? COLORS.BLUE : COLORS.BLACK, {
      duration: 200,
    }),
  }));

  return (
    <AnimatedPressable {...props} style={styles.routeContainer}>
      <Animated.View style={[styles.iconContainer, iconStyle]}>
        <AnimatedIcon animatedProps={animatedProps} />
      </Animated.View>

      <Animated.Text style={[styles.textStyle, textStyle]}>
        {t(`tabName.${routeName}`)}
      </Animated.Text>
    </AnimatedPressable>
  );
};

export default memo(PressableBottomTab);
