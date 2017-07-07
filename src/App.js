import React, { Component } from 'react'
import fire from './fire'
import _ from 'lodash'

// Material UI Components
import { MuiThemeProvider } from 'material-ui/styles'

// Components
import DataTable from './components/Table'
import Form from './components/Form'

// Firebase Database references
const database = fire.database().ref()
const toolsRef = database.child('tools')

class App extends Component {
  state = {
    tools: []
  }

  componentWillMount() {
    toolsRef.on('value', snap => {
      const tools = _.values(snap.val())
      const sortedTools = tools.sort((a, b) => {
        return b.likes - a.likes
      })
      this.setState({ tools })
    })
  }

  addNewTool = newTool => {
    // Don't submit if text field is empty
    if (!newTool) {
      document.getElementById('addnew').focus()
      return false
    }

    // New Tool Key
    const newToolKey = toolsRef.push().key

    // New Tool Data
    const toolData = {
      id: newToolKey,
      title: newTool,
      likes: 0
    }

    const updates = {}
    updates[`/tools/${newTool}${newToolKey}`] = toolData

    database.update(updates)
  }

  handleLike = ({ id, title, likes }) => {
    const likeRef = fire.database().ref(`tools/${title}${id}`)
    const updates = { likes: likes + 1 }
    likeRef.update(updates)
  }

  render() {
    const { tools } = this.state
    return (
      <MuiThemeProvider>
        <section className="container">
          <Form addNewTool={this.addNewTool} />
          <DataTable tools={tools} handleLike={this.handleLike} />
        </section>
      </MuiThemeProvider>
    )
  }
}

export default App
