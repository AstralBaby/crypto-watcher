import { createTheme } from '@material-ui/core/styles';

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
    props: {
        MuiTextField: {
            variant: 'outlined',
            InputLabelProps: {shrink: false}
        }
    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'none', // removes uppercase transformation
                backgroundColor: '#2563eb',
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                    backgroundColor: '#3b82f6'
                },
                '&:active': {
                    backgroundColor: '#1d4ed8'
                }
            },
        },
        MuiTextField: {
            root: {
                '& input + fieldset': {
                    borderColor: '#e2e8f0',
                    borderWidth: 2,
                },
                '& input:valid:hover + fieldset': {
                    borderColor: '#3b82f6',
                    borderWidth: 2,
                },
                '& input:valid:focus + fieldset': {
                    borderColor: '#3b82f6',
                    borderWidth: 2,
                },
            }
        },
    },
});

export default theme;