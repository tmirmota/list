import React, { Component } from 'react'

// Material UI
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'

// Material UI Icons
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp'

class DataTable extends Component {
  render() {
    const { tools, handleLike } = this.props
    if (tools === []) {
      return false
    }
    return (
      <Paper className="p-5">
        {tools.map(tool => {
          return (
            <section key={tool.id}>
              <Grid container gutter={24} className="py-3">
                <Grid item xs={6}>
                  <p className="lead">
                    {tool.title}
                  </p>
                </Grid>
                <Grid item xs={6} className="text-right">
                  <Button raised dense onClick={() => handleLike(tool)}>
                    <KeyboardArrowUp />
                    {tool.likes}
                  </Button>
                </Grid>
              </Grid>
              <Divider />
            </section>
          )
        })}
      </Paper>
    )
  }
}

export default DataTable
