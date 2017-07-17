import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Material UI
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Button from 'material-ui/Button'

// Material UI Icons
import Add from 'material-ui-icons/Add'

const styleSheet = createStyleSheet('FloatingCreateButton', theme => {
  button: {
    margin: theme.spacing.unit,
  }
})

class FloatingCreateButton extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <Button fab className={classes.button}>
          <Add />
        </Button>
      </div>
    )
  }
}

FloatingCreateButton.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styleSheet)(FloatCreateButton)
