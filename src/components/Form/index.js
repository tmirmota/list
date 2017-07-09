import React, { Component } from 'react'
import update from 'immutability-helper'

// Material UI
import Grid from 'material-ui/Grid'
import { FormControl } from 'material-ui/Form'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

class Form extends Component {
  state = {
    newTool: {
      name: '',
      url: ''
    }
  }
  handleInputChange = event => {
    const { newTool } = this.state
    const { name, value } = event.target
    const newData = update(newTool, { [name]: { $set: value } })
    this.setState({ newTool: newData })
  }

  render() {
    const { addNewTool } = this.props
    const { newTool } = this.state
    return (
      <Grid container align="center">
        <Grid item xs={12} className="text-center">
          <FormControl>
            <TextField
              label="Name"
              name="name"
              value={newTool.name}
              onChange={this.handleInputChange}
            />
            <TextField
              label="URL"
              name="url"
              value={newTool.url}
              onChange={this.handleInputChange}
            />
            <Button onClick={() => addNewTool(newTool)}>Add New</Button>
          </FormControl>
        </Grid>
      </Grid>
    )
  }
}

export default Form
