const styles = theme =>  ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexFlow: 'column',
    padding: "8px 20%",
    marginTop: 12,
    [theme.breakpoints.down("sm")]: {
      padding: "8px 12px",
    }
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  btn: {
    [theme.breakpoints.down("sm")]: {
      padding: 8, minWidth: 36
    }
  },
  button: {
    marginBottom: 16
  },
  label: {
    fontSize: 30,
    color: "#263238",
    position: 'relative'
  }
});

export default styles;

