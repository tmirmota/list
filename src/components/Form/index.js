import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'

// Material UI
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Dialog, { DialogTitle, DialogActions } from 'material-ui/Dialog'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Slide from 'material-ui/transitions/Slide'

const styleSheet = createStyleSheet('Form', theme => ({}))

class Form extends Component {
  state = {
    newTool: {
      title: '',
      url: '',
    },
  }

  handleSubmit = () => {
    // Destructure Props
    const { addNewTool, onRequestClose } = this.props

    // Destructure State
    const { newTool } = this.state

    addNewTool(newTool)
    onRequestClose()
  }

  handleInputChange = event => {
    const { newTool } = this.state
    const { name, value } = event.target

    // Only set state of input
    const newData = update(newTool, { [name]: { $set: value } })

    this.setState({ newTool: newData })
  }

  handleCancel = () => {
    // Close Dialog
    this.props.onRequestClose()

    // Reset form
    const resetTool = {
      title: '',
      url: '',
    }
    this.setState({ newTool: resetTool })
  }

  render() {
    // Destructure Props
    const { onRequestClose, ...other } = this.props

    // Destructure State
    const { newTool } = this.state

    return (
      <Dialog ignoreBackDropClick {...other}>
        <DialogTitle>Add a new tool</DialogTitle>
        <TextField
          label="Name"
          name="title"
          value={newTool.title}
          onChange={this.handleInputChange}
        />
        <br />
        <TextField
          label="URL"
          name="url"
          value={newTool.url}
          onChange={this.handleInputChange}
        />
        <DialogActions>
          <Button onClick={this.handleCancel}>Cancel</Button>
          <Button onClick={this.handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styleSheet)(Form)
