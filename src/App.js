import React, { Component } from 'react'
import fire from './fire'

// Material UI Components
import { MuiThemeProvider } from 'material-ui/styles'
import { TextField, Button } from 'material-ui'

const database = fire.database().ref()
const toolsRef = database.child('tools')

class App extends Component {
  state = {
    newItem: '',
  }

  componentWillMount() {
    toolsRef.on('value', snap => {
      this.setState({ tools: snap.val() })
    })
  }

  incrementButton = () => {
    const likes = { likes: this.state.likes + 1 }
  }
  addNewTool = () => {
    const { newItem } = this.state

    // Don't submit if text field is empty
    if (!newItem) {
      document.getElementById('addnew').focus()
      return false
    }

    // New Tool Data
    const toolData = {
      title: newItem,
      likes: 0,
    }

    // New Tool Key
    const newToolKey = toolsRef.push().key

    const updates = {}
    updates[`/tools/${newItem}${newToolKey}`] = toolData

    database.update(updates)
  }
  renderList = () => {
    return <div />
  }
  render() {
    const { likes } = this.state
    return (
      <MuiThemeProvider>
        <div>
          <TextField
            id="addnew"
            label="Add New"
            value={this.state.newItem}
            onChange={event => this.setState({ newItem: event.target.value })}
          />

          <Button onClick={this.addNewTool}>
            Add New
          </Button>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
