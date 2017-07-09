import React, { Component } from 'react'
import * as firebase from 'firebase'
import _ from 'lodash'

// Material UI Components
import { MuiThemeProvider } from 'material-ui/styles'
import Button from 'material-ui/Button'

// Components
import DataTable from './components/Table'
import Form from './components/Form'

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
        .then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken
          // The signed-in user info.
          var user = result.user
          // [START_EXCLUDE]
          // [END_EXCLUDE]
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          // The email of the user's account used.
          var email = error.email
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential
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
      firebase.auth().signOut()
      // [END signout]
    }
    // [START_EXCLUDE]
    // [END_EXCLUDE]
  }
  // [END buttoncallback]

  handleLogin = () => {
    const provider = new firebase.auth.FacebookAuthProvider()

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const token = result.credential.accessToken
        // The signed-in user info.
        const user = result.user
        console.log('User is logged in')

        this.setState({ user })
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        console.log(error)
        // The email of the user's account used.
        const email = error.email
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential
        // ...
      })
  }

  render() {
    const { tools } = this.state
    return (
      <MuiThemeProvider>
        <section className="container">
          <Button onClick={this.toggleSignIn}>Login</Button>
          <Form addNewTool={this.addNewTool} />
          <DataTable tools={tools} handleLike={this.handleLike} />
        </section>
      </MuiThemeProvider>
    )
  }
}

export default App
