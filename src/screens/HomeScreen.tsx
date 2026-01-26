import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "@src/styles/colors";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dashboard</Text>
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
