import { Link } from 'react-router-dom';
import { Box, Button, Typography } from "@mui/material";

function Home() {
  return (
    <>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100vh',
        textAlign: "center",
      }}>
        <Box >
          <Typography variant="h2" gutterBottom>Burhani Cabs</Typography>
          <Link to="/signup">
            <Button variant="contained" sx={{ mr: 2 }} >SignUp</Button>
          </Link>
          <Link to="/signin">
            <Button variant="outlined" >SignIn</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default Home;