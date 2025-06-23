package com.springboot.ins.service;

import com.springboot.ins.exception.PolicyAddOnsNotFoundException; 
import com.springboot.ins.exception.PolicyNotFoundException;
import com.springboot.ins.model.Policy;
import com.springboot.ins.model.PolicyAddOns;
import com.springboot.ins.repository.PolicyAddOnsRepository;
import com.springboot.ins.repository.PolicyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PolicyAddOnsService {

    @Autowired
    private PolicyAddOnsRepository policyAddOnsRepository;
    private PolicyRepository policyRepository;
    
    public PolicyAddOnsService(PolicyAddOnsRepository policyAddOnsRepository, PolicyRepository policyRepository) {
		super();
		this.policyAddOnsRepository = policyAddOnsRepository;
		this.policyRepository = policyRepository;
	}

    // add new policyAddOns with policy_id
	public PolicyAddOns insertAddon(PolicyAddOns addon, Long policyId) {
        Optional<Policy> Policy = policyRepository.findById(policyId);
        if (Policy.isPresent()) {
            addon.setPolicy(Policy.get());
            return policyAddOnsRepository.save(addon);
        }
        throw new PolicyNotFoundException("Policy not found with ID: " + policyId);
    }
	
    // get all policyAddOns
    public List<PolicyAddOns> getAllPolicyAddOns(int page, int size) {
    	
        // Activate Pageable Interface 
        Pageable pageable = PageRequest.of(page, size);
        
        // Call findAll inbuilt method as pass this pageable interface ref 
        return policyAddOnsRepository.findAll(pageable).getContent();
    }
    
	// get policyAddOns by policy id
    public List<PolicyAddOns> getAddonsByPolicyId(Long policyId) {
        List<PolicyAddOns> list = policyAddOnsRepository.findByPolicyPolicyId(policyId);
        if (list == null || list.isEmpty()) {
            throw new PolicyNotFoundException("No addons found for policy ID: " + policyId);
        }
        return list;
    }

    // get policyAddOns by id 
    public PolicyAddOns getAddonById(Integer addonId) {
        return policyAddOnsRepository.findById(addonId)
                .orElseThrow(() -> new PolicyAddOnsNotFoundException("Addon not found with id " + addonId));
    }
    
	// delete policyAddOns by id
	public void deleteByAddonId(int addonId) {
		policyAddOnsRepository.deleteByAddonId(addonId);
	}

}