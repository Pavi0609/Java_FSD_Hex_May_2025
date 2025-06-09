package com.springboot.ins.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.springboot.ins.model.Claim;  
import com.springboot.ins.service.ClaimService;

@RestController
@RequestMapping("/api/claim")
public class ClaimController {

    @Autowired
    private ClaimService claimService;

    // Create claim using customer ID and policy ID
    @PostMapping("/add/customer/{customerId}/policy/{policyId}")
    public ResponseEntity<Claim> createClaim(
            @PathVariable Long customerId,
            @PathVariable Long policyId,
            @RequestBody Claim claim) {
        return ResponseEntity.ok(claimService.createClaim(claim, customerId, policyId));
    }

    // Get all claims
    @GetMapping("/get-all")
    public ResponseEntity<List<Claim>> getAllClaims(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<Claim> claim = claimService.getAllClaims(page, size);
        return ResponseEntity.ok(claim);
    }

    // Get claims by customer ID
    @GetMapping("/get-all/customer/{customerId}")
    public ResponseEntity<List<Claim>> getClaimsByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(claimService.getClaimsByCustomerId(customerId));
    }

    // Get claims by policy ID
    @GetMapping("/get-all/policy/{policyId}")
    public ResponseEntity<List<Claim>> getClaimsByPolicy(@PathVariable Long policyId) {
        return ResponseEntity.ok(claimService.getClaimsByPolicyId(policyId));
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
    
}