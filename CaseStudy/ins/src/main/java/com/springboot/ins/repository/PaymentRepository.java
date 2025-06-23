package com.springboot.ins.repository;

import com.springboot.ins.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
    // Get all payments
    // (Default JpaRepository methods already provide findAll())
    
    // Get payment by id
    // (Default JpaRepository methods already provide findById())
    
    // Get payment by Customer id
    @Query("SELECT p FROM Payment p WHERE p.customer.id = ?1")
    List<Payment> findByCustomerId(@Param("customerId") Long id);
    
    // Get payment by Quote id
    @Query("SELECT p FROM Payment p WHERE p.quote.quoteId = ?1")
    List<Payment> findByQuoteId(@Param("quoteId") Long quoteId);
    
    // Get payment by Proposal id
    @Query("SELECT p FROM Payment p WHERE p.proposal.proposalId = ?1")
    List<Payment> findByProposalId(@Param("proposalId") Long proposalId);
    
    // Delete payment by id
    // (Default JpaRepository methods already provide deleteById())
}


/*
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    @Query("SELECT p FROM Payment p WHERE p.quote.quoteId = ?1")
    Optional<Payment> findByQuoteQuoteId(Long quoteId);

    @Query("SELECT p FROM Payment p WHERE p.customer.id = ?1")
    Optional<Payment> findByCustomerId(Long id);
    
    @Query("SELECT COUNT(p) > 0 FROM Payment p WHERE p.quote.quoteId = ?1")
    boolean existsByQuoteId(Long quoteId);

    @Query("SELECT COUNT(p) > 0 FROM Payment p WHERE p.proposal.proposalId = ?1")
    boolean existsByProposalId(Long proposalId);

    
}
*/