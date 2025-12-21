import { STACK_OPTIONS } from "@src/navigation/config";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={STACK_OPTIONS}>
      <Stack.Screen name="(tabs)" options={{ animation: "fade" }} />
      {/* <Stack.Screen
        name="modal"
        options={{ presentation: "modal", title: "Modal" }}
      /> */}
    </Stack>
  );
}
