package com.springboot.ins.repository;

import com.springboot.ins.model.Quote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface QuoteRepository extends JpaRepository<Quote, Long> {

	@Query("SELECT q FROM Quote q WHERE q.proposal.proposalId = ?1")
    Optional<Quote> findByProposalProposalId(Long proposalId);
    
}