import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Proposal() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/proposal/get-all', {
          headers: { "Authorization": "Bearer " + token }
        });
        setProposals(response.data);
      } catch (err) {
        console.error("Error fetching proposals:", err);
        alert("Failed to load proposals");
      } finally {
        setLoading(false);
      }
    };
    fetchProposals();
  }, []);

  const updateProposalStatus = async (proposalId, newStatus) => {
    setProcessing(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/api/proposal/update-status/${proposalId}`, null, 
        {
          params: { newStatus },
          headers: { "Authorization": "Bearer " + token }
        });
      return true;
    } catch (err) {
      console.error(`Error updating proposal status:`, err);
      alert(`Failed to update proposal status`);
      return false;
    } finally {
      setProcessing(false);
    }
  };

const handleAccept = async (proposalId) => {
  if (window.confirm(`Are you sure you want to accept Proposal ${proposalId}?`)) {
    const success = await updateProposalStatus(proposalId, true);

    if (success) {
      const proposal = proposals.find(p => p.proposalId === proposalId);
      navigate('/addQuotes', { 
        state: { 
          proposalId: proposal.proposalId,
          policyId: proposal.policy.policyId,
          proposalData: proposal 
        }
      });
    }
  }
};

  const handleReject = async (proposalId, customerEmail) => {
    if (window.confirm(`Are you sure you want to reject Proposal ${proposalId}?`)) {
      const success = await updateProposalStatus(proposalId, false);

      if (success) {
        alert(`Proposal #${proposalId} rejected successfully. Notification will be sent to customer.`);
        console.log(`Notification sent to ${customerEmail}: Your proposal has been rejected`);
        // Refresh the proposals list to reflect the change
        setProposals(proposals.map(proposal => 
          proposal.proposalId === proposalId 
            ? { ...proposal, proposalStatus: false } 
            : proposal
        ));
      }
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading proposals...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Customer Proposals</h2>
      
      {proposals.length === 0 ? (
        <div className="alert alert-info">No proposals found</div>
      ) : (
        <div className="row">
          {proposals.map((proposal) => (
            <div key={proposal.proposalId} className="col-md-12 mb-4">
              <div className="card shadow-sm">
                <div className="card-header bg-light">
                  <h5 className="mb-0">Proposal {proposal.proposalId}</h5>
                  <span className={`badge ${proposal.proposalStatus ? 'bg-success' : 'bg-warning'}`}>
                    {proposal.proposalStatus ? 'Accepted' : 'Pending'}
                  </span>
                </div>
                
                <div className="card-body">
                  
                  {/* Customer Details Section */}
                  <div className="mb-4 p-3 border rounded">
                    <h6 className="text-primary">Customer Details</h6>
                    <div className="row">
                      <div className="col-md-6">
                        <p className="mb-1"><strong>Name:</strong> {proposal.customer.customerName}</p>
                        <p className="mb-1"><strong>Email:</strong> {proposal.customer.user.username}</p>
                        <p className="mb-1"><strong>Address:</strong> {proposal.customer.customerAddress}</p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-1"><strong>Date of Birth:</strong> {new Date(proposal.customer.customerDob).toLocaleDateString()}</p>
                        <p className="mb-1"><strong>Age:</strong> {proposal.customer.customerAge}</p>
                        <p className="mb-1"><strong>Aadhar:</strong> {proposal.customer.customerAadharNo}</p>
                        <p className="mb-1"><strong>PAN:</strong> {proposal.customer.customerPanNo}</p>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Details Section */}
                  <div className="mb-4 p-3 border rounded">
                    <h6 className="text-primary">Vehicle Details</h6>
                    <div className="row">
                      <div className="col-md-6">
                        <p className="mb-1"><strong>Vehicle Type:</strong> {proposal.vehicleType}</p>
                        <p className="mb-1"><strong>Model:</strong> {proposal.vehicleModel}</p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-1"><strong>Registration:</strong> {proposal.registrationNumber}</p>
                        <p className="mb-1"><strong>Manufacture Year:</strong> {proposal.manufactureYear}</p>
                      </div>
                    </div>
                  </div>

                  {/* Policy Details Section */}
                  <div className="mb-4 p-3 border rounded">
                    <h6 className="text-primary">Policy Details</h6>
                    <div className="row">
                      <div className="col-md-6">
                        <p className="mb-1"><strong>Policy Name:</strong> {proposal.policy.policyName}</p>
                        <p className="mb-1"><strong>Premium Amount:</strong> ₹{proposal.policy.premiumAmount.toFixed(2)}</p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-1"><strong>Policy Period:</strong> {new Date(proposal.policy.startDate).toLocaleDateString()} - {new Date(proposal.policy.endDate).toLocaleDateString()}</p>
                        <p className="mb-1"><strong>Status:</strong> {proposal.policy.policyStatus}</p>
                        <p className="mb-1"><strong>Submitted:</strong> {new Date(proposal.submittedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex justify-content-end mt-3">
                    <button 
                      className="btn btn-success me-2"
                      onClick={() => handleAccept(proposal.proposalId)}
                      disabled={processing || proposal.proposalStatus}>
                      {processing ? 'Processing...' : 'Accept'}
                    </button>
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleReject(proposal.proposalId, proposal.customer.user.username)}
                      disabled={processing || proposal.proposalStatus === false}>
                      {processing ? 'Processing...' : 'Reject'}
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

export default Proposal;