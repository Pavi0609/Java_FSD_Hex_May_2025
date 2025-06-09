package com.springboot.ins.repository;

import com.springboot.ins.model.PolicyAddOns;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PolicyAddOnsRepository extends JpaRepository<PolicyAddOns, Integer> {
	
	void deleteByAddonId(int addonId);
	
	List<PolicyAddOns> findByPolicyPolicyId(Long policyId);

}