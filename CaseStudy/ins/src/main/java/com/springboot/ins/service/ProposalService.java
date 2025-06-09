package com.springboot.ins.service;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.springboot.ins.exception.PolicyNotFoundException;
import com.springboot.ins.exception.ProposalNotFoundException;
import com.springboot.ins.exception.ResourceNotFoundException;
import com.springboot.ins.model.Customer;
import com.springboot.ins.model.Policy;
import com.springboot.ins.model.Proposal;
import com.springboot.ins.repository.CustomerRepository;
import com.springboot.ins.repository.PolicyRepository;
import com.springboot.ins.repository.ProposalRepository;

@Service
public class ProposalService {

    @Autowired
    private ProposalRepository proposalRepository;
    private CustomerRepository customerRepository;
    private PolicyRepository policyRepository;

	public ProposalService(ProposalRepository proposalRepository, CustomerRepository customerRepository, PolicyRepository policyRepository) {
		super();
		this.proposalRepository = proposalRepository;
		this.customerRepository = customerRepository;
		this.policyRepository = policyRepository;
	}

    // add new proposal with customer_id
    public Proposal createProposal(Proposal proposal, Long customerId, Long policyId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));
        
        Policy policy = policyRepository.findById(policyId)
                .orElseThrow(() -> new ResourceNotFoundException("Policy not found"));
        
        proposal.setCustomer(customer);
        proposal.setPolicy(policy);
        
        return proposalRepository.save(proposal);
    }
   	
    // get all proposals
    public List<Proposal> getAllProposals(int page, int size) {
    	
        // Activate Pageable Interface 
        Pageable pageable = PageRequest.of(page, size);
        
        // Call findAll inbuilt method as pass this pageable interface ref 
        return proposalRepository.findAll(pageable).getContent();
    }   
    
    // get proposal by id (using token)
    public Proposal getProposalByUsername(String username) {
        return proposalRepository.findByCustomerUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal not found for username: " + username));
    }
	
	// delete proposal by id
	public void deleteByProposalId(Long proposalId) {
		proposalRepository.deleteByProposalId(proposalId);
	}
	
	// get proposal by policy id
	public List<Proposal> getProposalsByPolicyId(Long policyId) {
		proposalRepository.findById(policyId)
				.orElseThrow(() -> new ProposalNotFoundException("Customer ID Invalid"));

		List<Proposal> list = proposalRepository.getProposalsByPolicyId(policyId);
		if (list != null && list.isEmpty())
			throw new PolicyNotFoundException("Policy not found");
		return list;
	}

}