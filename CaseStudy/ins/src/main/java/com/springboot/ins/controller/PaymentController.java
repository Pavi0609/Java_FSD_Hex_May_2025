package com.springboot.ins.controller;

import com.springboot.ins.model.Payment;  
import com.springboot.ins.service.PaymentService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/payments_new")
@CrossOrigin(origins = {"http://localhost:5174", "https://localhost:5174"}) 
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // Create payment by customerId, quoteId & proposalId
    @PostMapping("/add/customer/{customerId}")
    public ResponseEntity<Payment> createPayment(
            @PathVariable Long customerId,
            @RequestParam(required = false) Long quoteId,
            @RequestParam(required = false) Long proposalId,
            @RequestBody Payment payment) {
        Payment createdPayment = paymentService.createPayment(customerId, quoteId, proposalId, payment);
        return ResponseEntity.ok(createdPayment);
    }

    // Get all payments
    @GetMapping("/get-all")
    public ResponseEntity<List<Payment>> getAllPayments() {
        List<Payment> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }

    // Get payment by id
    @GetMapping("/get-one/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
        Payment payment = paymentService.getPaymentById(id);
        return ResponseEntity.ok(payment);
    }

    // Get payment by Customer id
    @GetMapping("/get-one/customer/{customerId}")
    public ResponseEntity<List<Payment>> getPaymentsByCustomerId(@PathVariable Long customerId) {
        List<Payment> payments = paymentService.getPaymentsByCustomerId(customerId);
        return ResponseEntity.ok(payments);
    }

    // Get payment by Quote id
    @GetMapping("/get-one/quote/{quoteId}")
    public ResponseEntity<List<Payment>> getPaymentsByQuoteId(@PathVariable Long quoteId) {
        List<Payment> payments = paymentService.getPaymentsByQuoteId(quoteId);
        return ResponseEntity.ok(payments);
    }

    // Get payment by Proposal id
    @GetMapping("/delete/proposal/{proposalId}")
    public ResponseEntity<List<Payment>> getPaymentsByProposalId(@PathVariable Long proposalId) {
        List<Payment> payments = paymentService.getPaymentsByProposalId(proposalId);
        return ResponseEntity.ok(payments);
    }

    // Delete payment by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }
    
}