import { Typography } from "@src/styles/typography";
import { moderateScale } from "@src/utils/scaling";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Kept for potential usage or reference, though likely unused by the item itself
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  routeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScale(4),
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    ...Typography.openSansMedium,
    fontSize: moderateScale(10),
    textAlign: "center",
  },
});
