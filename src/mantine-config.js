export const theme = {
  components: {
    Button: {
      styles: (theme, params) => ({
        root: {
          backgroundColor:
            params.variant === 'filled'
              ? theme.colors[params.color || theme.primaryColor][9]
              : undefined,
          '&:hover': { backgroundColor: params.variant === 'filled'
              ?'#135145':'transparent'
            }
        },
      }),
    },
  },
}