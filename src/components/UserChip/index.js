import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Material UI
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar'
import Menu, { MenuItem } from 'material-ui/Menu'
import IconButton from 'material-ui/IconButton'

// Material UI Icons
import Add from 'material-ui-icons/Add'

const styleSheet = createStyleSheet('UserChip', theme => ({
  button: {
    margin: theme.spacing.unit,
  },
}))

class UserChip extends Component {
  state = {
    open: false,
    anchorEl: undefined,
  }

  handleRequestLogout = event => {
    this.props.toggleSignIn()
    this.setState({ open: false })
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  render() {
    // Destructure Props
    const { user, toggleSignIn, classes } = this.props
    // Destructure State
    const { open, anchorEl } = this.state

    // Return avatar and add-on button when user is signed-in
    return (
      <div>
        <IconButton className={classes.button} aria-label="avatar">
          <Avatar src={user.photoURL} onClick={this.handleClick} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onRequestClose={() => this.setState({ open: false })}
        >
          <MenuItem onClick={this.handleRequestLogout}>Logout</MenuItem>
        </Menu>
      </div>
    )
  }
}

UserChip.propTypes = {
  open: PropTypes.bool,
  anchorEl: PropTypes.string,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styleSheet)(UserChip)
