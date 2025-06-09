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

import com.springboot.ins.model.PolicyAddOns;  
import com.springboot.ins.service.PolicyAddOnsService;

@RestController
@RequestMapping("/api/policy-addons")
public class PolicyAddOnsController {

    @Autowired
    private PolicyAddOnsService policyAddOnsService;

    // add new policyAddOns with policy_id
    @PostMapping("/add/policy/{policyId}")
    public ResponseEntity<PolicyAddOns> insertAddon(@PathVariable Long policyId,
    												@RequestBody PolicyAddOns addon) {
        PolicyAddOns created = policyAddOnsService.insertAddon(addon, policyId);
        return ResponseEntity.ok(created);
    }

    // get all policyAddOns
    @GetMapping("/get-all")
    public ResponseEntity<List<PolicyAddOns>> getAllAddOns(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<PolicyAddOns> addons = policyAddOnsService.getAllPolicyAddOns(page, size);
        return ResponseEntity.ok(addons);
    }

	// get policyAddOns by policy id
    @GetMapping("/get-one/policy/{policyId}")
    public ResponseEntity<List<PolicyAddOns>> getAddonsByPolicyId(@PathVariable Long policyId) {
        List<PolicyAddOns> addons = policyAddOnsService.getAddonsByPolicyId(policyId);
        return ResponseEntity.ok(addons);
    }

    // get policyAddOns by id 
    @GetMapping("/get-one/{addonId}")
    public ResponseEntity<PolicyAddOns> getAddonById(@PathVariable Integer addonId) {
        PolicyAddOns addon = policyAddOnsService.getAddonById(addonId);
        return ResponseEntity.ok(addon);
    }

	// delete policyAddOns by id
    @DeleteMapping("/delete/{addonId}")
    public ResponseEntity<Void> deleteAddonById(@PathVariable int addonId) {
        policyAddOnsService.deleteByAddonId(addonId);
        return ResponseEntity.noContent().build();
    }
}