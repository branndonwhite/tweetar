import './App.css';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import React, { useState, useEffect } from 'react';

function App() {
  const [isUserSignedIn, setUserSignInStatus] = useState(null);

  useEffect(() => {
    const isUserStillSignedIn = localStorage.getItem("userKey") !== null;
    isUserStillSignedIn ? setUserSignInStatus(true) : setUserSignInStatus(false);
  }, [])

  const renderNotSignInPages = () => {
    return (
      <>
        <Route exact path='/'>
          <Redirect to='/signin' />
        </Route>
        <Route path='/signin'>
          <SignIn setUserSignInStatus={setUserSignInStatus} />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
      </>
    )
  }

  const renderSignInPages = () => {
    return (
      <>
        <Route path='/home'>
          <Home />
        </Route>
      </>
    )
  }

  return (
    <Router key={isUserSignedIn}>
      {
        isUserSignedIn ? renderSignInPages() : renderNotSignInPages()
      }
    </Router>
  );
}

export default App;
