import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { pdf } from '@react-pdf/renderer';
import emailjs from '@emailjs/browser';
import QuotePDF from './QuotePDF';

function Quote() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sending, setSending] = useState({});
  const [emailStatus, setEmailStatus] = useState({});

  // Initialize emailjs
  useEffect(() => {
    emailjs.init('Uz1KYzq7pEheISukz'); // Replace with your EmailJS public key
  }, []);

  const fetchQuotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/quote/get-all', {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setQuotes(response.data);
    } catch (err) {
      setError(`Failed to load quotes: ${err.message}`);
      console.error("Error fetching quotes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const sendQuoteEmail = async (quote) => {
    setSending(prev => ({ ...prev, [quote.quoteId]: true }));
    setEmailStatus(prev => ({ ...prev, [quote.quoteId]: '' }));

    try {
      // Generate PDF
      const pdfBlob = await pdf(<QuotePDF quote={quote} />).toBlob();
      
      // Convert to base64
      const base64data = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(pdfBlob);
      });

      // Send email to YOUR COMPANY (not customer)
      await emailjs.send(
        'service_coxi0pg', // Your EmailJS service ID
        'template_yg2rrgb', // Your template ID
        {
          to_email: 'canyaman6701@gmail.com', // YOUR COMPANY EMAIL HERE
          customer_name: quote.proposal.customer.customerName,
          customer_email: quote.proposal.customer.user.username, // Include for reference
          quote_id: quote.quoteId,
          policy_name: quote.proposal.policy.policyName,
          premium_amount: quote.premiumAmount.toFixed(2),
          generated_date: quote.generatedDate,
          validity_days: quote.validityPeriod,
          reply_to: quote.proposal.customer.user.username, // Allow replies to customer
          attachment: `data:application/pdf;base64,${base64data}`
        },
        'Uz1KYzq7pEheISukz' // Your public key
      );
      
      setEmailStatus(prev => ({ 
        ...prev, 
        [quote.quoteId]: 'Quote submitted to company successfully!' 
      }));
    } catch (err) {
      console.error('Email error:', err);
      setEmailStatus(prev => ({ 
        ...prev, 
        [quote.quoteId]: `Failed to submit quote: ${err.text || err.message}` 
      }));
    } finally {
      setSending(prev => ({ ...prev, [quote.quoteId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading quotes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Insurance Quotes</h2>
      
      {quotes.length === 0 ? (
        <div className="alert alert-info">No quotes found</div>
      ) : (
        <div className="row">
          {quotes.map((quote) => (
            <div key={quote.quoteId} className="col-md-12 mb-4">
              <div className="card shadow-sm">
                <div className="card-header bg-light d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Quote #{quote.quoteId}</h5>
                  <span className={`badge ${quote.proposal.proposalStatus ? 'bg-success' : 'bg-warning'}`}>
                    {quote.proposal.proposalStatus ? 'Accepted' : 'Pending'}
                  </span>
                </div>
                
                <div className="card-body">
                  {/* Quote Details */}
                  <div className="mb-4 p-3 border rounded">
                    <h6 className="text-primary">Quote Summary</h6>
                    <div className="row">
                      <div className="col-md-6">
                        <p className="mb-1"><strong>Generated Date:</strong> {quote.generatedDate}</p>
                        <p className="mb-1"><strong>Validity Period:</strong> {quote.validityPeriod} days</p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-1"><strong>Premium Amount:</strong> ₹{quote.premiumAmount.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Details */}
                  <div className="mb-4 p-3 border rounded">
                    <h6 className="text-primary">Customer Information</h6>
                    <p><strong>Name:</strong> {quote.proposal.customer.customerName}</p>
                    <p><strong>Email:</strong> {quote.proposal.customer.user.username}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex justify-content-between mt-3">
                    <div>
                      {emailStatus[quote.quoteId] && (
                        <div className={`alert ${emailStatus[quote.quoteId].includes('Failed') ? 'alert-danger' : 'alert-success'}`}>
                          {emailStatus[quote.quoteId]}
                        </div>
                      )}
                    </div>
                    <button 
                      className="btn btn-primary"
                      onClick={() => sendQuoteEmail(quote)}
                      disabled={sending[quote.quoteId]}
                    >
                      {sending[quote.quoteId] ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Submitting...
                        </>
                      ) : 'Submit to Company'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Quote;