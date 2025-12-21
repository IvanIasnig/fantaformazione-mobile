import { TabTriggerSlotProps } from "expo-router/ui";
import { SvgProps } from "react-native-svg";
import Home from "@assets/icons/tabBar/home.svg";

type TAB_ROUTES = "index";

export interface PressableTabProps extends TabTriggerSlotProps {
  routeName: TAB_ROUTES;
}

export const TAB_BAR_ICON_MAP: Record<TAB_ROUTES, React.FC<SvgProps>> = {
  index: Home,
};
