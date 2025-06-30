package com.springboot.ins.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.ins.model.Policy;

public interface PolicyRepository extends JpaRepository<Policy, Long> {
	
	// @Query("DELETE FROM Policy p WHERE p.policyId = ?1")
	void deleteByPolicyId(Long policyId);

	@Query("SELECT p FROM Policy p WHERE p.policyId = ?1")
	Optional<Policy> findById(Long policyId);

}