import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as firebase from 'firebase'
import _ from 'lodash'
import './App.css'

// Material UI Components
import {
  MuiThemeProvider,
  createMuiTheme,
  createPalette,
  createTypography,
} from 'material-ui/styles'
import blue from 'material-ui/colors/blue'

// Components
import Nav from './components/Nav'
import DataTable from './components/Table'
import Form from './components/Form'
import Footer from './components/Footer'
import FloatingCreateButton from './components/FloatingCreateButton'
import SignIn from './components/SignIn'

// Firebase configuration
const config = {
  apiKey: 'AIzaSyDv_aZXyye7elz_tkdtxUnK-_Pve663DgM',
  authDomain: 'list-b0f48.firebaseapp.com',
  databaseURL: 'https://list-b0f48.firebaseio.com',
  projectId: 'list-b0f48',
  storageBucket: 'list-b0f48.appspot.com',
  messagingSenderId: '306743013539',
}

// Initialize Firebase App
firebase.initializeApp(config)

// Firebase database reference
const dbRef = firebase.database().ref()

let theme = createMuiTheme()

const typography = createTypography(theme.palette, {
  // System font
  fontFamily:
    '-apple-system,system-ui,BlinkMacSystemFont,' +
    '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
})

// Customize Theme
theme = {
  ...theme,
  palette: createPalette({
    primary: blue,
  }),
  typography: {
    ...typography,
    button: {
      ...typography.button,
      fontWeight: typography.fontWeightSmall,
    },
  },
}

export default class App extends Component {
  state = {
    user: null,
    likedTools: [],
    tools: [],
    openForm: false,
    openSignIn: false,
  }

  componentWillMount() {
    // Listen for logged in user
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dbRef.child(`accounts/${user.uid}/tools`).on('value', snap => {
          const likedTools = snap.toJSON()
          this.setState({ likedTools })
        })
        this.setState({ user })
      }
    })

    // Sort existing tools to app and subscribe
    dbRef.child('tools').on('value', snap => {
      // Create array of tools
      const tools = _.values(snap.val())

      // Sorted tools in descending order by likes
      const sortedTools = tools.sort((a, b) => b.likes - a.likes)

      // Set sorted array of tools to state
      this.setState({ tools: sortedTools })
    })
  }

  addNewTool = newTool => {
    // New Tool Key
    const newToolKey = dbRef.child('tools').push().key

    // New Tool Data
    const toolData = {
      key: newToolKey,
      title: newTool.title,
      url: newTool.url,
      likes: 0,
    }

    const updates = {}
    updates[`/tools/${newToolKey}`] = toolData

    dbRef.update(updates)
  }

  handleLike = ({ key, likes }) => {
    // Collect the current user
    const { user } = this.state

    // Trigger signup dialog if user tries to like while not signed in
    const noUser = user === null
    if (noUser) {
      this.setState({ openSignIn: true })
      return false
    }

    // User's tool reference
    const userToolRef = firebase
      .database()
      .ref(`accounts/${user.uid}/tools/${key}`)

    userToolRef.once('value', snap => {
      // User like status
      const userLikeRef = snap.val().like

      // Toggle user like status
      userToolRef.update({ like: !userLikeRef })

      // Increment or decrement like count
      const changeLikes = userLikeRef ? -1 : +1

      // New like count for tool
      const newLikesCount = likes + changeLikes

      // Tool like count ref
      const toolLikeRef = firebase.database().ref(`tools/${key}`)

      // Update like count
      toolLikeRef.update({ likes: newLikesCount })
    })
  }

  render() {
    const { tools, user, likedTools, openForm, openSignIn } = this.state
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div>
            <Nav
              user={user}
              openSignIn={() => this.setState({ openSignIn: true })}
              toggleSignIn={this.toggleSignIn}
            />
            <SignIn
              open={openSignIn}
              onRequestClose={() => this.setState({ openSignIn: false })}
              toggleSignIn={this.toggleSignIn}
            />

            <section className="container app-section">
              <DataTable
                tools={tools}
                likedTools={likedTools}
                handleLike={this.handleLike}
              />

              <Form
                open={openForm}
                onRequestClose={() => this.setState({ openForm: false })}
                addNewTool={this.addNewTool}
              />
            </section>

            <FloatingCreateButton
              onRequestOpen={() => this.setState({ openForm: true })}
            />

            <Footer />
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }

  toggleSignIn = () => {
    if (!firebase.auth().currentUser) {
      // [START createprovider]
      var provider = new firebase.auth.FacebookAuthProvider()
      // [END createprovider]
      // [START addscopes]
      provider.addScope('user_birthday')
      // [END addscopes]
      // [START signin]
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API
          const token = result.credential.accessToken
          console.log(`User logged in: ${token}`)
          // The signed-in user info
          const user = result.user
          // Set User info to state
          this.setState({ user })

          // Create user in database
          const userAccount = dbRef.child('accounts').child(user.uid)
          // Update user information in database
          userAccount.update({
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
          })
        })
        .catch(error => {
          // Handle Errors here
          const errorCode = error.code
          console.log(errorCode)
          const errorMessage = error.message
          console.log(errorMessage)
          // The email of the user's account used
          const email = error.email
          console.log(email)
          // The firebase.auth.AuthCredential type that was used
          const credential = error.credential
          console.log(credential)
          // [START_EXCLUDE]
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert(
              'You have already signed up with a different auth provider for that email.',
            )
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
          } else {
            console.error(error)
          }
          // [END_EXCLUDE]
        })
      // [END signin]
    } else {
      // [START signout]
      // Signout from Firebase
      firebase.auth().signOut()
      // Signout user from state
      this.setState({ user: null })
      // [END signout]
    }
  }
}
