import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica' },
  header: { 
    fontSize: 20, 
    marginBottom: 20, 
    textAlign: 'center',
    color: '#2c3e50'
  },
  section: { 
    marginBottom: 15,
    padding: 10,
    borderBottom: '1 solid #eaeaea'
  },
  label: { 
    fontSize: 12, 
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#3498db'
  },
  value: { 
    fontSize: 12, 
    marginBottom: 5 
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50'
  }
});

const QuotePDF = ({ quote }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Text>Insurance Quote {quote.quoteId}</Text>
        <Text style={{ fontSize: 14, marginTop: 5 }}>Valid until: {quote.generatedDate}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Customer Information</Text>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{quote.proposal.customer.customerName}</Text>
        
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{quote.proposal.customer.user.username}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Vehicle Details</Text>
        <Text style={styles.label}>Type:</Text>
        <Text style={styles.value}>{quote.proposal.vehicleType}</Text>
        
        <Text style={styles.label}>Model:</Text>
        <Text style={styles.value}>{quote.proposal.vehicleModel}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Quote Summary</Text>
        <Text style={styles.label}>Premium Amount:</Text>
        <Text style={styles.value}>₹{quote.premiumAmount.toFixed(2)}</Text>
        
        <Text style={styles.label}>Validity Period:</Text>
        <Text style={styles.value}>{quote.validityPeriod} days</Text>
      </View>
    </Page>
  </Document>
);

export default QuotePDF;