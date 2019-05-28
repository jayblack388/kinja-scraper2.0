import Color from 'color';

const border = Color('#ebebeb');
const danger = Color('#CC0000');
const dark = Color('#000');
const white = Color('#fff');
const primaryColor = Color('#0062ff');

const theme = {
  border: border.hex(),
  danger: danger.hex(),
  dark: dark.hex(),
  primaryColor: primaryColor.hex(),
  white: white.hex(),
  lightens: {
    border: border.lighten(0.15).hex(),
    danger: danger.lighten(0.15).hex(),
    dark: dark.lighten(0.15).hex(),
    primaryColor: primaryColor.lighten(0.15).hex(),
    white: white.lighten(0.15).hex(),
  },
  darkens: {
    border: border.darken(0.15).hex(),
    danger: danger.darken(0.15).hex(),
    dark: dark.darken(0.15).hex(),
    primaryColor: primaryColor.darken(0.15).hex(),
    white: white.darken(0.15).hex(),
  },
};

export default theme;
