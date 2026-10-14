import Constants from "expo-constants";
import { Dimensions } from "react-native";
import { moderateVerticalScale } from "../utils/scaling";

export const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

export const BOTTOM_SPACE = moderateVerticalScale(24);
export const TOP_SPACE = moderateVerticalScale(8);

export const DEFAULT_SCREEN_MARGIN = 24;

export const DEFAULT_HIT_SLOP = moderateVerticalScale(16);

export const WINDOW_DIMENSIONS = Dimensions.get("window");

export const WINDOW_WIDTH = WINDOW_DIMENSIONS.width;

export const WINDOW_HEIGHT = WINDOW_DIMENSIONS.height;

export const ASPECT_RATIO = WINDOW_DIMENSIONS.width / WINDOW_DIMENSIONS.height;

export const TAB_BAR_HEIGHT = moderateVerticalScale(60);
export const TAB_BAR_SCROLLVIEW_OFFSET = moderateVerticalScale(40);
export const SCROLLVIEW_PADDING_BOTTOM =
  TAB_BAR_HEIGHT + TAB_BAR_SCROLLVIEW_OFFSET;
