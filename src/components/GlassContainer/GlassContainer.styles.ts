import { COLORS } from "@src/styles/colors";
import { shadows } from "@src/styles/shadows";
import { Platform, StyleSheet } from "react-native";

const isIOS = Platform.OS === "ios";

export default StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  shadows: shadows.shadow,
  background: {
    backgroundColor: `${COLORS.WHITE}${isIOS ? "59" : "FF"}`,
  },
});
