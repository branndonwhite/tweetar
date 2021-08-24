import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const SignIn = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');

  // useEffect(() => {
  //   const userKey = localStorage.getItem("userKey");
  //   if(userKey !== null)
  // }, []);

  const specs = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "username": username, 
      "password": password
    })
  }

  const signInValidation = () => {
    fetch("http://localhost:3000/signin", specs)
    .then(response => {
      switch(response.status){
        case 200:
            response.json()
            .then( result => {
              userSuccessSignIn(uuidv4(), result);
            });
          break;
        case 401:
            response.json()
            .then( result => {
              // setErrorMessage(result.message);
              alert(result.message);
            })
          break;
        default:
          alert("Something went wrong. Please try again later");
          break;
      }
    })
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    signInValidation();
  }

  const userSuccessSignIn = (userKey, result) => {
    const data = result.result;
    alert(result.message);
    props.setUserSignInStatus(true);
    localStorage.setItem("userKey", userKey);
    localStorage.setItem("user_id", data.user_id);
    localStorage.setItem("name", data.name);
    localStorage.setItem("username", data.username);
    window.location = 'home';
  }

  return (
    <>
      <Container maxWidth="xs" style={{marginTop: "5vh"}}>
        <Typography variant="h4" gutterBottom align="left">Sign In to Tweetar</Typography>
        <div>
          <TextField 
            name="username"
            id="usernameForm"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            label="Username"
            onChange={e => setUsername(e.target.value)}
            // helperText={errorMessage.includes("username") ? errorMessage : ''}
          />
        </div>
        <div>
          <TextField 
            name="password"
            id="passwordForm"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            onChange={e => setPassword(e.target.value)}
            // helperText={errorMessage.includes("password") ? errorMessage : ''}
          />
        </div>
        <div>
          <Button 
            onClick={handleSignIn} 
            variant="contained" 
            color="primary" 
            type="submit"
            style={{borderRadius: "50px", margin: "20px 0", height: "50px", width: "100%"}}
          >Sign In</Button>
        </div>
        <div>
          <Typography align="center">
            <Link component={RouterLink} to="/signup">Sign up for Tweetar</Link>
          </Typography>
        </div>
      </Container>
    </>
  );
}

export default SignIn;