import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useAuth } from '../context/AuthProvider';

function DriverSelectBooking() {
  const { bookingId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [booking, setBooking] = useState(null);
  const [price, setPrice] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [isPriceEntered, setIsPriceEntered] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    // Fetch the booking by ID
    axiosPrivate
      .get(`/bookings/drivers/${bookingId}`)
      .then((response) => {
        setBooking(response.data);
      })
      .catch((error) => {
        console.error('Error fetching booking:', error);
      });
  }, [axiosPrivate, bookingId]);

  const handleUpdatePrice = () => {
    if (updatedPrice !== '') {
      // Make a PATCH request to update the price
      axiosPrivate
        .patch(`/bookings/drivers/${bookingId}`, { price: updatedPrice, driverId: auth.userId  })
        .then((response) => {
          setBooking(response.data);
          setIsPriceEntered(true);
        })
        .catch((error) => {
          console.error('Error updating price:', error);
        });
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Booking Details
      </Typography>
      {booking ? (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Origin: {booking.origin.coordinates.join(', ')}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Destination: {booking.destination.coordinates.join(', ')}
            </Typography>
            <Typography variant="body2">
              Pickup Time: {new Date(booking.pickupTime).toLocaleString()}
            </Typography>
            <Typography variant="body2">Status: {booking.status}</Typography>
            {booking.status === 'Created' && !isPriceEntered && (
              <>
                <TextField
                  label="Enter Price"
                  variant="outlined"
                  value={updatedPrice}
                  onChange={(e) => setUpdatedPrice(e.target.value)}
                  style={{ marginTop: '16px' }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdatePrice}
                  style={{ marginTop: '16px' }}
                >
                  Update Price
                </Button>
              </>
            )}
            {isPriceEntered && (
              <Typography variant="body2" style={{ marginTop: '16px' }}>
                Price Confirmed: ${updatedPrice}
              </Typography>
            )}
          </CardContent>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
    </Box>
  );
}

export default DriverSelectBooking;
