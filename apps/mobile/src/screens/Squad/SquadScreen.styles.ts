import { StyleSheet } from "react-native";
import { COLORS } from "@src/styles/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.WHITE,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.BLACK,
  },
});
