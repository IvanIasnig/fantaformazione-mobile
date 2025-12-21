import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const shadows = StyleSheet.create({
  shadow: {
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: '10px',
        color: `${COLORS.BLACK}26`,
        inset: false,
      },
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: '2px',
        color: `${COLORS.BLACK}0D`,
        inset: true,
      },
    ],
  },
});
