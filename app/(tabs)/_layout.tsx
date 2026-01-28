import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui";
import { HOME, TEAM, LEAGUE, MARKET } from "@src/navigation/routes";
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
          <TabTrigger name="index" href={HOME} asChild>
            <PressableBottomTab routeName="index" />
          </TabTrigger>
          <TabTrigger name="team" href={TEAM} asChild>
            <PressableBottomTab routeName="team" />
          </TabTrigger>
          <TabTrigger name="league" href={LEAGUE} asChild>
            <PressableBottomTab routeName="league" />
          </TabTrigger>
          <TabTrigger name="market" href={MARKET} asChild>
            <PressableBottomTab routeName="market" />
          </TabTrigger>
        </GlassContainer>
      </TabList>
    </Tabs>
  );
}
