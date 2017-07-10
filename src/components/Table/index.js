import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Material UI
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'

// Material UI Icons
import KeyboardArrowUp from 'material-ui-icons/KeyboardArrowUp'

const styleSheet = createStyleSheet('DataTable', theme => ({
  button: {
    margin: theme.spacing.unit,
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
      <div className="p-5">
        <h3>Name</h3>
        {tools.map(tool => {
          const userLikes = likedTools[tool.key]
          const userUpvoted = userLikes ? userLikes.like : false
          return (
            <section key={tool.key}>
              <Grid container gutter={24} className="py-3">
                <Grid item xs={6}>
                  <a href={tool.url} className="lead" target="_blank">
                    {tool.title}
                  </a>
                </Grid>
                <Grid item xs={6} className="text-right">
                  <Button
                    fab
                    color={userUpvoted ? 'accent' : 'default'}
                    onClick={() => handleLike(tool)}
                    className={classes.button}
                  >
                    <KeyboardArrowUp />
                    {tool.likes}
                  </Button>
                </Grid>
              </Grid>
              <Divider />
            </section>
          )
        })}
      </div>
    )
  }
}

export default withStyles(styleSheet)(DataTable)
