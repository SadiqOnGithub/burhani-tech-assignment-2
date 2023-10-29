// PDFReceipt.js
import React from 'react';
import { Page, Document, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const PDFReceipt = ({ driverId, price }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Booking Receipt</Text>
          <Text>Driver: {driverId}</Text>
          <Text>Price: ${price}</Text>
          <Text>Payment Method: Cash</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFReceipt;
