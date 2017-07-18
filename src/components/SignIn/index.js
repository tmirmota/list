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

    // Close Dialog
    onRequestClose()

    // Sign in with Facebook
    toggleSignIn()
  }

  render() {
    const { open, onRequestClose } = this.props
    return (
      <Dialog open={open} onRequestClose={onRequestClose}>
        <DialogTitle>Sign In to join the community</DialogTitle>
        <DialogContent className="text-center">
          <Button raised color="primary" onClick={this.handleFacebook}>
            <i className="fa fa-facebook pr-2" />
            Login with Facebook
          </Button>
        </DialogContent>
      </Dialog>
    )
  }
}

export default SignIn
