import { TabTriggerSlotProps } from "expo-router/ui";
import { SvgProps } from "react-native-svg";
import Squad from "@assets/icons/tabBar/ball.svg";
import Profile from "@assets/icons/tabBar/team.svg";
import Market from "@assets/icons/tabBar/substitution.svg";
import { WithTranslation } from "react-i18next";

type TAB_ROUTES = "index" | "market" | "profile";

export interface PressableTabProps
  extends TabTriggerSlotProps, WithTranslation {
  routeName: TAB_ROUTES;
}

export const TAB_BAR_ICON_MAP: Record<TAB_ROUTES, React.FC<SvgProps>> = {
  index: Squad,
  market: Market,
  profile: Profile,
};
