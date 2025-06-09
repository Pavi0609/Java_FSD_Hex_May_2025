package com.springboot.ins.controller;

import java.util.List;  

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.ins.dto.PolicyDto;
import com.springboot.ins.model.Policy;
import com.springboot.ins.service.PolicyService;

@RestController
@RequestMapping("/api/policy")
public class PolicyController {

    @Autowired
    private PolicyService policyService;
    
	Logger logger = LoggerFactory.getLogger("PolicyController");

    // add new policy
    @PostMapping("/add")
    public Policy createPolicy(@RequestBody Policy policy) {
        return policyService.createPolicy(policy);
    }
    
    // add policies in a bulk way
    @PostMapping("/add-batch")
    public ResponseEntity<List<Policy>> insertMultiplePolicies(@RequestBody List<Policy> policyList) {
        List<Policy> savedPolicies = policyService.batchInsertPolicies(policyList);
        return ResponseEntity
        		.status(HttpStatus.CREATED)
        		.body(savedPolicies);
    }
    
    // get all policies
    @GetMapping("/get-all")
	public List<Policy> getAllPolicies(
			@RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
			@RequestParam(name = "size", required = false, defaultValue = "1000000") Integer size) {
		if (page == 0 && size == 1000000)
			logger.info("No Pagination call for all courses");
		return policyService.getAllPolicies(page, size);
	}
    
    // get policy by id
	@GetMapping("/get-one/{policyId}")
	public Policy getPolicyById(@PathVariable Long policyId) {
		return policyService.getPolicyById(policyId);
	}
	   
    // delete policy by id
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteByPolicyId(@PathVariable Long policyId) {
        policyService.deleteByPolicyId(policyId);
        return ResponseEntity.status(HttpStatus.OK).body("Policy deleted");
    }
    
    @GetMapping("/get-all-dto")
    public List<PolicyDto> getAllPolicies() {
        return policyService.getAllPolicies();
    }
    
}