import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Container, Typography, TextField, Button, Link, Box } from '@mui/material';

import axios from '../api/axios';
import { validationSchema } from '../utils/utils';
import { useAuth } from '../context/AuthProvider';

const SIGNIN_URL = '/auth';

function SignIn() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      console.log(values);
      try {
        const response = await axios.post(SIGNIN_URL, values, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });

        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        const userId = response?.data?.userId;

        // Handle successful login, e.g., store the access token and navigate to the next page
        console.log(response?.data);

        setAuth({ username, accessToken, roles, userId });

        if (roles.at(0) === 'User') {
          navigate('/userhome', { replace: true });
        } else if (roles.at(0) === 'Driver') {
          navigate('/driverhome', { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            // missing username or password
            setFieldError("username", error.response.data.message);
            setFieldError("password", error.response.data.message);
          } else if (error.response.status === 401) {
            if (error.response.data.message.includes('username')) {
              setFieldError("username", error.response.data.message);
            } else {
              setFieldError("password", "Wrong pssword");
            }
            console.log(error.response);
          } else {
            // Other server error
            console.error('Server error:', error.response);
          }
        } else {
          // Network or other client-side errors
          console.error('Client-side error:', error.message);
        }
      }
    }
  });

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
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{
              width: '100%',
              maxWidth: '400px',
            }}
          >
            <TextField
              autoFocus
              required
              id="username"
              label="Username"
              autoComplete="username"
              fullWidth
              margin="normal"
              sx={{ marginBottom: 2 }}

              {...formik.getFieldProps('username')}  // this line is handling value, name, onChange
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username ? formik.errors.username : ''}
            />
            <TextField
              required
              id="password"
              type="password"
              label="Password"
              autoComplete="current-password"
              fullWidth
              margin="normal"
              sx={{ marginBottom: 2 }}

              {...formik.getFieldProps('password')}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password ? formik.errors.password : ''}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Sign In
            </Button>

            {/* extra links */}
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