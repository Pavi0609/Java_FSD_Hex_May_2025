package com.springboot.ins.controller;

import com.springboot.ins.model.Payment; 
import com.springboot.ins.service.PaymentService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

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
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // Create new payment using customerId & quoteId
    @PostMapping("/add/customer/{customerId}/quote/{quoteId}")
    public ResponseEntity<Payment> createPayment(@PathVariable Long customerId,
            									 @PathVariable Long quoteId,
            									 @RequestBody Payment payment) {
        return ResponseEntity.ok(paymentService.createPayment(payment, customerId, quoteId));
    }

    // Get all payments
    @GetMapping("/get-all")
    public ResponseEntity<List<Payment>> getAllPayments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<Payment> payment = paymentService.getAllPayments(page, size);
        return ResponseEntity.ok(payment);
    }

    // Get payments by customer ID
    @GetMapping("/get-one/customer/{customerId}")    
    public ResponseEntity<Payment> getPaymentByCustomerId(@PathVariable Long proposalId) {
        return ResponseEntity.ok(paymentService.getPaymentByCustomerId(proposalId));
    }

    // Get payment by quote ID
    @GetMapping("/get-one/quote/{quoteId}")
    public ResponseEntity<Payment> getPaymentByQuoteId(@PathVariable Long quoteId) {
        return ResponseEntity.ok(paymentService.getPaymentByQuoteId(quoteId));
    }
    
    // Get payment by ID
    @GetMapping("/get-one/{paymentId}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Integer paymentId) {
        return ResponseEntity.ok(paymentService.getPaymentById(paymentId));
    }

    // Delete payment by ID
    @DeleteMapping("/delete/{paymentId}")
    public ResponseEntity<Void> deletePayment(@PathVariable Integer paymentId) {
        paymentService.deletePayment(paymentId);
        return ResponseEntity.noContent().build();
    }
}