package com.springboot.ins.controller;

import java.security.Principal;   

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    // get all customers
    @GetMapping("/get-all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(customerService.getAll());
    }
    
    // get customer by id (using token)
    @GetMapping("/get-one-username")
    public Customer getCustomerByUsername(Principal principal) {
    	String username = principal.getName(); 
    	return customerService.getCustomerByUsername(username) ;
    } 
    
	// update customer by id 
	@PutMapping("/update/{id}")
	public ResponseEntity<Customer> updateByCustomerId(@PathVariable Long id,
			                                           @RequestBody Customer updateCustomer) {
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(customerService.updateByCustomerId(id, updateCustomer));
	}
    
    // delete customer by id
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCustomerById(@PathVariable Long id) {
        customerService.deleteCustomerById(id);
        return ResponseEntity
        		.status(HttpStatus.OK)
        		.body("Customer deleted");
    }
    
}