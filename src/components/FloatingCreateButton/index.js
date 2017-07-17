import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Material UI
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Button from 'material-ui/Button'

// Material UI Icons
import Add from 'material-ui-icons/Add'

const styleSheet = createStyleSheet('FloatingCreateButton', theme => ({
  button: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: '30px',
    right: '50px',
    zIndex: 1000,
  },
}))

class FloatingCreateButton extends Component {
  render() {
    const { classes, onRequestOpen } = this.props
    return (
      <div>
        <Button
          fab
          className={classes.button}
          color="primary"
          onClick={onRequestOpen}
        >
          <Add />
        </Button>
      </div>
    )
  }
}

FloatingCreateButton.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styleSheet)(FloatingCreateButton)
