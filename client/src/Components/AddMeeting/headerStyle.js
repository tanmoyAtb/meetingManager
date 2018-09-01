const boxShadow = {
  boxShadow:
    "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
};

const styles = theme =>  ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  ash: {
    color: "#FFF",
    boxShadow: boxShadow
  },
  bar: {
    backgroundColor: '#3d81a9',
    color: '#FFF',
    padding: "0 20%",
    [theme.breakpoints.down("sm")]: {
      padding: "0 8px",
    }
  },
  btn: {
    [theme.breakpoints.down("sm")]: {
      padding: 8, minWidth: 36
    }
  }
});

export default styles;