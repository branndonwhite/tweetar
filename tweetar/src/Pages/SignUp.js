import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Link } from '@material-ui/core';
import { Link as RouterLink, useHistory } from 'react-router-dom';

const SignUp = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypedPassword, setRetypedPassword] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');

  const specs = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "name": name, 
      "username": username, 
      "email": email, 
      "password": password
    })
  };

  const signUpValidation = () => {
    fetch("http://localhost:3000/signup", specs)
    .then(response => {
      switch(response.status){
        case 201:
          history.push('/signin');
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
    .catch(error => console.log(error));
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    if(password === retypedPassword){
      signUpValidation();
    }else{
      // setErrorMessage("Password and retyped password doesn't match");
      alert("Password and retyped password doesn't match")
    }
  }

  return (
    <>
      <Container maxWidth="sm" style={{marginTop: "5vh"}}>
        <Typography variant="h4" gutterBottom align="left">Create your account</Typography>
        <div>
          <TextField 
            name="name"
            id="nameForm"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            label="Name"
            onChange={e => setName(e.target.value)}
          />
        </div>
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
            name="email"
            id="emailForm"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            label="Email"
            onChange={e => setEmail(e.target.value)}
            // helperText={errorMessage.includes("email") ? errorMessage : ''}
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
          />
        </div>
        <div>
          <TextField 
            name="retypePassword"
            id="retypePasswordForm"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            label="Retype Password"
            onChange={e => setRetypedPassword(e.target.value)}
            // helperText={errorMessage.includes("password") ? errorMessage : ''}
          />
        </div>
        <div>
          <Button 
            onClick={handleSignUp} 
            variant="contained" 
            color="primary" 
            type="submit"
            style={{borderRadius: "50px", margin: "20px 0", height: "50px", width: "100%"}}
          >Sign Up</Button>
        </div>
        <div>
          <Typography align="center">
            <Link component={RouterLink} to="/signin">Already have account? Sign in to Tweetar</Link>
          </Typography>
        </div>
      </Container>
    </>
  );
}

export default SignUp;