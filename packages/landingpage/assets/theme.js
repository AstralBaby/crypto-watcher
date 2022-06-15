import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: "#FFFFFF"
        },
        secondary: {
            main: "#000000"
        },
        text: {
            primary: '#0f172a',
            secondary: '#334155'
        }
    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'none', // removes uppercase transformation
                backgroundColor: '#2563eb',
                color: 'white',
                '&:hover': {
                    backgroundColor: '#3b82f6'
                },
                '&:active': {
                    backgroundColor: '#1d4ed8'
                }
            },
        },
    },
});

export default theme;