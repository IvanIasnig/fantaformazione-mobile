import React, { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LayoutChangeEvent, Pressable, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import {
  PressableTabProps,
  TAB_BAR_ICON_MAP,
} from "./PressableBottomTab.models";
import styles from "./PressableBottomTab.styles";
import { COLORS } from "@src/styles/colors";

const ANIMATION_DURATION = 350;
const ANIMATION_DELAY = 150;

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

  const textWidth = useSharedValue(0);

  const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    if (textWidth.value) return;

    textWidth.value = nativeEvent.layout.width;
  };

  const pressableStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      isFocused ? `${COLORS.BLUE}FF` : `${COLORS.BLUE}00`,
      { duration: ANIMATION_DURATION },
    ),
  }));

  const textContainerStyle = useAnimatedStyle(() => ({
    width: withTiming(isFocused ? textWidth.value : 0, {
      duration: ANIMATION_DURATION,
    }),
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: withDelay(
      isFocused ? ANIMATION_DELAY : 0,
      withTiming(isFocused ? 1 : 0, { duration: ANIMATION_DURATION }),
    ),
  }));

  const animatedProps = useAnimatedProps(() => ({
    color: withTiming(isFocused ? COLORS.WHITE : COLORS.BLACK, {
      duration: ANIMATION_DURATION,
    }),
  }));

  return (
    <AnimatedPressable
      {...props}
      style={[styles.routeContainer, pressableStyle]}
    >
      <View style={styles.iconContainer}>
        <AnimatedIcon animatedProps={animatedProps} />
      </View>

      <Animated.View style={[styles.textContainer, textContainerStyle]}>
        <View style={styles.textWrapper} onLayout={onLayout}>
          <Animated.Text style={[styles.textStyle, textStyle]}>
            {t(`tabName.${routeName}`)}
          </Animated.Text>
        </View>
      </Animated.View>
    </AnimatedPressable>
  );
};

export default memo(PressableBottomTab);
