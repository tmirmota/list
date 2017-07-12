import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Material UI
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import BottomNavigation, {
  BottomNavigationButton,
} from 'material-ui/BottomNavigation'

import FavoriteIcon from 'material-ui-icons/Favorite'

const stylesheet = createStyleSheet({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
})

class Footer extends Component {
  render() {
    const { classes } = this.props
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <BottomNavigation showlabels>
            <BottomNavigationButton label="Favorite" icon={<FavoriteIcon />} />
          </BottomNavigation>
        </Grid>
      </Grid>
    )
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(stylesheet)(Footer)
