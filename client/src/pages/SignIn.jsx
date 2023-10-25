import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container, Typography,
  TextField, Button,
  Link, Box,
} from '@mui/material';


function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
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
            Sign In
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
              Sign In
            </Button>
            <Box sx={{ mt: 2 }}>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
              <RouterLink to="/signup">
                <Link component="p" variant="body2">
                  Don't have an account?
                </Link>
              </RouterLink>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default SignIn;