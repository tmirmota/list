import React, { Component } from 'react'
import * as firebase from 'firebase'
import _ from 'lodash'

// Material UI Components
import { MuiThemeProvider } from 'material-ui/styles'
import Button from 'material-ui/Button'

// Components
import DataTable from './components/Table'
import Form from './components/Form'
import UserChip from './components/UserChip'

// Firebase configuration
const config = {
  apiKey: 'AIzaSyDv_aZXyye7elz_tkdtxUnK-_Pve663DgM',
  authDomain: 'list-b0f48.firebaseapp.com',
  databaseURL: 'https://list-b0f48.firebaseio.com',
  projectId: 'list-b0f48',
  storageBucket: 'list-b0f48.appspot.com',
  messagingSenderId: '306743013539'
}
// Initialize Firebase App
firebase.initializeApp(config)

// Firebase database reference
const database = firebase.database().ref()

class App extends Component {
  state = {
    user: null,
    tools: []
  }

  componentWillMount() {
    // Listen for logged in user
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      }
    })

    // Sort existing tools to app and subscribe
    database.child('tools').on('value', snap => {
      const tools = _.values(snap.val())
      const sortedTools = tools.sort((a, b) => {
        return b.likes - a.likes
      })
      this.setState({ tools: sortedTools })
    })
  }

  addNewTool = newTool => {
    // New Tool Key
    const newToolKey = database.child('tools').push().key

    // New Tool Data
    const toolData = {
      key: newToolKey,
      title: newTool.title,
      url: newTool.url,
      likes: 0
    }

    const updates = {}
    updates[`/tools/${newToolKey}`] = toolData

    database.update(updates)
  }

  handleLike = ({ key, likes }) => {
    const likeRef = firebase.database().ref(`tools/${key}`)
    const updates = { likes: likes + 1 }
    likeRef.update(updates)
  }

  render() {
    const { tools, user } = this.state
    return (
      <MuiThemeProvider>
        <section className="container">
          <UserChip user={user} toggleSignIn={this.toggleSignIn} />
          <Form addNewTool={this.addNewTool} />
          <DataTable tools={tools} handleLike={this.handleLike} />
        </section>
      </MuiThemeProvider>
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
          // The signed-in user info
          const user = result.user
          // Set User info to state
          this.setState({ user })
        })
        .catch(error => {
          // Handle Errors here
          const errorCode = error.code
          const errorMessage = error.message
          // The email of the user's account used
          const email = error.email
          // The firebase.auth.AuthCredential type that was used
          const credential = error.credential
          // [START_EXCLUDE]
          if (errorCode === 'auth/account-exists-with-different-credential') {
            alert(
              'You have already signed up with a different auth provider for that email.'
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

export default App
