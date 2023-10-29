import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import {
  Typography,
  CircularProgress,
  Box,
  Paper,
  Divider,
  Button,
  Container,
} from '@mui/material';

import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useAuth } from '../context/AuthProvider';
import axios from '../api/axios';
import PDFReceipt from './PDFReceipt';

function UserBookings() {
  const [userBooking, setUserBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();



  const retryHandler = () => {
    axiosPrivate
      .get('/bookings/users/' + auth.userId)
      .then((response) => {
        setUserBooking(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Error fetching user booking:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    retryHandler();
  }, []);

  const acceptingBookingHandler = async () => {
    console.log(userBooking._id);
    const res = await axiosPrivate.patch('/bookings/users', {
      bookingId: userBooking._id,
    });
    console.log(res.data);
    retryHandler();
  };

  const deletedBooking = async () => {
    const res = await axiosPrivate.delete('/bookings/users', {
      data: { bookingId: userBooking._id },
    });

    console.log(res);

  };

  const logoutHandler = async () => {
    try {
      // Send a POST request to log the user out
      const response = await axios.post('/auth/logout');

      // Check the response status code
      if (response.status === 204) {
        // No content, which means the user was logged out successfully
        console.log('User logged out.');
        setAuth({});
        navigate('/');
      } else {
        // Handle unexpected responses or status codes
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error('Error logging out:', error);
    }
  };
  console.log(userBooking);
  return (
    <Container maxWidth="sm">
      <Box py={8}>
        <Typography variant="h4" gutterBottom>
          Your Booking
        </Typography>
        {loading && <CircularProgress />}
        {!loading && !userBooking && (
          <Typography variant="body1">No booking found.</Typography>
        )}
        {!loading && userBooking && (
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="body1">
              Origin: {userBooking.origin.coordinates.join(', ')}
            </Typography>
            <Typography variant="body1">
              Destination: {userBooking.destination.coordinates.join(', ')}
            </Typography>
            <Typography variant="body1">
              Pickup Time:{' '}
              {new Date(userBooking.pickupTime).toLocaleString()}
            </Typography>
            <Typography variant="body1">Status: {userBooking.status}</Typography>
            {(userBooking.status === 'Pending') && (
              <>
                <Typography variant="body1">Price: {userBooking.price}</Typography>
                <Typography variant="body1">Driver ID: {userBooking.driver}</Typography>
              </>
            )}
            <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            {(userBooking.status === 'Pending') && (
              <Button variant="contained" color="primary"
                onClick={acceptingBookingHandler}
              >
                Accept Booking
              </Button>
            )}
            {(userBooking.status === 'Confirmed') && (
              <PDFDownloadLink
                document={<PDFReceipt driverId={userBooking.driver} price={userBooking.price} />}
                fileName="booking_receipt.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : <Button>Download Receipt</Button>
                }
              </PDFDownloadLink>
            )}
            <Button variant="contained" color="error"
              onClick={deletedBooking}
            >
              Delete Booking
            </Button>
          </Paper>
        )}
        <Button
          onClick={retryHandler}
        >Retry</Button>
        <Button
          onClick={logoutHandler}
        >Logout</Button>
      </Box>
    </Container>
  );
}

export default UserBookings;
