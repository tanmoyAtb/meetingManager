const styles = theme => ({
  container: {
    display: 'flex',
    flexFlow: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 24,
    overFlow: 'auto'
  },
  content: {
    marginTop: 16,
    width: '100%',
    maxWidth: 350
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  margin: {
    marginBottom: 12,
    marginTop: 12,
    width: '100%',
    maxWidth: 350
  },
  paperOverride: {
      display: 'flex',
      flexDirection: 'column',
      margin: 12,
      position: 'relative',
      overflowY: 'auto',
      // Fix IE11 issue, to remove at some point.
      // We disable the focus ring for mouse, touch and keyboard users.
      outline: 'none'
    }
    
});

export default styles;