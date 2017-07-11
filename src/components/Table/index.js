import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Material UI
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table'
import Button from 'material-ui/Button'

// Material UI Icons
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp'

const styleSheet = createStyleSheet('DataTable', theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  votes: {
    textAlign: 'center',
  },
}))

class DataTable extends Component {
  render() {
    // Destructure Props
    const { tools, likedTools, handleLike, classes } = this.props

    // Render nothing if tools have not returned
    if (tools === []) {
      return false
    }

    // Render table once tools have returned
    return (
      <div>
        <Typography type="display2" color="inherit" align="center" gutterBottom>
          Top Tools for Digital Marketers
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell compact>Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell className={classes.votes}>Votes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tools.map((tool, index) => {
              // Tools the user has touched
              const userLikes = likedTools[tool.key]
              // Has the user upvoted this particular tool
              const userUpvoted = userLikes ? userLikes.like : false
              // Rank of current tool
              const toolRank = index + 1

              return (
                <TableRow hover key={index}>
                  <TableCell compact>
                    {toolRank}
                  </TableCell>
                  <TableCell>
                    <a href={tool.url} className="lead" target="_blank">
                      {tool.title}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Typography type="body1" color="inherit">
                      This is a caption
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.votes}>
                    <Button
                      fab
                      color={userUpvoted ? 'accent' : 'default'}
                      onClick={() => handleLike(tool)}
                      className={classes.button}
                    >
                      <KeyboardArrowUp />
                      {tool.likes}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styleSheet)(DataTable)
