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
              paddingVertical: moderateVerticalScale(8),
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
          <TabTrigger name="team" href="/team" asChild>
            <PressableBottomTab routeName="team" />
          </TabTrigger>
          <TabTrigger name="league" href="/league" asChild>
            <PressableBottomTab routeName="league" />
          </TabTrigger>
          <TabTrigger name="market" href="/market" asChild>
            <PressableBottomTab routeName="market" />
          </TabTrigger>
        </GlassContainer>
      </TabList>
    </Tabs>
  );
}
