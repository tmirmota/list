import React, { Component } from 'react'
import PropTypes from 'prop-types'
import update from 'immutability-helper'

// Material UI
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogActions,
} from 'material-ui/Dialog'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Button from 'material-ui/Button'

const styleSheet = createStyleSheet('Form', theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    marginRight: '16px',
    width: 200,
  },
  button: {
    minWidth: 80,
  },
  formControl: {
  },
}))

class Form extends Component {
  state = {
    newTool: {
      title: '',
      url: '',
      description: '',
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
    // Destructure Props
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
    const { classes, onRequestClose, open } = this.props

    // Destructure State
    const { newTool } = this.state

    return (
      <Dialog open={open} onRequestClose={onRequestClose}>
        <DialogTitle>Add a new tool</DialogTitle>
        <DialogContent className={classes.container}>

          {/* Name Input */}
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="title">Name</InputLabel>
            <Input
              id="title"
              type="text"
              className={classes.input}
              value={newTool.title}
              onChange={this.handleInputChange}
              // error
            />
          </FormControl>

          {/* URL Input */}
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="url">URL</InputLabel>
            <Input
              id="url"
              type="url"
              className={classes.input}
              value={newTool.url}
              onChange={this.handleInputChange}
              // error
            />
          </FormControl>

          {/* Description Input */}
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input
              id="description"
              type="text"
              value={newTool.description}
              onChange={this.handleInputChange}
              fullWidth
              marginForm
              // error
            />
          </FormControl>

        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel}>Cancel</Button>
          <Button
            onClick={this.handleSubmit}
            color="primary"
            className={classes.button}
          >
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
