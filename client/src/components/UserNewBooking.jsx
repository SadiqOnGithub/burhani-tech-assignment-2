import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useAuth } from '../context/AuthProvider';

function UserNewBooking() {
  const axiosPrivate = useAxiosPrivate();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const { auth } = useAuth();

  const handleBookNow = async () => {
    // Ensure required fields are filled
    if (!origin || !destination || !pickupTime) {
      alert('Please fill in all fields');
      return;
    }
    console.log(auth.userId);
    // Create a request object
    const requestObject = {
      userId: auth.userId, // You should replace this with the actual user ID
      origin: [parseFloat(origin.split(',')[0]), parseFloat(origin.split(',')[1])], // Assuming input format is "latitude,longitude"
      destination: [parseFloat(destination.split(',')[0]), parseFloat(destination.split(',')[1])], // Assuming input format is "latitude,longitude"
      pickupTime,
    };

    try {
      // Send the request to create a booking
      const response = await axiosPrivate.post('/bookings/users', requestObject);

      console.log(response);
      // Check if the booking was created successfully
      if (response.status === 201) {
        alert('Booking created successfully');
      } else {
        alert('Booking creation failed');
      }
    } catch (error) {
      alert('An error occurred while creating the booking');
      console.error('Error:', error.response.data.message);
      console.error('Error:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Request a Cab
        </Typography>
        <TextField
          fullWidth
          label="Origin (latitude,longitude)"
          variant="outlined"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          sx={{ marginY: 2 }}
        />
        <TextField
          fullWidth
          label="Destination (latitude,longitude)"
          variant="outlined"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          sx={{ marginY: 2 }}
        />
        <TextField
          fullWidth
          label="Pickup Time (YYYY-MM-DD)"
          variant="outlined"
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          sx={{ marginY: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleBookNow}
          sx={{ marginTop: 2 }}
        >
          Book Now
        </Button>
      </Box>
    </Container>
  );
}

export default UserNewBooking;
