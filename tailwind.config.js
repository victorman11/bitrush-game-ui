/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',

      'bitrush-neutral': {
        0: '#E9EAF0',
        100: '#C4C6CE',
        200: '#9FA1AD',
        300: '#7B7D8B',
        400: '#56586A',
        500: '#313448',
        600: '#272A3A',
        700: '#1D1F2B',
        800: '#14151D',
        850: '#0F0F15',
        900: '#0A0A0E',
      },
      'bitrush-blue': {
        100: '#CDEAFF',
        200: '#9BD5FF',
        300: '#6AC0FF',
        400: '#38ABFF',
        500: '#0696FF',
        600: '#0578CC',
        '600-opacity': 'rgba(5, 120, 204, 0.1)',
        700: '#045A99',
        800: '#023C66',
        900: '#011E33',
      },
      'bitrush-red': {
        100: '#FFD8D6',
        200: '#FFB1AC',
        300: '#FF8983',
        400: '#FF6259',
        500: '#FF3B30',
        600: '#CD2F26',
        700: '#9C231D',
        800: '#6A1813',
        900: '#390C0A',
      },
      'bitrush-green': {
        100: '#D6F4DE',
        200: '#AEE9BD',
        300: '#85DD9B',
        400: '#5DD27A',
        500: '#34C759',
        600: '#2A9F47',
        700: '#1F7735',
        800: '#155024',
        900: '#0A2812',
      },
      'bitrush-purple': {
        100: '#ECCDFF',
        200: '#D99BFF',
        300: '#C66AFF',
        400: '#B338FF',
        500: '#A006FF',
        600: '#8005CC',
        700: '#600499',
        800: '#400266',
        900: '#200133',
      },
      'bitrush-yellow': {
        100: '#FFF5E0',
        200: '#FFE7B3',
        300: '#FFD986',
        400: '#FFCA5A',
        500: '#FFBC2D',
        600: '#FFAE00',
        700: '#D28F00',
        800: '#A57100',
        850: '#a66a00',
        900: '#795200',
      },
    },
    extend: {
      boxShadow: {
        'glow-blue-modal': ['0px 0px 15px 1px rgba(6,150,255,1)'],
        'glow-blue-hovered': [
          '2px 2px 16px 1px rgba(6, 150, 255, 0.4)',
          '2px 2px 10px 2px rgba(6, 150, 255, 0.1)',
          'inset 0 0 10px 1px rgba(6, 150, 255, 0.4)',
        ],

        'glow-purple': [
          '2px 2px 10px 1px rgba(160, 6, 255, 0.2)',
          '2px 2px 10px 2px rgba(160, 6, 255, 0.1)',
          'inset 0 0 10px 1px rgba(160, 6, 255, 0.2)',
        ],

        'glow-purple-hovered': [
          '2px 2px 10px 1px rgba(160, 6, 255, 0.4)',
          '2px 2px 10px 2px rgba(160, 6, 255, 0.1)',
          'inset 0 0 10px 1px rgba(160, 6, 255, 0.4)',
        ],

        'glow-red-hovered': [
          '2px 2px 16px 1px rgba(247, 27, 20, 0.4)',
          '2px 2px 10px 2px rgba(247, 27, 20, 0.1)',
          'inset 0 0 10px 1px rgba(247, 27, 20, 0.4)',
        ],

        'glow-yellow': [
          '2px 2px 10px 1px rgba(255, 188, 45, 0.2)',
          '2px 2px 10px 2px rgba(255, 188, 45, 0.2)',
          'inset 0 0 10px 1px  rgba(255, 188, 45, 0.2);',
        ],
        'glow-yellow-hovered': [
          '2px 2px 10px 1px rgba(255, 188, 45, 0.4)',
          '2px 2px 10px 2px rgba(255, 188, 45, 0.2)',
          'inset 0 0 10px 1px  rgba(255, 188, 45, 0.4);',
        ],
      },
    },
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      h2: '1.125rem', // 18px
      h1: '1.25rem', // 20px
      title: '2.25rem', // 36px
      titleLg: '3rem', // 48px
      title2lg: '3.5rem', // 56px
    },
    screens: {
      // xs: { max: "639px" },
      // => @media (min-width: 640px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      // => @media (min-width: 1536px) { ... }
      '3xl': '2560px',
      // => @media (min-width: 1536px) { ... }
    },
    textShadow: {
      white:
        '0px 5px 10px rgba(255, 255, 255, 0.25), 0px 0px 20px rgba(255, 255, 255, 0.25)',
      green:
        '0px 5px 10px rgba(52, 199, 89, 0.40), 0px 0px 20px rgba(52, 199, 89, 0.40)',
      red: '0px 5px 10px rgba(255, 59, 48, 0.40), 0px 0px 20px rgba(255, 59, 48, 0.40)',
    },
  },

  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.typography-xs': {
          '@apply text-[12px] lg:text-xs 2xl:text-[0.6944vw]': '',
        },
        '.typography-sm': {
          '@apply text-[14px] lg:text-sm 2xl:text-[0.8333vw]': '',
        },
        '.typography-base': {
          '@apply text-[16px] lg:text-base 2xl:text-[0.9722vw]': '',
        },
        '.typography-h2': {
          '@apply text-[18px] lg:text-h2 2xl:text-[1.1111vw]': '',
        },
        '.typography-h1': {
          '@apply text-[20px] lg:text-h1 2xl:text-[1.25vw]': '',
        },
        '.typography-title': {
          '@apply text-[36px] lg:text-title 2xl:text-[2.36vw]': '',
        },
        '.typography-titleLg': {
          '@apply text-[48px] lg:text-titleLg 2xl:text-[3.05vw]': '',
        },
        '.typography-title2lg': {
          '@apply text-[56px] lg:text-title2lg 2xl:text-[3.75vw]': '',
        },
        '.icon-xs': {
          '@apply w-[1.2vh] h-[1.2vh]': '',
        },
        '.icon-sm': {
          '@apply w-[1.4vh] h-[1.4vh]': '',
        },
        '.icon-base': {
          '@apply w-[1.6vh] h-[1.6vh]': '',
        },
        '.icon-h2': {
          '@apply w-[1.8vh] h-[1.8vh]': '',
        },
        '.icon-h1': {
          '@apply w-[2vh] h-[2vh]': '',
        },
        '.icon-title': {
          '@apply w-[3.6vh] h-[3.6vh]': '',
        },
        '.icon-titleLg': {
          '@apply w-[4.8vh] h-[4.8vh]': '',
        },
        '.icon-title2lg': {
          '@apply w-[5.6vh] h-[5.6vh]': '',
        },
        '.gradient-card': {
          '@apply bg-gradient-to-r from-bitrush-neutral-700 to-bitrush-neutral-800':
            '',
        },
        '.gradient-primary': {
          '@apply bg-gradient-to-r from-bitrush-blue-800 to-bitrush-blue-900':
            '',
        },
        '.gradient-play': {
          '@apply bg-gradient-to-r from-bitrush-yellow-600 to-bitrush-yellow-700':
            '',
        },
        '.gradient-stop': {
          '@apply bg-gradient-to-r from-bitrush-purple-600 to-bitrush-purple-700':
            '',
        },
      })
    }),
    require('tailwindcss-textshadow'),
  ],
}
