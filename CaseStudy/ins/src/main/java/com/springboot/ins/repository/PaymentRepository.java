package com.springboot.ins.repository;

import com.springboot.ins.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    Optional<Payment> findByQuoteQuoteId(Long quoteId);

    Optional<Payment> findByCustomerId(Long id);
    
}