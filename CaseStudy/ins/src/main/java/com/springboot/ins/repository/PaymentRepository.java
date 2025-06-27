package com.springboot.ins.repository;

import com.springboot.ins.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
    // Get payment by Customer id
    @Query("SELECT DISTINCT p FROM Payment p " +
            "JOIN FETCH p.customer c " +
            "JOIN FETCH p.proposal pr " +
            "JOIN FETCH pr.policy " +
            "WHERE c.id = :customerId")
     List<Payment> findByCustomerId(@Param("customerId") Long customerId);
    
    // @Query("SELECT DISTINCT p FROM Payment p WHERE p.customer.id = ?1")
    // List<Payment> findByCustomerId(@Param("customerId") Long id);
    
    // Get payment by Quote id
    @Query("SELECT p FROM Payment p WHERE p.quote.quoteId = ?1")
    List<Payment> findByQuoteId(@Param("quoteId") Long quoteId);
    
    // Get payment by Proposal id
    @Query("SELECT p FROM Payment p WHERE p.proposal.proposalId = ?1")
    List<Payment> findByProposalId(@Param("proposalId") Long proposalId);

}