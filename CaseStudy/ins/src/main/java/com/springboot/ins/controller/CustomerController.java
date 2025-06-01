package com.springboot.ins.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.springboot.ins.model.Customer;
import com.springboot.ins.service.CustomerService;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;
    
    // add new customer
    @PostMapping("/add")
    public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {
        Customer saved = customerService.insertCustomer(customer);
        return ResponseEntity.ok(saved);
    }
/*
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerService.createCustomer(customer);
    }
*/

    // get all customers
    @GetMapping("/get-all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(customerService.getAll());
    }
    
    // get customer by id
    @GetMapping("/get-one/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable Long id) {
        try {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(customerService.getCustomerById(id));
        }
        catch(Exception e){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
    
    // get customer by username
    @GetMapping("/get-one-username/{id}")
    public Customer getCustomerById(Principal principal) {
    	// Ask spring username of loggedIn user using Principal interface 
    	String username = principal.getName(); 
    	return customerService.getCustomerByUsername(username) ;
    }  
    
}