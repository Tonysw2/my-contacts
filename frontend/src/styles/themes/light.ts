import { common } from './common'

export const light = {
  ...common,

  colors: {
    background: '#F6F5FC',

    primary: {
      lightest: '#E0E3FF',
      light: '#6674F4',
      main: '#5061FC',
      dark: '#3346F0',
    },

    success: {
      main: '#51CA73',
    },

    danger: {
      light: '#F97171',
      main: '#FC5050',
      dark: '#F63131',
    },

    gray: {
      '100': '#FFFFFF',
      '200': '#E6E6E6',
      '300': '#BCBCBC',
      '400': '#7A7A7A',
      '500': '#222222',
    },
  },
}
