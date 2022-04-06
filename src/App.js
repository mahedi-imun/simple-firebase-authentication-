import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';
const auth = getAuth(app)
function App() {
  const [user, setUser] = useState({})
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider()
  const handleSignup = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {

        setUser(result.user)
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleGithubSignup =()=>{
    signInWithPopup(auth, githubProvider)
    .then((result) =>{
      setUser(result.user)
      console.log(result.user);
    })
    .catch((error )=>{
      console.log(error);
    })
  }
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUser({})
    }).catch((error) => {
      setUser({})
    });
  }
  
  return (
    <div className="App">
      {user.uid ? <button onClick={handleSignOut}> sign out</button> : <>
      <button onClick={handleSignup}> sign up google</button>
      <button onClick={handleGithubSignup}>sign github</button>
      </>}
      <h3>name{user.displayName}</h3>
      <p>email:{user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
