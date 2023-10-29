import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function DriverSearchBookings() {
  const [driverLocation, setDriverLocation] = useState('10.1,11.111');
  const [range, setRange] = useState(10);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();


  const fetchBookingsInRange = async () => {
    console.log('first')
    setLoading(true)
    try {
      const response = await axiosPrivate.post(
        '/bookings/drivers',
        {
          driverLocation: [parseFloat(driverLocation.split(',')[0]), parseFloat(driverLocation.split(',')[1])],
          range,
        }
      );
      console.log(response.data)
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Search Bookings</Typography>
      <TextField
        label="Driver Location (longitude, latitude)"
        variant="outlined"
        fullWidth
        value={driverLocation}
        onChange={(e) => setDriverLocation(e.target.value)}
      />
      <TextField
        type="number"
        label="Range (in km)"
        variant="outlined"
        fullWidth
        value={range}
        onChange={(e) => setRange(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={fetchBookingsInRange}
      >
        Search
      </Button>
      {loading && <CircularProgress />}
      {!loading && bookings.length === 0 && <Typography>No bookings found.</Typography>}
      {!loading && bookings.length > 0 && (
        <div>
          <Typography variant="h6">Found Bookings:</Typography>
          <List>
            {bookings.map((booking) => (
              <ListItem key={booking._id}>
                <ListItemText
                  primary={`Origin: ${booking.origin.coordinates.join(', ')}`}
                  secondary={`Destination: ${booking.destination.coordinates.join(', ')}`}
                />
                <ListItemText
                  primary={`Pickup Time: ${new Date(booking.pickupTime).toLocaleString()}`}
                  secondary={`Status: ${booking.status}`}
                />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </Container>
  );
}

export default DriverSearchBookings;
