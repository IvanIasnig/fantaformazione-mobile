import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated";
import { styles } from "./FFTextInput.styles";
import { COLORS } from "@src/styles/colors";
import { moderateVerticalScale } from "@src/utils/scaling";

interface FFTextInputProps extends Omit<TextInputProps, "style"> {
  label: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
}

const ANIMATION_CONFIG: WithTimingConfig = {
  duration: 200,
};

const FFTextInput: React.FC<FFTextInputProps> = ({
  label,
  value,
  onChangeText,
  error,
  style,
  onFocus,
  onBlur,
  placeholder,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animation = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    const isActive = isFocused || (value && value.length > 0);
    if (isActive) {
      animation.value = withTiming(1, ANIMATION_CONFIG);
    } else {
      animation.value = withTiming(0, ANIMATION_CONFIG);
    }
  }, [Boolean(value), isFocused]);

  const handleFocus = (e: Parameters<NonNullable<typeof onFocus>>[0]) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: Parameters<NonNullable<typeof onBlur>>[0]) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const topInactive = moderateVerticalScale(18);
  const topActive = moderateVerticalScale(-8);
  const activeColor = error ? COLORS.ERROR : COLORS.BLUE_PRIMARY;
  const inactiveColor = error ? COLORS.ERROR : COLORS.GRAY_MEDIUM;

  const animatedLabelStyle = useAnimatedStyle(() => {
    return {
      top: interpolate(animation.value, [0, 1], [topInactive, topActive]),
      fontSize: interpolate(animation.value, [0, 1], [16, 12]),
      color: interpolateColor(
        animation.value,
        [0, 1],
        [inactiveColor, activeColor],
      ),
    };
  });

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          !!error && styles.inputContainerError,
        ]}
      >
        <Animated.Text
          style={[styles.label, animatedLabelStyle]}
          pointerEvents="none"
        >
          {label}
        </Animated.Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor="transparent"
          {...props}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default FFTextInput;
