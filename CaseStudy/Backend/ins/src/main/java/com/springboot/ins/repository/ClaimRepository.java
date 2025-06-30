package com.springboot.ins.repository;

import com.springboot.ins.model.Claim;  
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClaimRepository extends JpaRepository<Claim, Integer> {

    @Query("SELECT c FROM Claim c WHERE c.customer.user.username = ?1")
	List<Claim> findByCustomerUsername(String username);
    
    @Query("SELECT c FROM Claim c WHERE c.proposal.proposalId = ?1")
    List<Claim> findByProposalId(Long proposalId);
    
}