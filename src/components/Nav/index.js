import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Material UI
import { withStyles, createStyleSheet } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

// Components
import UserChip from '../UserChip'

const styleSheet = createStyleSheet('Nav', theme => ({
  root: {
    marginTop: 100,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
}))

class Nav extends Component {
  render() {
    // Destructure Props
    const { user, toggleSignIn, classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <Typography type="title" color="inherit" className={classes.flex}>
              Tool Belt
            </Typography>
            <UserChip user={user} toggleSignIn={toggleSignIn} />
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styleSheet)(Nav)
