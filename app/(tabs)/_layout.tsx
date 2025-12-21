import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale, moderateVerticalScale } from "@src/utils/scaling";
import { TAB_BAR_HEIGHT } from "@src/styles/dimensions";
import GlassContainer from "@src/components/GlassContainer/GlassContainer";
import PressableBottomTab from "@src/components/PressableBottomTab/PressableBottomTab";

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tabs>
      <TabSlot />
      <TabList asChild>
        <GlassContainer
          style={StyleSheet.flatten([
            {
              ...StyleSheet.absoluteFillObject,
              top: undefined,
              paddingVertical: moderateVerticalScale(10),
              paddingHorizontal: moderateScale(16),
              marginHorizontal: moderateScale(16),
              borderRadius: moderateScale(40),
              height: TAB_BAR_HEIGHT,
              bottom,
            },
          ])}
        >
          <TabTrigger name="index" href="/" asChild>
            <PressableBottomTab routeName="index" />
          </TabTrigger>
          <TabTrigger name="map" href="/" asChild>
            <PressableBottomTab routeName="map" />
          </TabTrigger>
          <TabTrigger name="ipiu" href="/" asChild>
            <PressableBottomTab routeName="ipiu" />
          </TabTrigger>
        </GlassContainer>
      </TabList>
    </Tabs>
  );
}
