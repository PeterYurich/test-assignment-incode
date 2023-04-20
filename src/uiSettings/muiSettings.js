const palette = {
    type: 'light',
    primary: {
        main: '#432263',
    },
    secondary: {
        main: '#FFFFFF',
        contrastText: '#000000',
    },
    background: {
        default: '#f6f5f7',
        paper: '#FFFFFF',
    },
    warning: {
        main: '#ff1800',
    },
    info: {
        main: '#3091EB',
    },
    text: {
        primary: '#000',
        secondary: '#535353',
        contrast: '#FFFFFF',
        hint: 'rgba(0,0,0,0.39)',
        label: 'rgba(17, 17, 17, 0.6)',
    },
};

export const ThemeOptions = {
    palette,
    typography: {
        fontFamily: 'Chivo Mono',
        fontSize: 16,
        body1: {
            fontWeight: 300,
        },
        subtitle1: {
            fontWeight: 600,
            fontSize: 16,
            lineHeight: 1.35,
            marginBottom: 15,
        },

        h5: {
            fontSize: 20,
            fontWeight: 700,
            lineHeight: 1.35,
            marginBottom: 15
        },
        button: {
            fontSize: 20,
            lineHeight: 1.37,
            borderRadius: 20,
            textTransform: 'capitalize',
            margin: 4,
            hover: {
                backgroundColor: palette.primary.main,
                color: palette.secondary.main,
            },
        },
    },
    shape: {
        borderRadius: 3,
    },
    
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'outlined' },
                    style: {
                        height: 50,
                        border: `2px solid ${palette.primary.main}`,
                        backgroundColor: palette.background.paper,
                        color: palette.text.primary,
                        '&:hover': {
                            backgroundColor: palette.primary.main,
                            border: `2px solid ${palette.primary.main}`,
                            color: palette.text.contrast,
                        },
                    },
                },
            ],
        },
    },
};