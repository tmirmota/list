import React, { Component } from 'react'

// Material UI
import Button from 'material-ui/Button'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import Menu, { MenuItem } from 'material-ui/Menu'

class UserChip extends Component {
  state = {
    open: false
  }

  handleRequestLogout = () => {
    this.props.toggleSignIn()
    this.setState({ open: false })
  }

  render() {
    const { user, toggleSignIn } = this.props
    const { open } = this.state
    if (user === null) {
      return <Button onClick={toggleSignIn}>Login</Button>
    }
    return (
      <div>
        <Chip
          avatar={<Avatar src={user.photoURL} />}
          label={user.displayName}
          onClick={() => this.setState({ open: true })}
        />
        <Menu open={open} onRequestClose={() => this.setState({ open: false })}>
          <MenuItem onClick={this.handleRequestLogout}>Logout</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default UserChip
