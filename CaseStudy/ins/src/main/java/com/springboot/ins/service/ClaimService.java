package com.springboot.ins.service;

import com.springboot.ins.exception.ResourceNotFoundException;
import com.springboot.ins.model.Claim;
import com.springboot.ins.model.Customer;
import com.springboot.ins.model.Policy;
import com.springboot.ins.repository.ClaimRepository;
import com.springboot.ins.repository.CustomerRepository;
import com.springboot.ins.repository.PolicyRepository;

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
    private PolicyRepository policyRepository;

    public ClaimService(ClaimRepository claimRepository, CustomerRepository customerRepository,
			PolicyRepository policyRepository) {
		super();
		this.claimRepository = claimRepository;
		this.customerRepository = customerRepository;
		this.policyRepository = policyRepository;
	}

	// Create a claim using customerId & policyId
    public Claim createClaim(Claim claim, Long customerId, Long policyId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with ID: " + customerId));

        Policy policy = policyRepository.findById(policyId)
                .orElseThrow(() -> new ResourceNotFoundException("Policy not found with ID: " + policyId));

        claim.setCustomer(customer);
        claim.setPolicy(policy);
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

    // Get claims by policy ID
    public List<Claim> getClaimsByPolicyId(Long policyId) {
        return claimRepository.findByPolicyPolicyId(policyId);
    }
    
    // Get claim by ID
    public Claim getClaimById(Integer claimId) {
        return claimRepository.findById(claimId)
                .orElseThrow(() -> new ResourceNotFoundException("Claim not found with ID: " + claimId));
    }
    
    // Delete claim by ID
    public void deleteClaim(Integer claimId) {
        if (!claimRepository.existsById(claimId)) {
            throw new ResourceNotFoundException("Claim not found with ID: " + claimId);
        }
        claimRepository.deleteById(claimId);
    }
    
}