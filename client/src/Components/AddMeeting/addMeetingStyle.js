const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexFlow: 'column',
    padding: "8px",
    marginTop: 12,
    [theme.breakpoints.down("sm")]: {
      padding: "8px",
    }
  },
  spacing: {
  	marginTop: 30
  },
  label: {
  	fontSize: 30,
  	color: "#263238",
  	position: 'relative'
  },
  input: {
  	marginTop: 0,
  },
  focus: {
  	color: '#263238'
  }
});

export default styles;