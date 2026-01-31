import { StyleSheet } from "react-native";
import { COLORS } from "@src/styles/colors";
import { Typography } from "@src/styles/typography";
import { moderateScale, moderateVerticalScale } from "@src/utils/scaling";

export const styles = StyleSheet.create({
  container: {
    marginBottom: moderateVerticalScale(16),
  },
  inputContainer: {
    height: moderateVerticalScale(56),
    borderWidth: 1,
    borderRadius: moderateScale(12),
    borderColor: COLORS.GRAY_MEDIUM,
    justifyContent: "center",
    paddingHorizontal: moderateScale(16),
    backgroundColor: COLORS.WHITE,
  },
  inputContainerError: {
    borderColor: COLORS.ERROR,
  },
  inputContainerFocused: {
    borderColor: COLORS.BLUE_PRIMARY,
    borderWidth: 1.5,
  },
  input: {
    ...Typography.openSansRegular,
    fontSize: moderateScale(16),
    color: COLORS.BLACK,
  },
  label: {
    position: "absolute",
    left: moderateScale(16),
    ...Typography.openSansRegular,
    color: COLORS.GRAY_MEDIUM,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: moderateScale(4),
    zIndex: 1,
  },
  errorText: {
    ...Typography.openSansRegular,
    fontSize: moderateScale(12),
    color: COLORS.ERROR,
    marginTop: moderateVerticalScale(4),
    marginLeft: moderateScale(4),
  },
});
