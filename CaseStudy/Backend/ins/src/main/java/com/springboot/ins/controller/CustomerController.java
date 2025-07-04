package com.springboot.ins.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.ins.dto.CustomerDto;
import com.springboot.ins.model.Customer;
import com.springboot.ins.service.CustomerService;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = {"http://localhost:5174", "https://localhost:5174"}) 
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
    
    // get all customers by dto
    @GetMapping("/get-all-dto")
    public List<CustomerDto> getAllCustomers() {
        return customerService.getAllCustomers();
    }
    
    // get customer by id (using token)
    @GetMapping("/get-one-username")
    public Customer getCustomerByUsername(Principal principal) {
    	String username = principal.getName(); 
    	return customerService.getCustomerByUsername(username) ;
    } 
    
    @PutMapping("/update")
    public ResponseEntity<Customer> updateCustomer(Principal principal,
            @RequestBody Customer updateCustomer) {
        try {
            String username = principal.getName();
            Customer updatedCustomer = customerService.updateByCustomerId(username, updateCustomer);
            return ResponseEntity.ok(updatedCustomer);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
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