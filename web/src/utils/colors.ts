// #65676B


export const colorDefinitions = {
    shadowBlue: 'rgba(74,116,161,0.29)',
    grey900Transparent: 'rgba(34,34,34, .2)',
    grey900Transparent8: 'rgba(34,34,34, .8)',

    // Grey
    grey100: '#fbfbfb',
    grey200: '#f2f2f2',
    grey300: '#cccccc',
    grey400: '#a0a0a0',
    grey500: '#6e6e6e',
    grey600: '#5e5e5e',
    grey700: '#4e4e4e',
    grey800: '#303030',
    grey900: '#222222',

    // Green
    green100: '#f3fff9',
    green200: '#d9ffeb',
    green300: '#40ff9f',
    green400: '#00f37a',
    green500: '#00d066',
    green600: '#00a552',
    green700: '#007a3d',
    green800: '#014f26',

    // Red
    red100: '#fff5f5',
    red200: '#ffe0e0',
    red300: '#ff6666',
    red400: '#ff3333',
    red500: '#e41717',
    red600: '#bf1313',

    // Orange
    orange100: '#fff7eb',
    orange200: '#ffedd0',
    orange300: '#ffd06b',
    orange400: '#ffb84d',
    orange500: '#ff9b00',
    orange600: '#dd8804',

    // // Blue
    // blue100: '#edf8ff',
    // blue200: '#d4eeff',
    // blue300: '#73c7ff',
    // blue400: '#40b2ff',
    // blue500: '#0099ff',
    // blue600: '#0082d9',

    // Blue
    blue100: '#0088ff',
    blue200: '#006ed4',
    blue300: '#0059b0',
    blue400: '#004488',
    blue500: '#002041',
    bluegreen: '#61BD4F',

};

export const colorAliases = {
    core: colorDefinitions.blue300,
    secondary: colorDefinitions.grey700,
    lightGrey: colorDefinitions.grey200,
    coreGray: colorDefinitions.grey300,
    iconCore: colorDefinitions.blue300,
    shadowCore: colorDefinitions.grey900Transparent,
    linearGradeBlue: `linear-gradient(135deg, ${colorDefinitions.blue100}, ${colorDefinitions.blue500})`,
    navbarBackground: '#fff',
    iconSecondary: colorDefinitions.grey700,
    darkGrey: colorDefinitions.grey400,
    black: colorDefinitions.grey900,
    green: colorDefinitions.green500,
    red: colorDefinitions.red400,
    orange: colorDefinitions.orange500,
    // blue: colorDefinitions.blue500,
};

export const colors = {
    ...colorDefinitions,
    ...colorAliases,
};
