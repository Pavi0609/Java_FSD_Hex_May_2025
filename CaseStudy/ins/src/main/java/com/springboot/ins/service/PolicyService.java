package com.springboot.ins.service;

import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.springboot.ins.dto.PolicyDto;
import com.springboot.ins.exception.PolicyNotFoundException;
import com.springboot.ins.exception.ResourceNotFoundException;
import com.springboot.ins.model.Policy;
import com.springboot.ins.repository.PolicyRepository;

import jakarta.transaction.Transactional;

import java.util.List;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository policyRepository;
	
    public PolicyService(PolicyRepository policyRepository) { 
		super();
		this.policyRepository = policyRepository;
	}
    
    // add new policy
    public Policy createPolicy(Policy policy) {
        return policyRepository.save(policy);
    }
    
    // add policies in a bulk way
    @Transactional
    public List<Policy> batchInsertPolicies(List<Policy> policies) {
        if (policies == null || policies.isEmpty()) {
            throw new ResourceNotFoundException("No policies provided for insertion");
        }
        return policyRepository.saveAll(policies);  // returns saved entities
    }
    
    // get all policies
    public List<Policy> getAllPolicies(int page, int size) {
    	
        // Activate Pageable Interface 
        Pageable pageable = PageRequest.of(page, size);
        
        // Call findAll inbuilt method as pass this pageable interface ref 
        return policyRepository.findAll(pageable).getContent();
    }
    
    // get policy by id
	public Policy getPolicyById(Long policyId) {
		return policyRepository.findById(policyId).orElseThrow(()-> new PolicyNotFoundException("Policy not found"));
	}
	
	// delete policy by id
	public void deleteByPolicyId(Long policyId) {
		policyRepository.deleteByPolicyId(policyId);
	}
	
	// get all policies by dto
	public List<PolicyDto> getAllPolicies() {
	    List<Policy> policy = policyRepository.findAll();
	    return PolicyDto.convertPolicyIntoDto(policy);
	}
	
}