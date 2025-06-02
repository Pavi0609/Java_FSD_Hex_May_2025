package com.springboot.ins.service;

import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.stereotype.Service;

import com.springboot.ins.model.Policy;
// import com.springboot.ins.model.User;
import com.springboot.ins.repository.PolicyRepository;

import java.util.List;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository policyRepository;
	// private UserService userService;
	
    public PolicyService(PolicyRepository policyRepository) { // (UserService userService)
		super();
		this.policyRepository = policyRepository;
		// this.userService = userService;
	}
/*    
	public Policy insertPolicy(Policy policy) { 
		
		// Take user out of this Policy object 
		User user = policy.getUser();
		
		// Give role to this user 
		user.setRole("ADMIN");
		
		// Save this User in the DB 
		User savedUser = userService.signUp(user);
		
		// Attach this user back to Policy
		policy.setUser(savedUser);
		
		// Save Policy in DB
		return policyRepository.save(policy);
	}     
*/  
    // add new policy
    public Policy createPolicy(Policy policy) {
        return policyRepository.save(policy);
    }

    // get all policies
    public List<Policy> getAll() { 
        return policyRepository.findAll();
    }
    
    // get policy by id
    public Policy getPolicyById(Long id) {
        return policyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy ID not found " + id));
    }
	
}