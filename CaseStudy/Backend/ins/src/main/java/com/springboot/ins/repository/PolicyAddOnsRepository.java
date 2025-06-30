package com.springboot.ins.repository;

import com.springboot.ins.model.PolicyAddOns;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PolicyAddOnsRepository extends JpaRepository<PolicyAddOns, Integer> {
	
	@Query("DELETE FROM PolicyAddOns p WHERE p.addonId = ?1")
	void deleteByAddonId(int addonId);
	
	@Query("SELECT p FROM PolicyAddOns p WHERE p.policy.policyId = ?1")
	List<PolicyAddOns> findByPolicyPolicyId(Long policyId);

}