package com.springboot.ins.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// import vechile.hexa.DTO.ProposalCustomerDTO;
import com.springboot.ins.model.Proposal;
import com.springboot.ins.service.ProposalService;

import java.util.List;

@RestController
@RequestMapping("/api/proposal")
public class ProposalController {

    @Autowired
    private ProposalService proposalService;

    // add new proposal with customer_id
    @PostMapping("/add/{customerId}")
    public Proposal createProposal(@RequestBody Proposal proposal, @PathVariable Long customerId) {
        return proposalService.createProposal(proposal, customerId);
    }

    // get all proposals
    @GetMapping("/get-all")
    public List<Proposal> getAllProposals() {
        return proposalService.getAllProposals();
    }

    // get proposal by customer_id   
    @GetMapping("/customer/{customerId}")
    public List<Proposal> getProposalsByCustomerId(@PathVariable Long customerId) {
        return proposalService.getProposalsByCustomerId(customerId);
    }

    // get proposal details along with its customer details
    @GetMapping("/with-customer/{id}")
    public ResponseEntity<Proposal> getProposalWithCustomer(@PathVariable Long id) {
        try {
            Proposal proposal = proposalService.getProposalWithCustomer(id);
            return ResponseEntity.ok(proposal);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // get all proposals with their customers
    @GetMapping("/customer_all")
    public List<Proposal> getAllProposalsWithCustomers() {
        return proposalService.getAllProposalsWithCustomers();
    }
}