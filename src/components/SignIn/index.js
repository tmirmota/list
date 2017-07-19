import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Material UI
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog'
import Button from 'material-ui/Button'

const styleSheet = createStyleSheet('SignIn', {
  button: {
    background: '#3B5998',
    '&:hover': {
      background: 'rgba(59, 89, 152, 0.8)',
    },
  },
})

class SignIn extends Component {
  handleFacebook = () => {
    const { onRequestClose, toggleSignIn } = this.props

    // Close Dialog
    onRequestClose()

    // Sign in with Facebook
    toggleSignIn()
  }

  render() {
    const { open, onRequestClose, classes } = this.props
    return (
      <Dialog open={open} onRequestClose={onRequestClose}>
        <DialogTitle>Sign In to join the community</DialogTitle>
        <DialogContent className="text-center">
          <Button
            raised
            color="contrast"
            className={classes.button}
            onClick={this.handleFacebook}
          >
            <i className="fa fa-facebook pr-2" />
            Login with Facebook
          </Button>
        </DialogContent>
      </Dialog>
    )
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styleSheet)(SignIn)
