import { radiantLightTheme } from 'ra-ui-materialui';
import { alpha, createTheme } from '@mui/material';

export const palette = {
    primary: {
        main: '#ac8239', shadows: [
            alpha('#ac8239', 0.2),
            alpha('#ac8239', 0.1),
            alpha('#ac8239', 0.05),
        ],
    },
    secondary: {
        main: '#7094cc', shadows: [
            alpha('#7094cc', 0.2),
            alpha('#7094cc', 0.1),
            alpha('#7094cc', 0.05),
        ],
    },
    third: { main: '#6b7b8e' },
    text: { primary: '#000000', secondary: 'white' },

};


export const customTheme = createTheme({
    ...radiantLightTheme,
    sidebar: {
        width: 200,
        closedWidth: 200,
    },
    palette: {
        primary: { main: palette.primary.main },
        secondary: { main: palette.secondary.main },
        text: { primary: palette.text.primary },
    },
    components: {
        ...radiantLightTheme.components,
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.MuiButton-outlined.MuiButton-outlinedPrimary.MuiButton-sizeSmall.MuiButton-outlinedSizeSmall.MuiButton-colorPrimary.RaEditButton-root': {
                        backgroundColor: palette.primary.main,
                    },
                },
            },
        },
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    '&.MuiMenuItem-root.MuiMenuItem-gutters.RaMenuItemLink-active': {
                        borderRadius: '0px 100px 100px 0px',
                        backgroundImage: `linear-gradient(98deg, ${palette.primary.main}, ${palette.primary.main} 99%)`,
                        boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
                        color: '#fff',
                    },
                    '&.MuiMenuItem-root.MuiMenuItem-gutters': {
                        borderLeft: 'transparent',
                        color: 'black',
                    },
                    '&.MuiTableSortLabel-root': {
                        color: palette.primary.main,
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    '&.MuiTableCell-head.MuiTableCell-sizeSmall.RaDatagrid-headerCell': {
                        color: palette.primary.main,
                    },
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    '&.MuiSvgIcon-fontSizeMedium': {
                        color: 'black',
                    },
                },
            },
        },
    },
});
