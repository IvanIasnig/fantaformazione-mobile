import React, { memo, useMemo } from "react";
import { withTranslation } from "react-i18next";
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
import { TAB_BAR_NS } from "@src/translations/i18n.constants";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const PressableBottomTab = ({
  routeName,
  isFocused,
  t,
  ...props
}: PressableTabProps) => {
  const AnimatedIcon = useMemo(
    () => Animated.createAnimatedComponent(TAB_BAR_ICON_MAP[routeName]),
    [routeName],
  );

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(isFocused ? 1.1 : 1) }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: withTiming(isFocused ? COLORS.BLUE_PRIMARY : COLORS.BLACK, {
      duration: 200,
    }),
    opacity: withTiming(isFocused ? 1 : 0.6, { duration: 200 }),
  }));

  const animatedProps = useAnimatedProps(() => ({
    stroke: withTiming(isFocused ? COLORS.BLUE_PRIMARY : COLORS.BLACK, {
      duration: 200,
    }),
  }));

  return (
    <AnimatedPressable {...props} style={styles.routeContainer}>
      <Animated.View style={[styles.iconContainer, iconStyle]}>
        <AnimatedIcon animatedProps={animatedProps} />
      </Animated.View>

      <Animated.Text style={[styles.textStyle, textStyle]}>
        {t(routeName)}
      </Animated.Text>
    </AnimatedPressable>
  );
};

export default memo(withTranslation(TAB_BAR_NS)(PressableBottomTab));
