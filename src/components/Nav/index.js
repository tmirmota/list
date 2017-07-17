import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// Material UI
import { withStyles, createStyleSheet } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

// Components
import UserChip from '../UserChip'

const styleSheet = createStyleSheet('Nav', theme => ({
  flex: {
    flex: 1,
    paddingLeft: 5,
  },
}))

class Nav extends Component {
  render() {
    // Destructure Props
    const { user, toggleSignIn, classes } = this.props

    // Check if user is signed-in
    const isSignedIn = user !== null

    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <Typography type="title" color="inherit" className={classes.flex}>
              Tool Belt
            </Typography>

            {/* Return login button if user is not signed-in */}
            {!isSignedIn &&
              <Button color="contrast" onClick={toggleSignIn}>
                Login
              </Button>}

            {isSignedIn && <UserChip user={user} toggleSignIn={toggleSignIn} />}
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
