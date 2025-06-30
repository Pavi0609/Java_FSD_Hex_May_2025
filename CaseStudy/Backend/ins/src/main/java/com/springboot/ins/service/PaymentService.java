package com.springboot.ins.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.ins.exception.CustomerNotFoundException;
import com.springboot.ins.exception.PaymentNotFoundException;
import com.springboot.ins.exception.ProposalNotFoundException;
import com.springboot.ins.exception.QuoteNotFoundException;
import com.springboot.ins.model.Customer;
import com.springboot.ins.model.Payment;
import com.springboot.ins.model.Proposal;
import com.springboot.ins.model.Quote;
import com.springboot.ins.repository.CustomerRepository;
import com.springboot.ins.repository.PaymentRepository;
import com.springboot.ins.repository.ProposalRepository;
import com.springboot.ins.repository.QuoteRepository;

import jakarta.transaction.Transactional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private ProposalRepository proposalRepository;
    
    @Autowired
    private QuoteRepository quoteRepository;

    // Create payment by customerId, quoteId & proposalId
    @Transactional
    public Payment createPayment(Long customerId, Long quoteId, Long proposalId, Payment payment) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new CustomerNotFoundException("Customer not found with id: " + customerId));
        
        payment.setCustomer(customer);
        
        if (quoteId != null) {
            Quote quote = quoteRepository.findById(quoteId)
                .orElseThrow(() -> new QuoteNotFoundException("Quote not found with id: " + quoteId));
            payment.setQuote(quote);
        }
        
        if (proposalId != null) {
            Proposal proposal = proposalRepository.findById(proposalId)
                .orElseThrow(() -> new ProposalNotFoundException("Proposal not found with id: " + proposalId));
            payment.setProposal(proposal);
        }
        
        return paymentRepository.save(payment);
    }

    // Get all payments
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    // Get payment by id
    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id)
            .orElseThrow(() -> new PaymentNotFoundException("Payment not found with id: " + id));
    }

    // Get payment by Customer id
    public List<Payment> getPaymentsByCustomerId(Long customerId) {
        return paymentRepository.findByCustomerId(customerId);
    }

    // Get payment by Quote id
    public List<Payment> getPaymentsByQuoteId(Long quoteId) {
        return paymentRepository.findByQuoteId(quoteId);
    }

    // Get payment by Proposal id
    public List<Payment> getPaymentsByProposalId(Long proposalId) {
        return paymentRepository.findByProposalId(proposalId);
    }

    // Delete payment by id
    @Transactional
    public void deletePayment(Long id) {
        if (!paymentRepository.existsById(id)) {
            throw new IllegalArgumentException("Payment not found with id: " + id);
        }
        paymentRepository.deleteById(id);
    }
}