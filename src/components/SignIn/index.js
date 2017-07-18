import React, { Component } from 'react'

// Material UI
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogActions,
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'

class SignIn extends Component {
  handleFacebook = () => {
    const { onRequestClose, toggleSignIn } = this.props

    onRequestClose()
    toggleSignIn()
  }
  render() {
    const { open, onRequestClose } = this.props
    return (
      <Dialog open={open} onRequestClose={onRequestClose}>
        <DialogTitle>Sign In to join the community</DialogTitle>
        <DialogActions>
          {/* Facebook login */}
          <Button onClick={this.handleFacebook}>Login with Facebook</Button>
        </DialogActions>
        <Divider />
        <DialogContent />
      </Dialog>
    )
  }
}

export default SignIn
