import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDv_aZXyye7elz_tkdtxUnK-_Pve663DgM',
  authDomain: 'list-b0f48.firebaseapp.com',
  databaseURL: 'https://list-b0f48.firebaseio.com',
  projectId: 'list-b0f48',
  storageBucket: 'list-b0f48.appspot.com',
  messagingSenderId: '306743013539',
}
const fire = firebase.initializeApp(config)

export default fire
