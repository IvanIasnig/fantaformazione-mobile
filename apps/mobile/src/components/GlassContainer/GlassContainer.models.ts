import { PropsWithChildren } from "react";
import { ViewProps } from "react-native";

export interface GlassContainerProps extends PropsWithChildren<ViewProps> {
  intensity?: number;
  shadows?: boolean;
  background?: boolean;
}
