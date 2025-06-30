package com.springboot.ins;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.springboot.ins.exception.ClaimNotFoundException;
import com.springboot.ins.exception.CustomerNotFoundException;
import com.springboot.ins.exception.DocumentNotFoundException;
import com.springboot.ins.exception.PaymentNotFoundException;
import com.springboot.ins.exception.PolicyAddOnsNotFoundException;
import com.springboot.ins.exception.PolicyNotFoundException;
import com.springboot.ins.exception.ProfilePictureException;
import com.springboot.ins.exception.ProposalNotFoundException;
import com.springboot.ins.exception.QuoteNotFoundException;
import com.springboot.ins.exception.ResourceNotFoundException;

import io.jsonwebtoken.security.SignatureException;

@ControllerAdvice
public class GlobalExceptionHandler {

	// Whenever a RuntimeException is thrown in Controller,then this method gets called    
	@ExceptionHandler(exception = RuntimeException.class)
	public ResponseEntity<?> handleRuntime(RuntimeException e) {
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(map);
	}
	
	// Whenever a token is invalid , this method gets called	 
	@ExceptionHandler(exception = SignatureException.class)
	public ResponseEntity<?> handleSignatureException(Exception e) {
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		return ResponseEntity
				.status(HttpStatus.UNAUTHORIZED)
				.body(map);
	}
	
	// Whenever a ResourseNotFoundException is thrown in Controller, this method gets called
	@ExceptionHandler(exception = ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e) {
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(map);
	}
	
	// Whenever any Unforeseen Exception is thrown in Controller, this method gets called	
	@ExceptionHandler(exception = Exception.class)
	public ResponseEntity<?> handleException(Exception e) {
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		return ResponseEntity
				.status(HttpStatus.NOT_FOUND)
				.body(map);
	}
	
	// Whenever a CustomerNotFoundException is thrown in Controller/service, this method gets called 
	@ExceptionHandler(exception = CustomerNotFoundException.class)
	public ResponseEntity<?> handleCustomerNotFoundException(Exception e) {
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		return ResponseEntity
				.status(HttpStatus.ACCEPTED)
				.body(map);
	}

	// Whenever a PolicyNotFoundException is thrown in Controller/service, this method gets called 
	@ExceptionHandler(exception = PolicyNotFoundException.class)
	public ResponseEntity<?> handlePolicyNotFoundException(Exception e) {
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		return ResponseEntity
				.status(HttpStatus.ACCEPTED)
				.body(map);
	}

	// Whenever a PaymentNotFoundException is thrown in Controller/service, this method gets called 
	@ExceptionHandler(exception = PaymentNotFoundException.class)
	public ResponseEntity<?> handlePaymentNotFoundException(Exception e) {
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		return ResponseEntity
				.status(HttpStatus.ACCEPTED)
				.body(map);
	}
	
	// Whenever a ProposalNotFoundException is thrown in Controller/service, this method gets called 
	@ExceptionHandler(exception = ProposalNotFoundException.class)
	public ResponseEntity<?> handleProposalNotFoundException(Exception e) {
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		return ResponseEntity
				.status(HttpStatus.ACCEPTED)
				.body(map);
	}
	
	// Whenever a QuoteNotFoundException is thrown in Controller/service, this method gets called 
	@ExceptionHandler(exception = QuoteNotFoundException.class)
	public ResponseEntity<?> handleQuoteNotFoundException(Exception e) {
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		return ResponseEntity
				.status(HttpStatus.ACCEPTED)
				.body(map);
	}
	
	// Whenever a PolicyAddOnsNotFoundException is thrown in Controller/service, this method gets called 
	@ExceptionHandler(exception = PolicyAddOnsNotFoundException.class)
	public ResponseEntity<?> handlePolicyAddOnsNotFoundException(Exception e) {
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		return ResponseEntity
				.status(HttpStatus.ACCEPTED)
				.body(map);
	}
	
	// Whenever a ClaimNotFoundException is thrown in Controller/service, this method gets called  
	@ExceptionHandler(exception = ClaimNotFoundException.class)
	public ResponseEntity<?> handleClaimNotFoundException(Exception e) {
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		return ResponseEntity
				.status(HttpStatus.ACCEPTED)
				.body(map);
	}
	
	// Whenever a DocumentNotFoundException is thrown in Controller/service, this method gets called 
	@ExceptionHandler(exception = DocumentNotFoundException.class)
	public ResponseEntity<?> handleDocumentNotFoundException(Exception e) {
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		return ResponseEntity
				.status(HttpStatus.ACCEPTED)
				.body(map);
	}
	
	// Whenever a ProfilePictureException is thrown in Controller/service, this method gets called 
	@ExceptionHandler(exception = ProfilePictureException.class)
	public ResponseEntity<?> handleProfilePictureException(Exception e) {
		Map<String,String> map = new HashMap<>();
		map.put("msg", e.getMessage());
		return ResponseEntity
				.status(HttpStatus.ACCEPTED)
				.body(map);
	}
	
}