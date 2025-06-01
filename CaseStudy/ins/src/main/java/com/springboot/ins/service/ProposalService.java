package com.springboot.ins.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.ins.model.Customer;
import com.springboot.ins.model.Proposal;
import com.springboot.ins.repository.CustomerRepository;
import com.springboot.ins.repository.ProposalRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProposalService {

    @Autowired
    private ProposalRepository proposalRepository;

    @Autowired
    private CustomerRepository customerRepository;

    // add new proposal with customer_id
    public Proposal createProposal(Proposal proposal, Long customerId) {
        Optional<Customer> customer = customerRepository.findById(customerId);
        if (customer.isPresent()) {
            proposal.setCustomer(customer.get());  // Changed from setCustomerId
            return proposalRepository.save(proposal);
        }
        throw new RuntimeException("Customer not found with id: " + customerId);
    }

    // get all proposals
    public List<Proposal> getAllProposals() {
        return proposalRepository.findAll();
    }

    // get proposal by customer_id
    public List<Proposal> getProposalsByCustomerId(Long customerId) {
        return proposalRepository.findByCustomer_Id(customerId);
    }
    
    // get proposal details along with its customer details
    public Proposal getProposalWithCustomer(Long proposalId) {
        return proposalRepository.findById(proposalId)
                .orElseThrow(() -> new RuntimeException("Proposal not found with id: " + proposalId));
    }

    // get all proposals with their customers
    public List<Proposal> getAllProposalsWithCustomers() {
        return proposalRepository.findAll(); 
    }
}