package com.springboot.ins.controller;

import org.slf4j.Logger;   
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

import com.springboot.ins.model.Proposal;
import com.springboot.ins.service.ProposalService;

@RestController
@RequestMapping("/api/proposal")
@CrossOrigin(origins = {"http://localhost:5174", "https://localhost:5174"}) 
public class ProposalController {

    @Autowired
    private ProposalService proposalService;
    
	Logger logger = LoggerFactory.getLogger("ProposalController");
    
    // add new proposal with customer_id
    @PostMapping("/add/{customerId}/{policyId}")
    public ResponseEntity<Proposal> createProposal(@RequestBody Proposal proposal,
    											   @PathVariable Long customerId,
    											   @PathVariable Long policyId) {
        Proposal savedProposal = proposalService.createProposal(proposal, customerId, policyId);
        return ResponseEntity.ok(savedProposal);
    }
    
    // get all proposals
    @GetMapping("/get-all")
	public List<Proposal> getAllProposals(
			@RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
			@RequestParam(name = "size", required = false, defaultValue = "1000000") Integer size) {
		if (page == 0 && size == 1000000)
			logger.info("No Pagination call for all courses");
		return proposalService.getAllProposals(page, size);
	}

    // get proposal by id (using token)
    @GetMapping("/get-one-cusotmer")
    public List<Proposal> getProposalsByUsername(Principal principal) {
        String username = principal.getName(); 
        return proposalService.getProposalsByUsername(username);
    }
    
	// get proposal by policy id
	@GetMapping("/get-all/proposal/policy/{policyId}")
	public List<Proposal> getProposalsByPolicyId(@PathVariable("policyId") Long policyId) {
		return proposalService.getProposalsByPolicyId(policyId);
	}
    
    // delete proposal by id
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteByProposalId(@PathVariable Long proposalId) {
        proposalService.deleteByProposalId(proposalId);
        return ResponseEntity.status(HttpStatus.OK).body("Proposal deleted");
    }
    
 // update proposal status
    @PutMapping("/update-status/{proposalId}")
    public ResponseEntity<Proposal> updateProposalStatus(
            @PathVariable Long proposalId,
            @RequestParam boolean newStatus) {
        Proposal updatedProposal = proposalService.updateProposalStatus(proposalId, newStatus);
        return ResponseEntity.ok(updatedProposal);
    }
    
}