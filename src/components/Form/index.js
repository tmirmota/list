import React, { Component } from 'react'

// Material UI
import Grid from 'material-ui/Grid'
import { FormControl } from 'material-ui/Form'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

class Form extends Component {
  state = {
    newTool: ''
  }
  render() {
    const { addNewTool } = this.props
    const { newTool } = this.state
    return (
      <Grid align="center" xs={12}>
        <div className="text-center">
          <FormControl>
            <TextField
              id="addnew"
              label="Add New"
              value={newTool}
              onChange={event => this.setState({ newTool: event.target.value })}
            />
            <Button onClick={() => addNewTool(newTool)}>Add New</Button>
          </FormControl>
        </div>
      </Grid>
    )
  }
}

export default Form
