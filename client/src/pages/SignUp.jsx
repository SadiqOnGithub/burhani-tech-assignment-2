import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container, Typography,
  TextField, Button,
  Link, Box,
} from '@mui/material';


function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3333/user', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) {
        console.log('signup failed');
        console.log(await res.json());
      } else {
        const data = await res.json();
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          height: '90vh',
        }}
      >
        <Box sx={{
          display: 'flex', flexDirection: 'column',
          py: 4, px: { xs: 2, sm: 4 },
          border: 2, borderRadius: 5,
        }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{
              width: '100%',
              maxWidth: '400px',
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username/Email"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{ marginBottom: 2 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              disabled={username === "" || password === ""}
            >
              Sign Up
            </Button>
            <Box sx={{ mt: 4 }}>
              <RouterLink to="/signin">
                <Link component="p" variant="body2">
                  Already have an account?
                </Link>
              </RouterLink>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default SignUp;