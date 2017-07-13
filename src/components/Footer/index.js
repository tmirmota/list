import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Material UI
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import BottomNavigation, {
  BottomNavigationButton,
} from 'material-ui/BottomNavigation'

import FavoriteIcon from 'material-ui-icons/Favorite'

const styles = {
  footer: {
    background: '#6ec6ff',
    padding: '20px',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  heading: {
    color: '#000',
  },
}

const styleSheet = createStyleSheet({
  root: {
    flexGrow: 1,
    marginTop: 30,
    padding: 0,
  },
})

class Footer extends Component {
  render() {
    const { classes } = this.props
    return (
      <footer style={styles.footer}>
        <div style={styles.heading}>This is the footer</div>
      </footer>
    )
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styleSheet)(Footer)
