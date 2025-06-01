package com.springboot.ins.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.springboot.ins.model.Policy;
import com.springboot.ins.service.PolicyService;

@RestController
@RequestMapping("/api/policy")
public class PolicyController {

    @Autowired
    private PolicyService policyService;

    // add new policy
    @PostMapping("/add")
    public Policy createPolicy(@RequestBody Policy policy) {
        return policyService.createPolicy(policy);
    }

    // get all policies
    @GetMapping("/get-all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(policyService.getAll());
    }
    
    // get customer by id
    @GetMapping("/get-one/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable Long id) {
        try {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(policyService.getPolicyById(id));
        }
        catch(Exception e){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
}