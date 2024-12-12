import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#4ECDC4',
        },
        secondary: {
            main: '#666f73',
            light: '#f8f8f8',
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'contained'
            },
            styleOverrides: {
                root: {
                    padding: '8px 24px',
                    textTransform: 'none', 
                }
            }
        },
        MuiContainer: {
            defaultProps: {
                maxWidth: 'lg',
            },
        },
    },
    typography: {
        body1: {
            color: '#0B1134CC',
            fontFamily: '"Quicksand", sans-serif',
        },
    },
    
});
theme.shadows[1] = '0px 5px 22px lightgray';