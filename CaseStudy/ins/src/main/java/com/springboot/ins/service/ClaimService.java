package com.springboot.ins.service;

import com.springboot.ins.exception.ClaimNotFoundException;
import com.springboot.ins.exception.CustomerNotFoundException;
import com.springboot.ins.exception.ProposalNotFoundException;
import com.springboot.ins.model.Claim;
import com.springboot.ins.model.Customer;
import com.springboot.ins.model.Proposal;
import com.springboot.ins.repository.ClaimRepository;
import com.springboot.ins.repository.CustomerRepository;
import com.springboot.ins.repository.ProposalRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ClaimService {

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProposalRepository proposalRepository;

    public ClaimService(ClaimRepository claimRepository, CustomerRepository customerRepository,
            ProposalRepository proposalRepository) {
        super();
        this.claimRepository = claimRepository;
        this.customerRepository = customerRepository;
        this.proposalRepository = proposalRepository;
    }

    // Create a claim using customerId & proposalId
    public Claim createClaim(Claim claim, Long customerId, Long proposalId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found with ID: " + customerId));

        Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new ProposalNotFoundException("Proposal not found with ID: " + proposalId));

        claim.setCustomer(customer);
        claim.setProposal(proposal);
        claim.setClaimDate(LocalDate.now());

        return claimRepository.save(claim);
    }

    // Get all claims
    public List<Claim> getAllClaims(int page, int size) {
        
        // Activate Pageable Interface 
        Pageable pageable = PageRequest.of(page, size);
        
        // Call findAll inbuilt method as pass this pageable interface ref 
        return claimRepository.findAll(pageable).getContent();
    }

    // Get claims by customer ID
    public List<Claim> getClaimsByCustomerId(Long customerId) {
        return claimRepository.findByCustomerId(customerId);
    }

    // Get claims by proposal ID
    public List<Claim> getClaimsByProposalId(Long proposalId) {
        return claimRepository.findByProposalId(proposalId);
    }
    
    // Get claim by ID
    public Claim getClaimById(Integer claimId) {
        return claimRepository.findById(claimId)
                .orElseThrow(() -> new ClaimNotFoundException("Claim not found with ID: " + claimId));
    }
    
    // Delete claim by ID
    public void deleteClaim(Integer claimId) {
        if (!claimRepository.existsById(claimId)) {
            throw new ClaimNotFoundException("Claim not found with ID: " + claimId);
        }
        claimRepository.deleteById(claimId);
    }
    
    // Update claim status
    public Claim updateClaimStatus(Integer claimId, boolean newStatus) {
        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() -> new ClaimNotFoundException("Claim not found with id: " + claimId));
        
        claim.setClaimStatus(newStatus);
        return claimRepository.save(claim);
    }
    
}