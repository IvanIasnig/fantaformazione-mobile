import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { COLORS } from "../styles/colors";

export const MODALS_OPTIONS: NativeStackNavigationOptions = {
  presentation: "modal",
  animation: undefined,
  headerShown: false,
};

export const STACK_OPTIONS: NativeStackNavigationOptions = {
  headerShown: false,
  contentStyle: {
    backgroundColor: COLORS.WHITE,
  },
};
