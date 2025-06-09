package com.springboot.ins.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.ins.model.Proposal;

public interface ProposalRepository extends JpaRepository<Proposal, Long> {
	
	@Query("SELECT p FROM Proposal p WHERE p.customer.user.username = ?1")
	Optional<Proposal> findByCustomerUsername(String username);

	void deleteByProposalId(Long proposalId);
	
	@Query("SELECT pp FROM Proposal pp WHERE pp.policy.id=?1")
	List<Proposal> getProposalsByPolicyId(Long policyId);
	
	@Query("SELECT p FROM Proposal p WHERE p.customer.id = ?1 AND p.policy.id = ?2")
	Optional<Proposal> findById(Long customerId, Long policyId);

}