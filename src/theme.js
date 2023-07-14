import { extendTheme } from '@chakra-ui/react';

const colors = {
    "black": "#0c1015",
    "gray": {
      "50": "#f9fafa",
      "100": "#f1f1f2",
      "200": "#e6e7e9",
      "300": "#d2d4d7",
      "400": "#a9adb2",
      "500": "#797f88",
      "600": "#4d5560",
      "700": "#2e3744",
      "800": "#19202b",
      "900": "#141a23"
    },
    "purple": {
      "50": "#f9f6fd",
      "100": "#e5daf8",
      "200": "#d3bef4",
      "300": "#b795ec",
      "400": "#a379e7",
      "500": "#8952e0",
      "600": "#7434db",
      "700": "#6023c0",
      "800": "#4f1d9e",
      "900": "#3b1676"
    },
    "pink": {
      "50": "#fdf5f9",
      "100": "#f8d9e7",
      "200": "#f3b9d3",
      "300": "#eb8db8",
      "400": "#e56ba2",
      "500": "#dc3882",
      "600": "#c4246c",
      "700": "#a01d58",
      "800": "#7d1745",
      "900": "#5d1133"
    },
    "red": {
      "50": "#fdf6f5",
      "100": "#f8d9d7",
      "200": "#f2b7b4",
      "300": "#ea8c87",
      "400": "#e5726b",
      "500": "#dd4840",
      "600": "#c72d25",
      "700": "#a1241e",
      "800": "#891f19",
      "900": "#641712"
    },
    "orange": {
      "50": "#fdfaf6",
      "100": "#f9ebdb",
      "200": "#f1d4b1",
      "300": "#e6b273",
      "400": "#dc9239",
      "500": "#c37b24",
      "600": "#a5681e",
      "700": "#835318",
      "800": "#674113",
      "900": "#553610"
    },
    "yellow": {
      "50": "#fefefc",
      "100": "#fbf9ea",
      "200": "#f4eec2",
      "300": "#ece192",
      "400": "#dfce4b",
      "500": "#bba922",
      "600": "#95871c",
      "700": "#746915",
      "800": "#574f10",
      "900": "#48410d"
    },
    "green": {
      "50": "#f5fdf9",
      "100": "#c6f5e0",
      "200": "#83e9bb",
      "300": "#28d889",
      "400": "#23bd78",
      "500": "#1ea367",
      "600": "#198755",
      "700": "#136942",
      "800": "#105636",
      "900": "#0d472d"
    },
    "teal": {
      "50": "#f1fcfc",
      "100": "#c0f1f4",
      "200": "#84e4e9",
      "300": "#2dd1da",
      "400": "#22b2ba",
      "500": "#1d979e",
      "600": "#187b80",
      "700": "#125f64",
      "800": "#0f5053",
      "900": "#0d4244"
    },
    "cyan": {
      "50": "#f4fbfd",
      "100": "#d0eef7",
      "200": "#bae7f3",
      "300": "#a2deee",
      "400": "#53c2e1",
      "500": "#2ab4d9",
      "600": "#24a2c4",
      "700": "#1e86a2",
      "800": "#196e85",
      "900": "#135567"
    },
    "blue": {
      "50": "#f1f6fd",
      "100": "#cde0f6",
      "200": "#a8c8f0",
      "300": "#7fafe8",
      "400": "#5896e1",
      "500": "#347fdb",
      "600": "#236abf",
      "700": "#1b5192",
      "800": "#164278",
      "900": "#123662"
    },
    "primary": {
      "50": "#f9f6fd",
      "100": "#e7dbf9",
      "200": "#d2bcf3",
      "300": "#b896ec",
      "400": "#a980e9",
      "500": "#9461e3",
      "600": "#8145de",
      "700": "#6926d0",
      "800": "#5921b1",
      "900": "#411881"
    }
  }

const theme = extendTheme({
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'normal',
        borderRadius: 'md',
      },
      variants: {
        solid: (props) => ({
          bg: props.colorMode === 'light' ? 'purple.400' : 'purple.600',
          color: colors.gray[50],
          _hover: {
            bg: props.colorMode === 'light' ? 'purple.200' : 'purple.400',
          },
          borderRadius: 'md',
        }),
      },
    },
    Heading: {
      baseStyle: (props) => ({
        color: props.colorMode === 'light' ? 'gray.800' : colors.gray[50],
      }),
    },
    Link: {
      baseStyle: (props) => ({
        color: props.colorMode === 'light' ? 'primary.100' : 'primary.300',
        _hover: {
          textDecoration: 'underline',
        },
      }),
    },
    Input: {
      baseStyle: {
        field: {
          borderColor: 'primary.100',
          _focus: {
            borderColor: 'primary.200',
          },
        },
      },
    },
    Modal: {
        baseStyle: (props) => ({
          dialog: {
            bg: props.colorMode === 'light' ? colors.gray[50] : colors.black,
            color: props.colorMode === 'light' ? colors.gray[800] : colors.gray[50],
            borderColor: props.colorMode === 'light' ? colors.gray[200] : colors.purple[100],
          },
        }),
      },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'light' ? colors.gray[50] : colors.black,
        color: props.colorMode === 'light' ? colors.gray[800] : colors.gray[50],
      },
    }),
  },
});

export default theme;
