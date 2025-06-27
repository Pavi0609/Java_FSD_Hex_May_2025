package com.springboot.ins.controller;

import org.springframework.beans.factory.annotation.Autowired;

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

import com.springboot.ins.model.Claim;
import com.springboot.ins.service.ClaimService;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = {"http://localhost:5174", "https://localhost:5174"}) 
public class ClaimController {

    @Autowired
    private ClaimService claimService;

    // Create claim using customer ID and proposal ID
    @PostMapping("/add/customer/{customerId}/proposal/{proposalId}")
    public ResponseEntity<Claim> createClaim(
            @PathVariable Long customerId,
            @PathVariable Long proposalId,
            @RequestBody Claim claim) {
        return ResponseEntity.ok(claimService.createClaim(claim, customerId, proposalId));
    }

    // Get all claims
    @GetMapping("/get-all")
    public ResponseEntity<List<Claim>> getAllClaims(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<Claim> claim = claimService.getAllClaims(page, size);
        return ResponseEntity.ok(claim);
    }

    // Get claims by id (using token)
    @GetMapping("/get-one-cusotmer")
    public List<Claim> getClaimsByUsername(Principal principal) {
        String username = principal.getName(); 
        return claimService.getClaimsByUsername(username);
    }

    // Get claims by proposal ID
    @GetMapping("/get-all/proposal/{proposalId}")
    public ResponseEntity<List<Claim>> getClaimsByProposal(@PathVariable Long proposalId) {
        return ResponseEntity.ok(claimService.getClaimsByProposalId(proposalId));
    }

    // Get claim by ID
    @GetMapping("/get-one/{claimId}")
    public ResponseEntity<Claim> getClaimById(@PathVariable Integer claimId) {
        return ResponseEntity.ok(claimService.getClaimById(claimId));
    }
    
    // Delete claim by ID
    @DeleteMapping("/delete/{claimId}")
    public ResponseEntity<Void> deleteClaim(@PathVariable Integer claimId) {
        claimService.deleteClaim(claimId);
        return ResponseEntity.noContent().build();
    }
    
    // Update claim status
    @PutMapping("/update-status/{claimId}")
    public ResponseEntity<Claim> updateClaimStatus(
            @PathVariable Integer claimId,
            @RequestParam boolean newStatus) {
        Claim updatedClaim = claimService.updateClaimStatus(claimId, newStatus);
        return ResponseEntity.ok(updatedClaim);
    }
    
}