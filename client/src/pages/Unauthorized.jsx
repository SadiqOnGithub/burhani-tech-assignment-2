import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";

function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: '100vh',
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Unauthorized Access
        </Typography>
        <Typography variant="body1">
          You do not have the necessary permissions to access this page.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={goBack}
          sx={{ mt: 4 }}
        >
          Go Back
        </Button>
      </Box>
    </Container>
  );
}

export default Unauthorized;
