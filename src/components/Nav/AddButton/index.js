import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Flight from 'react-flight'
import { Link } from 'react-router-dom'

// Material UI
import { withStyles, createStyleSheet } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'

// Material UI Icons
import Add from 'material-ui-icons/Add'

const styleSheet = createStyleSheet('Nav', theme => ({
  root: {
    marginTop: 100,
    width: '100%',
  },
  flex: {
    flex: 1,
    paddingLeft: 5,
  },
  button: {
    margin: theme.spacing.unit,
  },
}))

export default class AddButton extends Component {
  render() {
    return (
      <Flight>
        <Link to="/new">
          <IconButton
            className={classes.button}
            color="inherit"
            aria-label="add"
          >
            <Add />
          </IconButton>
        </Link>
      </Flight>
    )
  }
}
