import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Table, Button, Spin, message } from 'antd';

const CustomerViewPayment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerId, setCustomerId] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCustomerId = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/customer/get-one-username', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCustomerId(response.data.id);
      } catch (error) {
        console.error('Error fetching customer ID:', error);
        message.error('Failed to fetch customer information');
        setLoading(false);
      }
    };
    fetchCustomerId();
  }, [token]);

  useEffect(() => {
    if (!customerId) return;
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/payments_new/get-one/customer/${customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPayments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching payments:', error);
        message.error('Failed to fetch payment details');
        setLoading(false);
      }
    };
    fetchPayments();
  }, [customerId, token]);

  const generateReceipt = (payment) => {
    const receiptContent = `
      Payment Receipt
      ----------------------------
      Receipt ID: ${payment.paymentId}
      Date: ${payment.paymentDate}
      Amount Paid: ₹${payment.amountPaid.toLocaleString('en-IN')}
      Payment Method: ${payment.paymentMethod}
      Status: ${payment.paymentStatus}
      
      Customer Details:
      Name: ${payment.customer.customerName}
      Address: ${payment.customer.customerAddress}
      
      ${payment.proposal ? `
      Policy Details:
      Policy Name: ${payment.proposal.policy.policyName}
      Vehicle: ${payment.proposal.vehicleModel}
      Registration: ${payment.proposal.registrationNumber}
      ` : ''}
      
      Thank you for your payment!
    `;

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `Payment_Receipt_${payment.paymentId}.txt`);
  };

  const columns = [
    {
      title: 'Payment ID',
      dataIndex: 'paymentId',
      key: 'paymentId',
    },
    {
      title: 'Date',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
    },
    {
      title: 'Amount (₹)',
      dataIndex: 'amountPaid',
      key: 'amountPaid',
      render: (amount) => amount.toLocaleString('en-IN'),
    },
    {
      title: 'Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status) => (
        <span style={{ 
          color: status === 'PAID' ? 'green' : status === 'PENDING' ? 'orange' : 'red',
          fontWeight: 'bold'
        }}>
          {status}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => generateReceipt(record)} type="primary">
          Download Receipt
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Payment History</h2>
      {payments.length > 0 ? (
        <Table 
          columns={columns} 
          dataSource={payments} 
          rowKey="paymentId" 
          bordered
          pagination={{ pageSize: 3 }}
        />
      ) : (
        <p>No payment records found.</p>
      )}
    </div>
  );
};

export default CustomerViewPayment;