package com.springboot.ins.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.springboot.ins.exception.CustomerNotFoundException;
import com.springboot.ins.exception.PaymentNotFoundException;
import com.springboot.ins.exception.QuoteNotFoundException;
import com.springboot.ins.model.Customer;
import com.springboot.ins.model.Payment;
import com.springboot.ins.model.Quote;
import com.springboot.ins.repository.CustomerRepository;
import com.springboot.ins.repository.PaymentRepository;
import com.springboot.ins.repository.QuoteRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private QuoteRepository quoteRepository;

    public PaymentService(PaymentRepository paymentRepository, CustomerRepository customerRepository, QuoteRepository quoteRepository) {
		super();
		this.paymentRepository = paymentRepository;
		this.customerRepository = customerRepository;
		this.quoteRepository = quoteRepository;
	}

	// Create payment by customerId & quoteId
    public Payment createPayment(Payment payment, Long customerId, Long quoteId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found with ID: " + customerId));

        Quote quote = quoteRepository.findById(quoteId)
                .orElseThrow(() -> new QuoteNotFoundException("Quote not found with ID: " + quoteId));

        payment.setCustomer(customer);
        payment.setQuote(quote);
		payment.setPaymentStatus("PAID");
        payment.setPaymentDate(LocalDate.now()); 

        return paymentRepository.save(payment);
    }

    // Get all payments
    public List<Payment> getAllPayments(int page, int size) {
    	
        // Activate Pageable Interface 
        Pageable pageable = PageRequest.of(page, size);
        
        // Call findAll inbuilt method as pass this pageable interface ref 
        return paymentRepository.findAll(pageable).getContent();
    }
    
    // Get payment by Customer id    
    public Payment getPaymentByCustomerId(Long id) {
        return paymentRepository.findByCustomerId(id)
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found for customer ID: " + id));
    }
    
    // Get payment by Quote id
    public Payment getPaymentByQuoteId(Long quoteId) {
        return paymentRepository.findByQuoteQuoteId(quoteId)
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found for proposal ID: " + quoteId));
    }

    // Get payment by id
    public Payment getPaymentById(Integer paymentId) {
        return paymentRepository.findById(paymentId)
                .orElseThrow(() -> new PaymentNotFoundException("Payment not found with ID: " + paymentId));
    }

    // Delete payment by id
    public void deletePayment(Integer paymentId) {
        if (!paymentRepository.existsById(paymentId)) {
            throw new PaymentNotFoundException("Payment not found with ID: " + paymentId);
        }
        paymentRepository.deleteById(paymentId);
    }
}