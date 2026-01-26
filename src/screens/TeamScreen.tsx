import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@src/styles/colors";

export default function TeamScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>La Mia Rosa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
