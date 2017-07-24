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
    margin: '16px',
    padding: '5px 4px',
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
              // Assume user has not liked the tool
              let userUpvoted = false

              // User has Liked a tool before
              const hasLikes = likedTools !== null
              // User has a liked status on this tool
              const hasLiked = hasLikes ? likedTools[tool.key] !== undefined : false
              if (hasLiked) {
                // Has the user upvoted this particular tool
                userUpvoted = likedTools[tool.key].like
              }

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
                      {tool.description}
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.votes}>
                    <Button
                      raised
                      dense
                      color={userUpvoted ? 'accent' : 'inherit'}
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
