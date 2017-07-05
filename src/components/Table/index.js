import React, { Component } from 'react'

// Material UI
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'

// Material UI Icons
import ThumbUp from 'material-ui-icons/ThumbUp'

class DataTable extends Component {
  render() {
    const { tools, handleLike } = this.props
    if (tools === []) {
      return false
    }
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tools.map(tool => {
              return (
                <TableRow key={tool.id}>
                  <TableCell>{tool.title}</TableCell>
                  <TableCell>
                    <Button raised onClick={() => handleLike(tool)}>
                      <ThumbUp />
                      {tool.likes}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default DataTable
