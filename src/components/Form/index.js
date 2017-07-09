import React, { Component } from 'react'
import update from 'immutability-helper'

// Material UI
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

class Form extends Component {
  state = {
    newTool: {
      title: '',
      url: ''
    }
  }

  handleSubmit = () => {
    const { addNewTool } = this.props
    const { newTool } = this.state

    addNewTool(newTool)
  }

  handleInputChange = event => {
    const { newTool } = this.state
    const { name, value } = event.target

    // Only set state of input
    const newData = update(newTool, { [name]: { $set: value } })

    this.setState({ newTool: newData })
  }

  render() {
    const { newTool } = this.state

    return (
      <Grid container align="center">
        <Grid item xs={12} className="text-center">
          <TextField
            label="Name"
            name="title"
            value={newTool.title}
            onChange={this.handleInputChange}
          />
          <TextField
            label="URL"
            name="url"
            value={newTool.url}
            onChange={this.handleInputChange}
          />
          <Button onClick={this.handleSubmit}>Add New</Button>
        </Grid>
      </Grid>
    )
  }
}

export default Form
