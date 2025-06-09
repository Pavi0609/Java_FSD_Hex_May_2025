package com.springboot.ins.repository;

import com.springboot.ins.model.Quote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuoteRepository extends JpaRepository<Quote, Long> {

    Optional<Quote> findByProposalProposalId(Long proposalId);
    
}