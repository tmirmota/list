import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Material UI
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import BottomNavigation, {
  BottomNavigationButton,
} from 'material-ui/BottomNavigation'

import FavoriteIcon from 'material-ui-icons/Favorite'

const styles = {
  footer: {
    position: 'absolute',
    bottom: 0,
  },
}

const styleSheet = createStyleSheet({
  root: {
    flexGrow: 1,
    marginTop: 30,
    position: 'absolute',
    bottom: 0,
  },
})

class Footer extends Component {
  render() {
    const { classes } = this.props
    return (
      <footer style={styles.footer}>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            This is the footer
          </Grid>
        </Grid>
      </footer>
    )
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styleSheet)(Footer)
