package com.springboot.ins.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository; 

import com.springboot.ins.model.Policy;

public interface PolicyRepository extends JpaRepository<Policy, Long> {
	
	void deleteByPolicyId(Long policyId);

	Optional<Policy> findById(Long policyId);

}