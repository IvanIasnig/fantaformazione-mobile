import { COLORS } from '@src/styles/colors';
import { TAB_BAR_HEIGHT } from '@src/styles/dimensions';
import { Typography } from '@src/styles/typography';
import { moderateScale, moderateVerticalScale } from '@src/utils/scaling';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  tabBar: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    paddingVertical: moderateVerticalScale(10),
    paddingHorizontal: moderateScale(16),
    marginHorizontal: moderateScale(16),
    borderRadius: moderateScale(40),
    height: TAB_BAR_HEIGHT,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateVerticalScale(8),
    paddingHorizontal: moderateScale(8),
    borderRadius: moderateScale(40),
  },
  iconContainer: {
    height: moderateVerticalScale(24),
    aspectRatio: 1 / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: { alignItems: 'center', flexDirection: 'row' },
  textStyle: {
    color: COLORS.WHITE,
    marginLeft: moderateScale(4),
    ...Typography.dmSansMedium,
    fontSize: moderateScale(14),
  },
  textWrapper: { position: 'absolute' },
});
