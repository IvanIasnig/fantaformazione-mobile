import { StyleSheet } from "react-native";

export const Typography = StyleSheet.create({
  openSansRegular: {
    fontFamily: "OpenSans-Regular",
    fontWeight: "400",
  },
  openSansMedium: {
    fontFamily: "OpenSans-Medium",
    fontWeight: "500",
  },
  openSansBold: {
    fontFamily: "OpenSans-Bold",
    fontWeight: "700",
  },

  // Usage Semantic Helpers (optional but good for consistency)
  body: {
    fontFamily: "OpenSans-Regular",
    fontSize: 16,
  },
  title: {
    fontFamily: "OpenSans-Bold",
    fontSize: 24,
  },
  subtitle: {
    fontFamily: "OpenSans-Medium",
    fontSize: 18,
  },
});
