import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Link, Box, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useFormik } from 'formik';

import axios from '../api/axios';
import { validationSchema } from '../utils/utils';

const SIGNUP_URL = '/users';

function SignUp() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      role: 'User',
    },
    validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      console.log(values);
      try {
        const response = await axios.post(
          SIGNUP_URL,
          { ...values, roles: [values.role] },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );

        console.log(response.data.message);
        navigate('/signin')
      } catch (error) {

        if (error.response) {
          if (error.response.status === 400) {
            // missing username or password
            setFieldError("username", error.response.data.message);
            setFieldError("password", error.response.data.message);
          } else if (error.response.status === 409) {
            setFieldError("username", error.response.data.message);
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
            Sign Up
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
              label="Username/Email"
              autoComplete="username"
              margin="normal"
              fullWidth
              sx={{ marginBottom: 2 }}

              {...formik.getFieldProps('username')}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username ? formik.errors.username : ''}
            />
            <TextField
              required
              id="password"
              type="password"
              label="Password"
              autoComplete="current-password"
              margin="normal"
              fullWidth
              sx={{ marginBottom: 2 }}

              {...formik.getFieldProps('password')}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password ? formik.errors.password : ''}
            />

            {/* role */}
            <FormControl>
              <RadioGroup
                row
                aria-label="role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                sx={{ marginBottom: 2 }}
              >
                <FormControlLabel value="User" control={<Radio />} label="User" />
                <FormControlLabel value="Driver" control={<Radio />} label="Driver" />
              </RadioGroup>
            </FormControl>

            {/* submit button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
              disabled={formik.isSubmitting || !formik.isValid}
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