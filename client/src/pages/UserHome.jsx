import React from 'react';
import UserBookings from '../components/UserBookings';
import UserNewBooking from '../components/UserNewBooking';

function UserHome() {
  return (
    <>
      <UserBookings />
      <UserNewBooking />
    </>
  );
}

export default UserHome;