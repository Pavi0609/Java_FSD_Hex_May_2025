package com.springboot.ins.repository;

import com.springboot.ins.model.Claim; 
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClaimRepository extends JpaRepository<Claim, Integer> {

    List<Claim> findByCustomerId(Long customerId);

    List<Claim> findByPolicyPolicyId(Long policyId);
    
}