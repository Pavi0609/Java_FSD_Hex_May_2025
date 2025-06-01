package com.springboot.ins.service;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service;

import com.springboot.ins.model.Customer;
import com.springboot.ins.model.User;
import com.springboot.ins.repository.CustomerRepository;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;
	private UserService userService;

    public CustomerService(CustomerRepository customerRepository, UserService userService) {
		super();
		this.customerRepository = customerRepository;
		this.userService = userService;
	}
    
	public Customer insertCustomer(Customer customer) { 
		
		// Take user out of this Customer object 
		User user = customer.getUser();
		
		// Give role to this user 
		user.setRole("CUSTOMER");
		
		// Save this User in the DB 
		User savedUser = userService.signUp(user);
		
		// Attach this user back to Customer
		customer.setUser(savedUser);
		
		// Save Customer in DB
		return customerRepository.save(customer);
	}    

	// add new customer
    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }
    
    // get all customers
    public List<Customer> getAll() { 
        return customerRepository.findAll();
    }

    // get customer by id
    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer ID not found " + id));
    }
    
    // get customer by username
	public Customer getCustomerByUsername(String username) {
		return customerRepository.getCustomerByUsername(username);
	}
	
}