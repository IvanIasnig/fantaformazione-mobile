import { TabTriggerSlotProps } from "expo-router/ui";
import { SvgProps } from "react-native-svg";
import Home from "@assets/icons/tabBar/home.svg";
import Team from "@assets/icons/tabBar/team.svg";
import League from "@assets/icons/tabBar/league.svg";
import Market from "@assets/icons/tabBar/market.svg";
import { WithTranslation } from "react-i18next";

type TAB_ROUTES = "index" | "team" | "league" | "market";

export interface PressableTabProps
  extends TabTriggerSlotProps, WithTranslation {
  routeName: TAB_ROUTES;
}

export const TAB_BAR_ICON_MAP: Record<TAB_ROUTES, React.FC<SvgProps>> = {
  index: Home,
  team: Team,
  league: League,
  market: Market,
};
