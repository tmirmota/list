import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// Material UI
import { withStyles, createStyleSheet } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'

// Material UI Icons
import Add from 'material-ui-icons/Add'
import Clear from 'material-ui-icons/Clear'
import Build from 'material-ui-icons/Build'

// Components
import UserChip from '../UserChip'

const styleSheet = createStyleSheet('Nav', theme => ({
  root: {
    marginTop: 100,
    width: '100%',
  },
  flex: {
    flex: 1,
    paddingLeft: 5,
  },
  button: {
    margin: theme.spacing.unit,
  },
}))

class Nav extends Component {
  render() {
    // Destructure Props
    const { user, toggleSignIn, classes } = this.props

    // Check if user is signed-in
    const isSignedIn = user !== null

    // Check if on new page
    const isNew = window.location.pathname === '/new'
    console.log(isNew)

    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <Build />
            <Typography type="title" color="inherit" className={classes.flex}>
              Tool Belt
            </Typography>
            {/* Return login button if user is not signed-in */}
            {!isSignedIn &&
              <Button color="contrast" onClick={toggleSignIn}>
                Login
              </Button>}
            {isSignedIn &&
              <Link to={isNew ? '/' : '/new'} className="text-white">
                <IconButton
                  className={classes.button}
                  color="inherit"
                  aria-label="add"
                >
                  {isNew ? <Clear /> : <Add />}
                </IconButton>
              </Link>}
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
