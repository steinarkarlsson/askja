import '@jucy/appearance';
import { defaultThemeOptions } from '@jucy/appearance';
import { createTheme as muiCreateTheme, PaletteOptions } from '@mui/material';

export const theme = muiCreateTheme({
    ...defaultThemeOptions,
    components: {
        ...defaultThemeOptions.components,
    },
    palette: {
        ...(defaultThemeOptions.palette as PaletteOptions),
    },
});
